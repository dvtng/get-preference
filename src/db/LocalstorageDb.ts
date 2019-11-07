import uuid from "nanoid";
import produce from "immer";
import {
  DocumentRef,
  DocumentSnapshot,
  Data,
  DocumentSnapshotListener,
  CollectionRef,
  Db
} from "./Db";
import { SimpleDocumentSnapshot } from "./SimpleDocumentSnapshot";
import { setInPath } from "../utilities/setInPath";
import undefined from "firebase/empty-import";

class LocalstorageDocumentRef implements DocumentRef {
  id: string;
  private collectionName: string;
  private handlers: DocumentSnapshotListener[] = [];

  constructor(collectionName: string, id: string) {
    this.id = id;
    this.collectionName = collectionName;
  }

  async update(updates: Data): Promise<void> {
    const data = this.read();
    if (data === undefined) {
      throw new Error(
        `Can't update doc because one doesn't exist with id ${this.id}`
      );
    }

    const updated = produce(data, draft => {
      Object.entries(updates).forEach(([key, value]) => {
        setInPath(draft, key.split("."), value);
      });
    });

    this.write(updated);
  }

  get(): Promise<DocumentSnapshot> {
    return Promise.resolve(new SimpleDocumentSnapshot(this.read()));
  }

  set(data: Data): Promise<void> {
    this.write(data);
    return Promise.resolve();
  }

  async delete(): Promise<void> {
    localStorage.removeItem(this.getKey());
    this.emitSnapshot(undefined);
  }

  onSnapshot(onNext: DocumentSnapshotListener): () => void {
    const handler: DocumentSnapshotListener = (snapshot: DocumentSnapshot) => {
      onNext(snapshot);
    };
    this.handlers.push(handler);

    setTimeout(() => {
      handler(new SimpleDocumentSnapshot(this.read()));
    }, 0);

    return () => {
      this.handlers = this.handlers.filter(x => x !== handler);
    };
  }

  private getKey() {
    return `${this.collectionName}.${this.id}`;
  }

  private read(): Data | undefined {
    const raw = localStorage.getItem(this.getKey());
    return raw == null ? undefined : JSON.parse(raw);
  }

  private write(data: Data): void {
    localStorage.setItem(this.getKey(), JSON.stringify(data));
    this.emitSnapshot(data);
  }

  private emitSnapshot(data: Data | undefined) {
    const snapshot = new SimpleDocumentSnapshot(data);
    this.handlers.forEach(handler => {
      handler(snapshot);
    });
  }
}

class LocalstorageCollectionRef implements CollectionRef {
  private docs: { [id: string]: LocalstorageDocumentRef } = {};
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  async add(data: Data): Promise<LocalstorageDocumentRef> {
    const id = uuid();
    this.docs[id] = new LocalstorageDocumentRef(this.name, id);
    this.docs[id].set(data);
    return this.docs[id];
  }

  doc(id: string): LocalstorageDocumentRef {
    if (!this.docs[id]) {
      this.docs[id] = new LocalstorageDocumentRef(this.name, id);
    }
    return this.docs[id];
  }
}

export class LocalstorageDb implements Db {
  private collections: { [name: string]: LocalstorageCollectionRef } = {};

  collection(name: string): LocalstorageCollectionRef {
    if (!this.collections[name]) {
      this.collections[name] = new LocalstorageCollectionRef(name);
    }
    return this.collections[name];
  }
}

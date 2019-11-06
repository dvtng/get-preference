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
import { setInPath } from "../utilities/setInPath";
import { SimpleDocumentSnapshot } from "./SimpleDocumentSnapshot";

class MemoryDocumentRef implements DocumentRef {
  id: string;
  private data: Data | undefined;
  private handlers: DocumentSnapshotListener[] = [];

  constructor(id: string) {
    this.id = id;
  }

  async update(updates: Data): Promise<void> {
    if (this.data === undefined) {
      throw new Error(
        `Can't update doc because one doesn't exist with id ${this.id}`
      );
    }

    this.data = produce(this.data, draft => {
      Object.entries(updates).forEach(([key, value]) => {
        setInPath(draft, key.split("."), value);
      });
    });
    this.emitSnapshot();
  }

  get(): Promise<SimpleDocumentSnapshot> {
    return Promise.resolve(new SimpleDocumentSnapshot(this.data));
  }

  set(data: Data): Promise<void> {
    this.data = data;
    this.emitSnapshot();
    return Promise.resolve();
  }

  onSnapshot(onNext: DocumentSnapshotListener): () => void {
    const handler: DocumentSnapshotListener = (snapshot: DocumentSnapshot) => {
      onNext(snapshot);
    };
    this.handlers.push(handler);

    const snapshot = new SimpleDocumentSnapshot(this.data);
    setTimeout(() => {
      handler(snapshot);
    }, 0);

    return () => {
      this.handlers = this.handlers.filter(x => x !== handler);
    };
  }

  private emitSnapshot() {
    const snapshot = new SimpleDocumentSnapshot(this.data);
    this.handlers.forEach(handler => {
      handler(snapshot);
    });
  }
}

class MemoryCollectionRef implements CollectionRef {
  private docs: { [id: string]: MemoryDocumentRef } = {};

  async add(data: Data): Promise<MemoryDocumentRef> {
    const id = uuid();
    this.docs[id] = new MemoryDocumentRef(id);
    this.docs[id].set(data);
    return this.docs[id];
  }

  doc(id: string): MemoryDocumentRef {
    if (!this.docs[id]) {
      this.docs[id] = new MemoryDocumentRef(id);
    }
    return this.docs[id];
  }
}

export class MemoryDb implements Db {
  private collections: { [name: string]: MemoryCollectionRef } = {};

  collection(name: string): MemoryCollectionRef {
    if (!this.collections[name]) {
      this.collections[name] = new MemoryCollectionRef();
    }
    return this.collections[name];
  }
}

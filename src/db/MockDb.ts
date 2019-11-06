import uuid from "nanoid";
import produce from "immer";
import {
  DocumentRef,
  DocumentSnapshot,
  Data,
  DocumentSnapshotListener,
  CollectionRef
} from "./Db";
import { setInPath } from "../utilities/setInPath";
import { SimpleDocumentSnapshot } from "./SimpleDocumentSnapshot";

class MockDocumentRef implements DocumentRef {
  id: string;
  private data: Data | undefined;
  private handlers: DocumentSnapshotListener[] = [];

  constructor(id: string, data: Data | undefined) {
    this.id = id;
    this.data = data;
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

class MockCollectionRef implements CollectionRef {
  private docs: { [id: string]: MockDocumentRef } = {};

  async add(data: Data): Promise<MockDocumentRef> {
    const id = uuid();
    this.docs[id] = new MockDocumentRef(id, data);
    return this.docs[id];
  }

  doc(id: string): MockDocumentRef {
    if (!this.docs[id]) {
      this.docs[id] = new MockDocumentRef(id, undefined);
    }
    return this.docs[id];
  }
}

export class MockDb {
  private collections: { [name: string]: MockCollectionRef } = {};

  collection(name: string): MockCollectionRef {
    if (!this.collections[name]) {
      this.collections[name] = new MockCollectionRef();
    }
    return this.collections[name];
  }
}

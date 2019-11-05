import uuid from "nanoid";
import produce from "immer";
import {
  DocumentRef,
  DocumentSnapshot,
  Data,
  DocumentSnapshotListener,
  CollectionRef
} from "./Db";

const setPath = (object: Data, path: string[], value: any): void => {
  const key = path[0];
  if (path.length === 1) {
    object[key] = value;
    return;
  }
  if (!object[key]) {
    object[key] = {};
  }
  setPath(object[key], path.slice(1), value);
};

class MockDocumentSnapshot implements DocumentSnapshot {
  private _data: Data | undefined;

  constructor(data: Data | undefined) {
    this._data = data;
  }

  data(): Data | undefined {
    return this._data;
  }
}

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
        setPath(draft, key.split("."), value);
      });
    });
    this.emitSnapshot();
  }

  onSnapshot(onNext: DocumentSnapshotListener): () => void {
    const handler: DocumentSnapshotListener = (snapshot: DocumentSnapshot) => {
      onNext(snapshot);
    };
    this.handlers.push(handler);

    const snapshot = new MockDocumentSnapshot(this.data);
    handler(snapshot);

    return () => {
      this.handlers = this.handlers.filter(x => x !== handler);
    };
  }

  private emitSnapshot() {
    const snapshot = new MockDocumentSnapshot(this.data);
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

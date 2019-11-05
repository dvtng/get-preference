export type Data = {
  [key: string]: any;
};

export type DocumentSnapshot = {
  data(): Data | undefined;
};

export type DocumentSnapshotListener = (snapshot: DocumentSnapshot) => void;

export type DocumentRef = {
  id: string;
  update(updates: Data): Promise<void>;
  onSnapshot(onNext: DocumentSnapshotListener): () => void;
};

export type CollectionRef = {
  add(data: Data): Promise<DocumentRef>;
  doc(id: string): DocumentRef;
};

export type Db = {
  collection(name: string): CollectionRef;
};

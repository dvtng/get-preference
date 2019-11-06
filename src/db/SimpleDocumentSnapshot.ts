import { DocumentSnapshot, Data } from "./Db";

export class SimpleDocumentSnapshot implements DocumentSnapshot {
  private readonly _data: Data | undefined;

  constructor(data: Data | undefined) {
    this._data = data;
  }

  data(): Data | undefined {
    return this._data;
  }
}

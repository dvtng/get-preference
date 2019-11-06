import { useState, useEffect } from "react";

export type Observable<T> = {
  subscribe(onNext: (value: T) => void): () => void;
};

export const useObservable = <T>(observable: Observable<T>): T | undefined => {
  const [value, setValue] = useState<T | undefined>();

  useEffect(() => {
    return observable.subscribe(v => {
      setValue(v);
    });
  }, [observable]);

  return value;
};

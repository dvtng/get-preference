import { useState, useEffect, useRef } from "react";

export type Observable<T> = {
  subscribe(onNext: (value: T) => void): () => void;
};

export const useObservable = <T>(observable: Observable<T>): T | undefined => {
  const [value, setValue] = useState<T | undefined>();
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return observable.subscribe(v => {
      if (isMountedRef.current) {
        setValue(v);
      }
    });
  }, [observable]);

  return value;
};

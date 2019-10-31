import React, { useState, useEffect, useRef } from "react";

export const Button = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { onClick = () => {}, disabled = false, ...otherProps } = props;

  return (
    <button
      {...otherProps}
      disabled={disabled || isSubmitting}
      onClick={e => {
        const result = onClick(e);
        if (result instanceof Promise) {
          setIsSubmitting(true);
          result.finally(() => {
            if (isMounted.current) {
              setIsSubmitting(false);
            }
          });
        }
        return result;
      }}
    />
  );
};

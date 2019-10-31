import React, { useState } from "react";

export const Button = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { onClick, disabled, ...otherProps } = props;

  return (
    <button
      {...otherProps}
      disabled={disabled || isSubmitting}
      onClick={e => {
        const result = onClick(e);
        if (result instanceof Promise) {
          setIsSubmitting(true);
          result.finally(() => {
            setIsSubmitting(false);
          });
        }
        return result;
      }}
    />
  );
};

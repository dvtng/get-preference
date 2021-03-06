import React, { ReactNode, useState } from "react";
import { Popup } from "./Popup";
import { Button } from "./Button";

export type ConfirmationShowProps<T> = {
  message: ReactNode;
  onConfirm: () => T;
};

export type ConfirmationPopup = {
  show: <T>({ message, onConfirm }: ConfirmationShowProps<T>) => void;
  isOpen: boolean;
  popup: ReactNode;
};

export const useConfirmationPopup = (): ConfirmationPopup => {
  const [
    confirmationShowProps,
    setConfirmationShowProps
  ] = useState<ConfirmationShowProps<unknown> | null>(null);
  const isOpen = confirmationShowProps !== null;

  return {
    isOpen,
    show(props) {
      setConfirmationShowProps(props);
    },
    popup: (
      <Popup
        isOpen={isOpen}
        actions={
          <>
            <Button
              onClick={() => {
                setConfirmationShowProps(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                if (!confirmationShowProps) return;

                const result = confirmationShowProps.onConfirm();
                setConfirmationShowProps(null);
                return result;
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        {confirmationShowProps && <h3>{confirmationShowProps.message}</h3>}
      </Popup>
    )
  };
};

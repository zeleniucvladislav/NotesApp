import { useState } from "react";

import { ModalContext } from "./modal.context";

export const ModalProvider = ({ children }: any) => {
  const [isVisible, setVisibility] = useState<boolean>(false);

  const handleVisibility = (visibility: boolean) => {
    setVisibility(visibility);
  };

  return (
    <ModalContext.Provider value={{ isVisible, handleVisibility }}>
      {children}
    </ModalContext.Provider>
  );
};

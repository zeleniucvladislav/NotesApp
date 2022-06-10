import { createContext, useContext } from "react";

type ModalContextType = {
  isVisible: boolean;
  handleVisibility: (visibility: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  isVisible: false,
  handleVisibility: () => {},
});

export const useModalContext = () => useContext(ModalContext);

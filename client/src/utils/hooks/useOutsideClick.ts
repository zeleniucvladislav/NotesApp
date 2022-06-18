import { useModalContext } from "context/modal/modal.context";
import { useRef, useEffect, useCallback } from "react";

export const useOutsideClick = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { handleVisibility } = useModalContext();

  const handleClickOutside = useCallback(
    (evt: MouseEvent) => {
      console.log("mouse evt");
      if (ref.current && !ref.current.contains(evt.target as HTMLDivElement)) {
        handleVisibility(false);
      }
    },
    [handleVisibility]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref };
};

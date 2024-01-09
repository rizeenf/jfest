import { Ref, RefObject, useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      const refClick = ref.current;

      if (!refClick || null) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref]);
};

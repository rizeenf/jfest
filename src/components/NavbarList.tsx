"use client";

import { PRODUCT_CATEGORY } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavbarItem from "./NavbarItem";
import { useOnClickOutside } from "@/hooks/useOnclickOutside";

const NavbarList = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORY.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const close = () => setActiveIndex(null);

        const isOpen = i === activeIndex;

        return (
          <NavbarItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.label}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavbarList;

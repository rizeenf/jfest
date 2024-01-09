"use client";

import { PRODUCT_CATEGORY } from "@/config";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import NavbarItem from "./NavbarItem";
import { useOnClickOutside } from "@/hooks/useOnclickOutside";

const NavbarList = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const handleOutsideClick = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex h-full ">
      {PRODUCT_CATEGORY.map((product, idx) => {
        const handleClick = () => {
          if (activeIndex === idx) {
            setActiveIndex(null);
          } else {
            setActiveIndex(idx);
          }
        };

        return (
          <NavbarItem
            key={product.name}
            product={product}
            activeIndex={activeIndex}
            handleClick={handleClick}
            idx={idx}
            handleOutsideClick={handleOutsideClick}
          />
        );
      })}
    </div>
  );
};

export default NavbarList;

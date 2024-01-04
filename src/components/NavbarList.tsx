"use client";

import { PRODUCT_CATEGORY } from "@/config";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import NavbarItem from "./NavbarItem";

const NavbarList = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const user = true;

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
          />
        );
      })}
    </div>
  );
};

export default NavbarList;

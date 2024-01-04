import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCT_CATEGORY } from "@/config";

type Category = typeof PRODUCT_CATEGORY;

type NavbarProps = {
  product: Category[number];
  activeIndex: number | null;
  handleClick: () => void;
  idx: number;
};

const NavbarItem = ({
  product,
  activeIndex,
  handleClick,
  idx,
}: NavbarProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center ">
        <Button variant={"link"} className="text-white" onClick={handleClick}>
          {product.name}
          {activeIndex !== idx ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronUp size={14} />
          )}
        </Button>
      </div>
      {activeIndex == idx ? (
        <div className="absolute top-full h-full inset-x-0 px-10 bg-white text-black">
          <div className="absolute top-1/2 inset-0" aria-hidden />
          {product.lists.map((item) => (
            <div className="relative" key={item.title}>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NavbarItem;

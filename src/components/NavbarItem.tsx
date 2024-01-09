import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCT_CATEGORY } from "@/config";
import Image from "next/image";
import { useRef } from "react";
import { useOnClickOutside } from "@/hooks/useOnclickOutside";

type Category = typeof PRODUCT_CATEGORY;

type NavbarProps = {
  product: Category[number];
  activeIndex: number | null;
  handleClick: () => void;
  idx: number;
  handleOutsideClick: () => void;
};

const NavbarItem = ({
  product,
  activeIndex,
  handleClick,
  idx,
  handleOutsideClick,
}: NavbarProps) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, handleOutsideClick);

  return (
    <div ref={navRef} className="flex">
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
        <div className="absolute top-full  inset-x-0 px-10 bg-black bg-opacity-80 text-white">
          <div className="absolute top-1/2 inset-0" aria-hidden />
          <div className="mx-auto max-w-7xl py-14 flex flex-row gap-5">
            {product.lists.map((item) => (
              <div className="relative group" key={item.title}>
                <div className="p-2 border rounded border-white flex flex-col group-hover:opacity-90 text-muted shadow-lg">
                  <div className="relative aspect-video overflow-hidden rounded-sm group-hover:opacity-90 shadow">
                    <Image
                      alt={item.title}
                      src={item.image}
                      width={300}
                      height={300}
                    />
                  </div>
                  <span>{item.title}</span>
                  <span
                    aria-hidden="true"
                    className="text-sm text-muted-foreground"
                  >
                    See details &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarItem;

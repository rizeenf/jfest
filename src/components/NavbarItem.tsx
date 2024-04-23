"use client";

import { PRODUCT_CATEGORY } from "@/config";
import { useOnClickOutside } from "@/hooks/useOnclickOutside";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Category = (typeof PRODUCT_CATEGORY)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavbarItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative hidden sm:flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.name}
          <ChevronDown
            className={cn("h-4 w-4 transition-all", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          onClick={() => close()}
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <div className="relative  bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.lists.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group relative text-base sm:text-sm"
                    >
                      <div onClick={() => close}>
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <Image
                            src={item.image}
                            alt="product category image"
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <span className="mt-6 block font-medium text-gray-900">
                          {item.title}
                        </span>
                        <p className="mt-1" aria-hidden="true">
                          Shop now
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarItem;

"use client";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";

const Cart = () => {
  const { items } = useCart();
  const totalItem = items.length;

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const fee = 9999;

  return (
    <Sheet>
      <SheetTrigger className="group hidden sm:flex flex-row justify-center items-center gap-1">
        <ShoppingCart className="ml-4 h-5 w-5 flex-shrink-0 group-hover:opacity-80" />
        <span className="text-xs group-hover:opacity-80">
          {isMounted ? totalItem : 0}
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({totalItem}) </SheetTitle>
        </SheetHeader>

        {totalItem > 0 ? (
          <>
            <div className="flex w-full flex-col">
              {/* TODO: CART ITEMS */}
              <ScrollArea className="h-[calc(100svh-190px)] w-full">
                {items.map(({ product }, idx) => (
                  <CartItem product={product} key={idx} />
                ))}
              </ScrollArea>
            </div>
            <div className="w-full text-sm my-2">
              <Separator />
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Transaction Fee</span>
                {formatPrice(fee)}
              </div>
              <div className="flex">
                <span className="flex-1">Total</span>
                {formatPrice(cartTotal + fee)}
              </div>
              <Separator />
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href={"/cart"}
                  className={buttonVariants({
                    variant: "default",
                    className: "w-full",
                  })}
                >
                  Checkout
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-56 w-56 text-muted-foreground">
              <Image
                src={"/empty-cart.png"}
                fill
                alt="Empty cart"
                className="object-contain flex-shrink-0 opacity-60"
              />
            </div>
            <span className="text-muted-foreground">Your cart is empty</span>
            <Link
              href="products"
              className={cn(buttonVariants({ variant: "link" }), "text-xs")}
            >
              Add items to your cart
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

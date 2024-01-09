"use client";
import React from "react";
import CurrencyFormat from "react-currency-format";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

const Cart = () => {
  const cart = 0;
  const totalItem = 0;

  return (
    <Sheet>
      <SheetTrigger className="group flex flex-row justify-center items-center gap-1">
        <ShoppingCart className="h-5 w-5 flex-shrink-0 group-hover:opacity-80" />
        <span className="text-xs group-hover:opacity-80">{cart}</span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({cart}) </SheetTitle>
        </SheetHeader>

        {totalItem > 0 ? (
          // TODO: CART ITEMS
          <div className="w-full text-sm my-2">
            <Separator />
            <div className="flex">
              <span className="flex-1">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex">
              <span className="flex-1">Transaction Fee</span>
              <CurrencyFormat
                prefix="Rp "
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                displayType="text"
                value={totalItem}
              />
            </div>
            <div className="flex">
              <span className="flex-1">Total</span>
              <CurrencyFormat
                prefix="Rp "
                thousandSeparator={true}
                fixedDecimalScale={true}
                decimalScale={2}
                displayType="text"
                value={totalItem}
              />
            </div>
            <Separator />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-56 w-56 text-muted-foreground">
              <Image
                src={"/empty-cart2.png"}
                fill
                alt="Empty cart"
                className="object-contain flex-shrink-0 opacity-60"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              Your cart is empty
            </span>
            <Link
              href="products"
              className={buttonVariants({ variant: "link" })}
            >
              Add items to your cart
            </Link>
          </div>
        )}
        <SheetFooter>
          {totalItem > 0 ? (
            <Button variant={"default"} className="w-full">
              Checkout
            </Button>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

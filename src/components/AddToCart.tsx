"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/payload-types";

const AddToCart = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addItem } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size={"lg"}
      disabled={isSuccess}
      className="w-full"
    >
      {isSuccess ? "Added successfully!" : "Add to cart"}
    </Button>
  );
};

export default AddToCart;

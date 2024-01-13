"use client";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORY } from "@/config";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const { items, removeItem } = useCart();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Shopping cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-dashed border-2 border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src={"/empty-cart.png"}
                    fill
                    loading="eager"
                    className="object-contain flex-shrink-0 opacity-60"
                    alt="Empty shopping cart"
                  />
                </div>
                <h3 className="font-semibold text-xl">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORY.find(
                    (item) => item.label === product.category
                  )?.name;

                  const { image } = product.images[0];

                  return (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-32">
                          {typeof image !== "string" && image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt={product.name}
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-base">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Category : {label}
                              </p>
                            </div>
                            <p className=" mt-1 text-sm font-medium text-gray-900">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <div className="mt-2 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="Remove Product"
                                onClick={() => removeItem(product.id)}
                                variant={"ghost"}
                                size={"sm"}
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex items-center space-x-2 text-sm text-gray-700">
                          <Check className="h-3 w-3 flex-shrink-0 text-green-500" />
                          <span className="text-sm">Instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

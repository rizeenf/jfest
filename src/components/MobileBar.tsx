import { PRODUCT_CATEGORY } from "@/config";
import { cn } from "@/lib/utils";
import { User } from "@/payload-types";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "./ui/sheet";
import MyAccountNav from "./MyAccountNav";

const MobileBar = ({ user }: { user: User | null }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="absolute inset-y-0 mt-1 right-3 z-50 sm:hidden text-zinc-50"
        >
          <Menu size={18} className="w-6 h-6 flex-shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="overflow-y-auto overscroll-y-none inset-0 ">
          <ul className="my-2 h-[calc(100svh-190px)]">
            {PRODUCT_CATEGORY.map((product, idx) => (
              <li key={idx} className="space-y-10 px-2 mt-4">
                <div className="border-b border-gray-200">
                  <div className="-mb-px flex">
                    <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-2 text-base font-medium">
                      {product.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-4">
                  {product.lists.map((item) => (
                    <div
                      key={item.title}
                      className="group line-clamp-1 relative text-xs"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          fill
                          src={item.image}
                          alt="product category image"
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-3 block font-medium text-gray-900"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <SheetFooter>
            <div className="flex flex-col gap-3">
              <SheetTrigger asChild>
                <Link
                  href={"/cart"}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex flex-row justify-center items-center"
                  )}
                >
                  <Cart />
                </Link>
              </SheetTrigger>

              {!user ? (
                <div className="flex flex-row gap-3">
                  <SheetTrigger asChild>
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({
                        variant: "ghost",
                        className: "w-full",
                      })}
                    >
                      Sign up
                    </Link>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Link
                      href={"/sign-in"}
                      className={buttonVariants({
                        className: "w-full",
                      })}
                    >
                      Sign in
                    </Link>
                  </SheetTrigger>
                </div>
              ) : (
                <MyAccountNav user={user} />
              )}
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBar;

import Image from "next/image";
import WidthWrapper from "./WidthWrapper";
import NavbarList from "./NavbarList";
import Link from "next/link";
import Cart from "./Cart";
import { buttonVariants } from "./ui/button";
import { getServerUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import MyAccountNav from "./MyAccountNav";

const Navbar = async () => {
  // const user = true;
  const nextCookies = cookies();
  const { user } = await getServerUser(nextCookies);

  return (
    <div className="sticky z-50 top-0 inset-x-0 h-12 bg-rose-600">
      <WidthWrapper className="h-12 ">
        <header className="flex flex-row  gap-5 text-white h-full drop-shadow border-b border-rose-500">
          <Link href="../" className="self-center">
            <div className="relative bg-white flex-shrink-0 h-11 w-11 rounded">
              <Image
                src={"/logo/myjfest.svg"}
                alt="MyJFest logo"
                fill
                className="p-1"
              />
            </div>
          </Link>
          <div className="flex flex-row">
            <NavbarList />
          </div>
          <div className="hidden sm:flex flex-row ml-auto items-center gap-2">
            {user ? null : (
              <div className="hidden sm:flex items-center">
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    variant: "ghost",
                    className: "text-white",
                  })}
                >
                  Sign in
                </Link>
              </div>
            )}

            {user ? null : (
              <span className="w-px hidden sm:flex h-5 bg-rose-700" />
            )}

            {user ? null : (
              <div className="hidden sm:flex items-center">
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    variant: "ghost",
                    className: "text-white",
                  })}
                >
                  Sign up
                </Link>
              </div>
            )}

            {user ? null : (
              <span className="w-px hidden sm:flex h-5 bg-rose-700" />
            )}

            {user ? <MyAccountNav user={user} /> : null}

            {user ? (
              <span className="w-px hidden sm:flex h-5 bg-rose-700" />
            ) : null}

            <Cart />
          </div>
        </header>
      </WidthWrapper>
    </div>
  );
};

export default Navbar;

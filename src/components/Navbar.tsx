import Image from "next/image";
import WidthWrapper from "./WidthWrapper";
import NavbarList from "./NavbarList";
import Link from "next/link";
import Cart from "./Cart";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const user = true;

  return (
    <div className="sticky top-0 inset-x-0 h-12 bg-rose-600 shadow-lg border-b border-rose-400">
      <WidthWrapper className="h-12">
        <header className="flex flex-row  gap-5 text-white h-full">
          <Link href="../" className="self-center">
            <Image
              src={"/logo/myjfest.svg"}
              alt="MyJFest logo"
              width={42}
              height={42}
              className="bg-white p-1"
            />
          </Link>
          <div className="flex flex-row">
            <NavbarList />
          </div>
          <div className="flex flex-row ml-auto items-center gap-2">
            {user ? (
              <div className="hidden md:flex items-center">
                <Link
                  href="sign-in"
                  className={buttonVariants({
                    variant: "link",
                    className: "text-white",
                  })}
                >
                  Sign in
                </Link>
              </div>
            ) : null}

            {user ? (
              <span className="w-px hidden md:flex h-5 bg-rose-700" />
            ) : null}

            {user ? (
              <div className="hidden md:flex items-center">
                <Link
                  href="sign-up"
                  className={buttonVariants({
                    variant: "link",
                    className: "text-white",
                  })}
                >
                  Sign up
                </Link>
              </div>
            ) : null}

            {user ? (
              <span className="w-px hidden md:flex h-5 bg-rose-700" />
            ) : null}

            {!user ? (
              <span className="w-px hidden md:flex h-5 bg-rose-700" />
            ) : null}

            <Cart />
          </div>
        </header>
      </WidthWrapper>
    </div>
  );
};

export default Navbar;

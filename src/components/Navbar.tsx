import Image from "next/image";
import WidthWrapper from "./WidthWrapper";
import NavbarList from "./NavbarList";

const Navbar = () => {
  return (
    <div className="sticky top-0 inset-x-0 h-12 bg-rose-600 shadow-lg border-b border-rose-400">
      <WidthWrapper className="h-12">
        <header className="flex flex-row  gap-5 text-white h-full">
          <Image
            src={"/logo/myjfest.svg"}
            alt="MyJFest logo"
            width={42}
            height={42}
            className="bg-white p-1 self-center"
          />
          <div className="flex flex-row">
            <NavbarList />
          </div>
        </header>
      </WidthWrapper>
    </div>
  );
};

export default Navbar;

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const WidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl sm:px-20 px-5", className)}
    >
      {children}
    </div>
  );
};

export default WidthWrapper;

"use client";
import { trpc } from "@/trpc/client";
import { Shell, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface TokenPropsTypes {
  token: string;
}

const VerifyEmail = ({ token }: TokenPropsTypes) => {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="mx-auto relative flex ">
          <XCircle className="text-rose-400 h-12 w-12" />
        </div>
        <h2 className="text-center font-semibold">Something went wrong</h2>
        <span className="text-muted-foreground text-center text-sm">
          This token might be expired or invalid. Please try again.
        </span>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <div className="mx-auto relative flex ">
          <Shell className="animate-spin text-rose-200 h-12 w-12" />
        </div>
        <h2 className="text-center font-semibold mt-4 ">Verifying...</h2>
        <span className="text-muted-foreground text-center text-sm ">
          Please wait, this won&apos;t take long.
        </span>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex flex-col justify-center h-full items-center">
        <div className="mx-auto relative w-60 h-60 flex ">
          <Image src={"/email-sent.png"} fill alt="Email Sent" />
        </div>
        <h2 className="text-center text-lg font-semibold">
          You&apos;re all set!
        </h2>
        <span className="text-muted-foreground text-center text-sm">
          Thank you for verifying your email.
        </span>
        <Link
          href={"/sign-in"}
          className={buttonVariants({ className: "mt-3" })}
        >
          Sign in
        </Link>
      </div>
    );
  }
};

export default VerifyEmail;

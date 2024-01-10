"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, TAuthSchema } from "@/lib/auth-register-schema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = () => {};

  return (
    <div className="relative container pt-20 flex flex-col justify-center items-center">
      <div className="mx-auto flex flex-col justify-center gap-3 w-full sm:w-[350px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={"/logo/myjfest.svg"}
            width={100}
            height={100}
            alt="MyJfest Logo"
            className=""
          />
          <h1 className="text-xl font-semibold">Create an account</h1>
          <span className="text-sm text-muted-foreground -mt-5">
            Already have an account?
            <Link
              href={"/sign-in"}
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-2 text-sm"
              )}
            >
              Sign in &rarr;
            </Link>
          </span>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  className={cn({
                    "focus-visible:ring-orange-500": errors.email,
                  })}
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </div>
              <div className="grid gap-1 py-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  className={cn({
                    "focus-visible:ring-orange-500": errors.password,
                  })}
                  placeholder="******"
                  type="password"
                  {...register("password")}
                />
              </div>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

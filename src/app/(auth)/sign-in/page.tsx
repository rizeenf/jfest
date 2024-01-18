"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthSchema, TAuthSchema } from "@/lib/validators/auth-register-schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  const handleConAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const handleConAsSeller = () => {
    router.push("?as=seller");
  };

  const { mutate: signIn, isLoading } = trpc.auth.signInUser.useMutation({
    onSuccess: () => {
      toast.success("Sign in successfully");

      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: ({ data }) => {
      if (data?.code == "UNAUTHORIZED") {
        toast.error("Invalid email or password");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthSchema) => {
    signIn({ email, password });
  };

  return (
    <div className="relative container pt-20 flex flex-col justify-center items-center">
      <div className="mx-auto flex flex-col justify-center gap-3 w-full sm:w-[350px] animate-in duration-500 fade-in-5">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Image
            src={"/logo/myjfest.svg"}
            width={50}
            height={50}
            className="h-20 w-20"
            alt="MyJfest Logo"
            priority={false}
          />
          <h1 className="text-xl text-center font-semibold">
            Sign in to your {isSeller ? "seller" : ""} account
          </h1>
          <span className="text-xs text-center text-muted-foreground ml-5 -mt-5">
            Don&apos;t have an account?
            <Link
              href={"/sign-up"}
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-3 text-xs"
              )}
            >
              Sign up &rarr;
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
                {errors?.email && (
                  <span className="text-xs text-rose-500">
                    {errors.email.message}
                  </span>
                )}
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
                {errors?.password && (
                  <span className="text-xs text-rose-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Shell className="w-3 h-3 animate-spin mr-1" />
                ) : null}
                Sign in
              </Button>
            </div>
          </form>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="text-xs relative flex justify-center uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          {isSeller ? (
            <Button
              variant={"secondary"}
              onClick={handleConAsBuyer}
              disabled={isLoading}
            >
              Continue as customer
            </Button>
          ) : (
            <Button
              variant={"secondary"}
              onClick={handleConAsSeller}
              disabled={isLoading}
            >
              Continue as seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

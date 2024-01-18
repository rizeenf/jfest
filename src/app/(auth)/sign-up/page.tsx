"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthSchema, TAuthSchema } from "@/lib/validators/auth-register-schema";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Loader2, Shell } from "lucide-react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchema>({
    resolver: zodResolver(AuthSchema),
  });

  // const { data } = trpc.anyRoute.useQuery();
  // console.log(data);

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createUserPayload.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email already registered. Please sign in instead.");

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Something went wrong, please try again.");
    },

    onSuccess: ({ sentToEmail }) => {
      toast.success(
        "Registration successful! Redirecting to the verification page..."
      );

      router.push(`/verify-email?to=${sentToEmail}`);
    },
  });

  const onSubmit = ({ email, password }: TAuthSchema) => {
    mutate({ email, password });
  };

  return (
    <div className="relative container pt-20 flex flex-col justify-center items-center">
      <div className="mx-auto flex flex-col justify-center gap-3 w-full sm:w-[350px] animate-in duration-500 fade-in-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src={"/logo/myjfest.svg"}
            width={50}
            height={50}
            className="h-20 w-20"
            alt="MyJfest Logo"
            priority={false}
          />
          <h1 className="text-xl text-center font-semibold">
            Create an account
          </h1>
          <span className="text-xs text-muted-foreground ml-4 -mt-5">
            Already have an account?
            <Link
              href={"/sign-in"}
              className={cn(
                buttonVariants({ variant: "link" }),
                "-ml-3 text-xs"
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
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

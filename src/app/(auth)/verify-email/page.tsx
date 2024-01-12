import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Page = ({ searchParams }: ParamsProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex flex-col justify-center items-center pt-20 ">
      {token && typeof token === "string" ? (
        <div className="flex flex-col w-full sm:w-[300px]">
          <VerifyEmail token={token} />
        </div>
      ) : (
        <div className="flex flex-col w-full sm:w-[300px]">
          <div className="mx-auto relative w-60 h-60 flex ">
            <Image src={"/email-sent.png"} fill alt="Email Sent" />
          </div>
          <h2 className="text-center text-lg font-semibold">
            Check your email
          </h2>
          {toEmail ? (
            <span className="text-muted-foreground text-center text-sm">
              We&apos;ve sent a verification link to{" "}
              <span className="font-semibold">{toEmail}</span>.
            </span>
          ) : (
            <span className="text-muted-foreground text-center text-sm">
              We&apos;ve sent a verification link to your email.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;

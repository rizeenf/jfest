import WidthWrapper from "@/components/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BadgeCheck, Gem, LucideIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
  {
    name: "Diverse Quality Events",
    desc: "Discover the best Japanese festivals around you, ranging from traditional to modern, tailored to your preferences.",
    icon: Gem,
  },
  {
    name: "Integrated Community Spot",
    desc: "Providing an ideal gathering place for communities of Japanese culture enthusiasts to interact and share mutual interests.",
    icon: BadgeCheck,
  },
  {
    name: "Satisfying Cultural Experience",
    desc: "Enjoy a fulfilling experience by discovering nearby Japanese festivals that bring you closer to their cultural richness.",
    icon: Sparkles,
  },
];

const Home = () => {
  return (
    <>
      <Image
        alt="Background image"
        src={"/images/background.jpg"}
        className="-z-10 filter blur-[3px] object-cover"
        fill
      />
      <WidthWrapper className="py-20">
        <section className="flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            Discover your nearest
            <span className="text-rose-600 font-bold"> Japan festival</span>,
            gathering places for your need.
          </h1>
          <span className="max-w-xl mt-5 text-rose-50">
            Welcome to
            <span className="text-rose-600 font-semibold"> MyJFest</span>, a
            home where you can finding Japanese events without hard to tracking
            down. Looking to find events based on time, artists, and specific
            locales.
          </span>
          <div className="mt-5 flex flex-row items-center gap-3">
            <Link href="/" className={cn(buttonVariants(), "text-white")}>
              Browse trending
            </Link>
            <span className="w-px h-6 bg-rose-600" />
            <Button variant="link" className="text-white">
              Our creator &rarr;
            </Button>
          </div>
        </section>
      </WidthWrapper>
      <section className="border-t bg-gray-50 border-gray-100 flex-grow">
        <WidthWrapper className="py-20">
          <div className="flex flex-col gap-10 sm:flex-row text-center items-center justify-center">
            {perks.map((item) => (
              <div key={item.name} className="flex items-center gap-2 flex-col">
                <div className="rounded-full border h-12 w-12 flex justify-center items-center bg-rose-600 border-rose-300 shadow-md">
                  {<item.icon className="text-white" size={24} />}
                </div>
                <span className="">{item.name}</span>
                <span className="text-muted-foreground text-sm max-w-sm">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </WidthWrapper>
      </section>
    </>
  );
};

export default Home;

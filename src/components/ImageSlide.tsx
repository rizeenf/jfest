import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

type ImageSlideProps = {
  urls: string[];
};

const ImageSlide = ({ urls }: ImageSlideProps) => {
  const activeStyle =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-item-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyle = "hidden text-gray-400";

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button></button>
        <button></button>
      </div>

      <Swiper className="w-full h-full">
        {urls.map((url, idx) => (
          <SwiperSlide key={url} className="-z-10 relative h-full w-full">
            <Image
              fill
              loading="eager"
              className="-z-10 w-full h-full object-cover object-center"
              src={url}
              alt="Product Image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlide;

"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselItems = [
  {
    image: "/images/29841.jpg",
    title: "Research",
    description:
      <>We help you research to<br />create the ideal experience.</>,
  },
  {
    image: "/images/4292.jpg",
    title: "Price quotes",
    description:
      "Get comprehensive price quotes with all options clearly explained.",
  },
  {
    image: "/images/amalfi.webp",
    title: "Bookings",
    description:
      "We handle all your bookings from start to finish.",
  },
  {
    image: "/images/family2.webp",
    title: "Amendments",
    description:
      "We'll handle all amendments quickly and efficiently.",
  },
  {
    image: "/images/home-snow-mountain.webp",
    title: "Aftercare",
    description:
      "We're here to help with any questions, even after you return home.",
  },
];

const DetailHandledCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi}>
        <div className="flex flex-col items-center gap-4">
          <CarouselContent className="max-w-[350px] select-none">
            {carouselItems.map((item, idx) => (
              <CarouselItem className="w-fit" key={idx}>
                <div className="aspect-4/5 relative max-h-[450px] rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-b from-[#004F6E] absolute inset-0 rounded-2xl to-transparent to-40%" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-full rounded-2xl object-cover"
                  />
                  {/* Graduated Frosted Glass Overlay from Bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[60%] backdrop-blur-xl z-[5] rounded-b-2xl" 
                    style={{ 
                      backgroundColor: 'rgba(0, 79, 110, 0.4)',
                      WebkitBackdropFilter: 'blur(24px)',
                      backdropFilter: 'blur(24px)',
                      maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)'
                    }} 
                  />
                  {/* Glass pill badge - top left */}
                  <div
                    className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <span className="text-white text-xs font-bold uppercase tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  {/* Glass icon - top right */}
                  <div
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <p className="text-white/90 text-base md:text-lg font-semibold">
                      {typeof item.description === 'string' ? item.description : item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation arrows - below carousel */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <CarouselPrevious className="static size-12 translate-x-0 translate-y-0 hover:bg-[#004F6E] hover:border-[#004F6E] active:bg-[#004F6E] active:border-[#004F6E] transition-colors duration-200 [&:hover_svg]:!text-[rgb(159,240,212)] [&:active_svg]:!text-[rgb(159,240,212)]" />
            <CarouselNext className="static size-12 translate-x-0 translate-y-0 hover:bg-[#004F6E] hover:border-[#004F6E] active:bg-[#004F6E] active:border-[#004F6E] transition-colors duration-200 [&:hover_svg]:!text-[rgb(159,240,212)] [&:active_svg]:!text-[rgb(159,240,212)]" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export { DetailHandledCarousel };


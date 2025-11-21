"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Logos10 = () => {
  const logos = [
    {
      id: "logo-1",
      description: "Jet2Holidays",
      image: "/images/logos/Jet2Holidays Logo.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-2",
      description: "TUI",
      image: "/images/logos/TUI_Logo_2016.svg.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-3",
      description: "Audley",
      image: "/images/logos/audley-logo-green.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-4",
      description: "NCLH",
      image: "/images/logos/NCLH_BIG-28a413a2.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-5",
      description: "P&O Cruises",
      image: "/images/logos/P&O Cruises Logo 2.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-6",
      description: "Saga",
      image: "/images/logos/Saga-Logo-min.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-7",
      description: "Virgin Voyages",
      image: "/images/logos/Virgin Voyages Logo.png",
      className: "max-h-10 w-auto",
    },
    {
      id: "logo-8",
      description: "Logo",
      image: "/images/logos/logo.fa71aa996cd64c0e4df7.webp",
      className: "max-h-10 w-auto",
    },
  ];

  return (
    <section className="pt-0 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative w-[95vw] mx-auto -mt-12 sm:-mt-16 lg:-mt-20">
      <div className="w-full">
        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo, index) => (
                <CarouselItem
                  key={logo.id}
                  className="h-35 relative flex basis-1/2 justify-center pl-0 sm:basis-1/4 md:basis-1/3 lg:basis-1/6"
                >
                  <div className={`flex flex-col items-center justify-center lg:mx-10 ${logo.description === "P&O Cruises" || logo.description === "Saga" || logo.description === "Virgin Voyages" ? "h-14" : "h-10"}`}>
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={`max-w-full h-auto w-auto object-contain ${logo.description === "P&O Cruises" || logo.description === "Saga" || logo.description === "Virgin Voyages" ? "max-h-14" : "max-h-10"}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-32 to-transparent"></div>
          <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-32 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos10 };

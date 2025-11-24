"use client";

import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";

interface DatItem {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage: string;
  tag: string;
  headline: string;
  body: string;
  backgroundColor?: string;
  altText: string;
}

const DATA: DatItem[] = [
  {
    id: "1",
    title: "Custom Web Development",
    price: "$1,500",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    hoverImage: "/images/family2.webp",
    tag: "Families",
    headline: "Families",
    body: "Perfect holidays designed for families of all sizes, with activities and accommodations everyone will love.",
    backgroundColor: "#a7675a",
    altText: "Family enjoying a sunny beach holiday together",
  },
  {
    id: "2",
    title: "Mobile App Development",
    price: "$2,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "/images/4292.jpg",
    tag: "Cruises",
    headline: "Cruises",
    body: "Luxury cruise experiences to stunning destinations, with world-class dining and entertainment on board.",
    backgroundColor: "#0e2232",
    altText: "Luxury cruise ship sailing on blue ocean waters",
  },
  {
    id: "3",
    title: "Cloud Solutions",
    price: "$3,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage: "/images/moon-rise-midtown-manhattan-with-city-skyline-night.webp",
    tag: "City Breaks",
    headline: "City Breaks",
    body: "Explore vibrant cities around the world, from cultural landmarks to hidden local gems.",
    backgroundColor: "#162532",
    altText: "City skyline at night with illuminated buildings",
  },
  {
    id: "4",
    title: "UI/UX Design",
    price: "$1,200",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage: "/images/photo-boy-ski-top-vigo-mountain.webp",
    tag: "Ski",
    headline: "Ski",
    body: "Hit the slopes at world-renowned ski resorts with perfectly planned winter getaways.",
    backgroundColor: "#e38d32",
    altText: "Person skiing down snow-covered mountain slope",
  },
  {
    id: "5",
    title: "E-Commerce Platforms",
    price: "$2,500",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "/images/home-snow-mountain.webp",
    tag: "Lapland",
    headline: "Lapland",
    body: "Magical Lapland experiences including Northern Lights, husky sledding, and Santa's village.",
    backgroundColor: "#4b1c15",
    altText: "Snow-covered mountain landscape in Lapland",
  },
  {
    id: "6",
    title: "AI & Machine Learning",
    price: "$5,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage: "/images/woman-looking-lake-against-sky.webp",
    tag: "Adventure",
    headline: "Adventure",
    body: "Thrilling adventure holidays for the bold, from hiking and diving to extreme sports.",
    backgroundColor: "#667052",
    altText: "Person enjoying outdoor adventure by a scenic lake",
  },
  {
    id: "7",
    title: "DevOps Services",
    price: "$2,800",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage: "/images/safariholiday.webp",
    tag: "Safari",
    headline: "Safari",
    body: "Experience the wild beauty of Africa with unforgettable safari adventures, from game drives to luxury lodges.",
    backgroundColor: "#bca17b",
    altText: "Wildlife safari in African savanna landscape",
  },
  {
    id: "8",
    title: "Cybersecurity Solutions",
    price: "$4,000",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage: "/images/vertical-shot-sea-with-ferries-wheel-distance-blue-sky.webp",
    tag: "UK",
    headline: "UK",
    body: "Discover the beauty of the UK, from historic cities to stunning countryside and coastal escapes.",
    backgroundColor: "#21272a",
    altText: "UK coastal scene with sea and blue sky",
  },
];

const HolidayTypeGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Calculate current index based on scroll position
    const cardWidth = 334 + 16; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const scroll = (direction: 'prev' | 'next') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 350; // Width of one card + gap
    const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount);
    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  // Calculate the progress bar width and position
  const progressWidth = 240;
  const progressIndicatorWidth = progressWidth / DATA.length;
  const progressOffset = currentIndex * progressIndicatorWidth;

  return (
    <section className="pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-12 lg:pb-12 px-5 sm:px-6 lg:px-8 relative w-[95vw] max-w-7xl mx-auto">
      <div className="w-full">
        <div className="flex justify-start lg:justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
            <span>ALL HOLIDAY TYPES</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-left lg:text-center mb-2 sm:mb-2 lg:mb-3 leading-tight" style={{ color: '#004F6E' }}>
          Every type of holiday,<br className="lg:hidden" /><br className="hidden lg:block" /> any kind of budget
        </h2>
        <p className="text-lg sm:text-lg md:text-xl text-left lg:text-center mb-6 sm:mb-8 lg:mb-10 max-w-3xl lg:mx-auto leading-relaxed text-muted-foreground">
          From beach escapes to city adventures,<br className="lg:hidden" /><br className="hidden lg:block" /> we&apos;ll help with any holiday you want.
        </p>
        
        <div className="flex justify-end mb-6 sm:mb-8 px-5 lg:px-6">
          <div className="flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll('prev')}
              disabled={!canScrollPrev}
              aria-label="Previous holiday type"
              className="rounded-full hover:bg-[#004F6E] hover:border-[#004F6E] hover:text-[rgb(159,240,212)] active:bg-[#004F6E] active:border-[#004F6E] active:text-[rgb(159,240,212)] transition-colors duration-200 [&:hover_svg]:!text-[rgb(159,240,212)] [&:active_svg]:!text-[rgb(159,240,212)]"
            >
              <ArrowLeft className="size-5 transition-colors duration-200" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => scroll('next')}
              disabled={!canScrollNext}
              aria-label="Next holiday type"
              className="rounded-full hover:bg-[#004F6E] hover:border-[#004F6E] hover:text-[rgb(159,240,212)] active:bg-[#004F6E] active:border-[#004F6E] active:text-[rgb(159,240,212)] transition-colors duration-200 [&:hover_svg]:!text-[rgb(159,240,212)] [&:active_svg]:!text-[rgb(159,240,212)]"
            >
              <ArrowRight className="size-5 transition-colors duration-200" />
            </Button>
          </div>
        </div>

        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scroll('prev');
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scroll('next');
              }
            }}
            tabIndex={0}
            role="region"
            aria-label="Holiday types carousel"
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-5 lg:px-6 pb-10 focus:outline-none focus:ring-2 focus:ring-[#004F6E] focus:ring-offset-2 rounded-lg"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {DATA.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[334px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <a
                  href={`/services/${product.id}`}
                  className="group relative flex h-full flex-col items-start justify-start gap-3"
                >
                  <div className="w-full">
                    <div 
                      className="group relative z-10 overflow-hidden rounded-3xl transition-all duration-500 ease-out" 
                      style={{ 
                        aspectRatio: "3/4",
                        transform: 'translateZ(0)', // Forces GPU layer for proper clipping
                        WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Forces strict masking in WebKit
                      }}
                    >
                      {/* Flat Color Background */}
                      <div className="absolute inset-0 z-0" style={{ backgroundColor: product.backgroundColor || '#004F6E' }}></div>
                      
                      {/* Noise Texture - Families Card Only */}
                      {product.tag === 'Families' && (
                        <div 
                          className="absolute inset-0 z-[1] noise-texture overflow-hidden" 
                          style={{
                            clipPath: 'inset(0 round 1.5rem)',
                            WebkitClipPath: 'inset(0 round 1.5rem)',
                          }}
                        />
                      )}
                      
                      {/* Image with Gradient Mask - fades out at bottom */}
                      <img
                        src={product.hoverImage}
                        alt={product.altText}
                        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:brightness-75 group-hover:scale-110 z-0"
                        style={{  
                          maskImage: 'linear-gradient(to bottom, black 0%, black 75%, rgba(0,0,0,0.8) 82%, rgba(0,0,0,0.5) 86%, rgba(0,0,0,0.2) 90%, transparent 93%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, rgba(0,0,0,0.8) 82%, rgba(0,0,0,0.5) 86%, rgba(0,0,0,0.2) 90%, transparent 93%)',
                          objectPosition: product.tag === 'City Breaks' 
                            ? 'center 5%' 
                            : product.tag === 'Adventure'
                            ? 'center 10%'
                            : (product.tag === 'Cruises' || product.tag === 'Families' || product.tag === 'Ski' || product.tag === 'Lapland') 
                            ? 'center 20%' 
                            : 'center top',
                          transform: product.tag === 'City Breaks' 
                            ? 'translateY(-30%)' 
                            : product.tag === 'Adventure'
                            ? 'translateY(-20%)'
                            : (product.tag === 'Cruises' || product.tag === 'Families' || product.tag === 'Ski' || product.tag === 'Lapland') 
                            ? 'translateY(-10%)' 
                            : 'none'
                        }}
                      />
                      
                      {/* Animated Sunlight Effect */}
                      <div 
                        className="absolute inset-0 pointer-events-none rounded-3xl"
                        style={{
                          zIndex: 5,
                          overflow: 'hidden',
                          borderRadius: '1.5rem',
                        }}
                      >
                        <div 
                          className="absolute sunlight-animation"
                          style={{
                            background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 70%, transparent 100%)',
                            width: '150%',
                            height: '40%',
                            top: '20%',
                            left: '-25%',
                            animationDelay: `${index * 1.5}s`,
                          }}
                        />
                      </div>
                      
                      {/* Frosted Glass Overlay from Bottom */}
                      <div 
                        className={`absolute bottom-0 left-0 right-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0 z-20 rounded-b-3xl ${product.tag === 'City Breaks' ? 'h-[40%]' : 'h-[55%]'}`}
                        style={{ 
                          backgroundColor: product.backgroundColor === '#0e2232' 
                            ? 'rgba(14, 34, 50, 0.25)' 
                            : product.backgroundColor === '#a7675a'
                            ? 'rgba(167, 103, 90, 0.25)'
                            : product.backgroundColor === '#5c3a23'
                            ? 'rgba(92, 58, 35, 0.25)'
                            : product.backgroundColor === '#162532'
                            ? 'rgba(22, 37, 50, 0.25)'
                            : product.backgroundColor === '#e38d32'
                            ? 'rgba(227, 141, 50, 0.25)'
                            : product.backgroundColor === '#4b1c15'
                            ? 'rgba(75, 28, 21, 0.25)'
                            : product.backgroundColor === '#667052'
                            ? 'rgba(102, 112, 82, 0.25)'
                            : product.backgroundColor === '#21272a'
                            ? 'rgba(33, 39, 42, 0.25)'
                            : product.backgroundColor === '#bca17b'
                            ? 'rgba(188, 161, 123, 0.25)'
                            : 'rgba(255, 255, 255, 0.25)',
                          WebkitBackdropFilter: 'blur(12px)',
                          backdropFilter: 'blur(12px)',
                          maskImage: 'linear-gradient(to top, black 0%, black 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                        }} 
                      />

                      {/* White Headline and Body */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
                        <h3 className="text-xl sm:text-xl lg:text-2xl font-medium text-white mb-2" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.8)' }}>
                          {product.headline}
                        </h3>
                        <p className="text-base sm:text-base text-white leading-tight" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.8)' }}>
                          {product.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded" style={{ backgroundColor: 'rgba(220, 215, 211, 0.5)' }}>
            <div
              className="h-[2px] rounded transition-transform duration-300 ease-out"
              style={{
                width: `${progressIndicatorWidth}px`,
                transform: `translateX(${progressOffset}px)`,
                backgroundColor: '#004F6E'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { HolidayTypeGallery };

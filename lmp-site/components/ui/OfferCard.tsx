"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Heart, Tag, Plane } from "lucide-react";

interface OfferCardProps {
  image?: string;
  destination?: string;
  description?: string;
  className?: string;
}

const OfferCard = ({
  image = "/images/logos/portraitjane.webp",
  destination = "New York",
  description = "Experience the stunning beauty of this breathtaking destination with luxury accommodations and unforgettable moments.",
  className = "",
}: OfferCardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      className={`overflow-hidden shadow-none relative rounded-lg md:rounded-2xl cursor-pointer bg-transparent w-full max-w-[280px] mx-auto md:max-w-none md:w-[358px] aspect-[280/400] md:aspect-[358/475] ${className}`}
      style={{ 
        maxWidth: '100%',
        maxHeight: 'none',
        border: '0px solid white',
        boxShadow: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        background: 'transparent',
      }}
    >
      {/* Background Image */}
      <img
        src={image}
        alt="Exclusive travel offer"
        className="absolute inset-0 w-full h-full object-cover rounded-lg md:rounded-2xl"
      />
      
      {/* Exclusive Badge - Top Left */}
      <div 
        className="absolute top-3 md:top-4 left-3 md:left-4 z-10 h-8 md:h-10 rounded-full flex items-center justify-center px-2 md:px-3"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <span className="text-[10px] md:text-xs font-medium text-white uppercase tracking-wide whitespace-nowrap">
          exclusive
        </span>
      </div>

      {/* Heart Icon - Top Right */}
      <div 
        className={`absolute top-3 md:top-4 right-3 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${isAnimated ? 'heart-tap-animation' : ''}`}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <Heart 
          className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 relative z-10 ${isAnimated ? 'text-pink-500 fill-pink-500' : 'text-white'}`} 
          strokeWidth={2}
          fill={isAnimated ? 'currentColor' : 'none'}
          style={{
            transitionDelay: isAnimated ? '650ms' : '0s',
          }}
        />
        {/* Sparkle effects */}
        {isAnimated && (
          <>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full sparkle-1" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full sparkle-2" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full sparkle-3" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full sparkle-4" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full sparkle-5" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-pink-300 rounded-full sparkle-6" />
          </>
        )}
      </div>
      
      {/* White Overlay - Wipes up from bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 top-0 bg-white z-[10]"
        style={{
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          backgroundColor: 'rgb(255, 255, 255)',
          opacity: 1,
          clipPath: isAnimated ? 'inset(50% 0 0 0)' : 'inset(100% 0 0 0)',
          WebkitClipPath: isAnimated ? 'inset(50% 0 0 0)' : 'inset(100% 0 0 0)',
          transition: 'clip-path 1s ease-in-out, -webkit-clip-path 1s ease-in-out',
        }}
      />
      
      {/* Top Section - Headline and Nights (moves up on animation) */}
      <div className={`absolute left-0 right-0 z-20 px-4 md:px-6 transition-all duration-500 ${isAnimated ? 'top-[calc(50%+0.5rem)] md:top-[calc(50%+1rem)]' : 'bottom-16 md:bottom-20'}`}>
        <h3 
          className={`text-xl md:text-2xl font-bold text-left mb-0 transition-colors duration-300 ${isAnimated ? 'text-[#004F6E]' : 'text-white drop-shadow-lg'}`}
          style={{
            transitionDelay: isAnimated ? '650ms' : '0s',
          }}
        >
          {destination}
        </h3>
        <p 
          className={`text-sm md:text-base text-left -mt-0.5 mb-2 transition-colors duration-300 ${isAnimated ? 'text-[#004F6E]' : 'text-white/90 drop-shadow-lg'}`}
          style={{
            transitionDelay: isAnimated ? '650ms' : '0s',
          }}
        >
          7 nights
        </p>
        {/* Body Copy - appears on animation below "7 nights" */}
        <div className={`transition-all duration-300 overflow-hidden ${isAnimated ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
          <p className="text-sm md:text-sm text-[#004F6E]/80 leading-tight mb-0 mt-2 pr-8 md:pr-0">
            {description}
          </p>
        </div>
        
        {/* NJT Logo - Absolutely positioned, doesn't affect layout */}
        <div 
          className={`absolute right-4 md:right-6 transition-opacity duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
          style={{
            top: '4px',
            transitionDelay: isAnimated ? '1.1s' : '0s',
          }}
        >
          <img
            src="/images/logos/NJT Logo Cruise Blue.webp"
            alt="Not Just Travel"
            className="w-auto object-contain h-6 md:h-[30px]"
          />
        </div>
      </div>

      {/* Bottom Section - Price and Plane/Airport (stays fixed at bottom) */}
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-20 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Tag 
              className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300 ${isAnimated ? 'text-[#004F6E]' : 'text-white'}`} 
              strokeWidth={2}
              style={{
                transitionDelay: isAnimated ? '300ms' : '0s',
              }}
            />
            <span 
              className={`text-sm md:text-sm transition-colors duration-300 ${isAnimated ? 'text-[#004F6E]' : 'text-white drop-shadow-lg'}`}
              style={{
                transitionDelay: isAnimated ? '300ms' : '0s',
              }}
            >
              from £999pp
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Plane 
              className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300 ${isAnimated ? 'text-[#004F6E]' : 'text-white'}`} 
              strokeWidth={2}
              style={{
                transitionDelay: isAnimated ? '300ms' : '0s',
              }}
            />
            <span 
              className={`text-sm md:text-sm transition-colors duration-300 ${isAnimated ? 'text-[#004F6E]' : 'text-white drop-shadow-lg'}`}
              style={{
                transitionDelay: isAnimated ? '300ms' : '0s',
              }}
            >
              MCR
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { OfferCard };


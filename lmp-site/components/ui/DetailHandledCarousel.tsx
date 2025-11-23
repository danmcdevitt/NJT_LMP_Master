"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Calendar, Edit, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    image: "/images/researchmaldives.webp",
    title: "Research",
    icon: Search,
    description:
      <>We'll help you research<br />and create the ideal experience</>,
  },
  {
    image: "/images/research.webp",
    title: "Quotes",
    icon: null,
    iconText: "£",
    description:
      <>Get informative quotes with<br />all the detail you need</>,
  },
  {
    image: "/images/bookings.webp",
    title: "Bookings",
    icon: Calendar,
    description:
      <>We'll take care of everything<br />so you can relax from the start</>,
  },
  {
    image: "/images/onholiday.webp",
    title: "On Holiday",
    icon: Edit,
    description:
      <>We're just a call or text away<br />while you're on holiday</>,
  },
];

const DetailHandledCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation logic
  useEffect(() => {
    if (isHovered) {
      // Pause auto-rotation on hover
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start auto-rotation
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3500); // Change card every 3.5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  // Handle click to advance
  const handleCardClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  // Calculate card position in stack
  const getCardStyle = (index: number) => {
    const totalCards = carouselItems.length;
    const relativeIndex = (index - currentIndex + totalCards) % totalCards;
    
    if (relativeIndex === 0) {
      // Top card - fully visible, centered
      return {
        zIndex: totalCards,
        opacity: 1,
        transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)',
        pointerEvents: 'auto' as const,
      };
    } else if (relativeIndex <= 3) {
      // Cards behind - orderly fan spread
      // Alternate cards to left and right in an orderly pattern
      const isLeft = relativeIndex % 2 === 1; // 1st, 3rd cards go left
      const offsetX = isLeft ? -(relativeIndex * 12) : (relativeIndex * 12);
      const offsetY = relativeIndex * 10; // Slight downward offset
      const rotation = isLeft ? -3 : 3; // Consistent rotation direction
      const scale = 1 - relativeIndex * 0.04; // Slight scale reduction
      
      return {
        zIndex: totalCards - relativeIndex,
        opacity: 1, // Full opacity - no transparency
        transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotation}deg) scale(${scale})`,
        pointerEvents: 'none' as const,
      };
    } else {
      // Cards further back - hidden
      return {
        zIndex: 0,
        opacity: 0,
        transform: 'translateX(0) translateY(0) rotate(0deg) scale(0.9)',
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <div className="w-full mt-8 md:mt-12 overflow-visible">
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .detail-carousel-container {
            width: calc(420px + 120px) !important;
            height: calc(420px + 120px) !important;
            min-height: calc(420px + 120px) !important;
          }
          .detail-carousel-card {
            width: 420px !important;
            height: 420px !important;
            top: 60px !important;
            left: 60px !important;
          }
        }
        @media (max-width: 767px) {
          .detail-carousel-wrapper {
            padding: 0 40px !important;
            margin: 0 -24px !important;
          }
          .detail-carousel-container {
            width: 100% !important;
            max-width: 100% !important;
            height: calc(280px + 100px) !important;
            min-height: calc(280px + 100px) !important;
          }
          .detail-carousel-card {
            width: 280px !important;
            height: 280px !important;
            top: 50px !important;
            left: calc(50% - 140px) !important;
            box-shadow: none !important;
          }
        }
      `}} />
      <div className="detail-carousel-wrapper">
        <div 
          className="relative mx-auto overflow-visible detail-carousel-container"
          style={{ 
            width: '100%',
            maxWidth: '100%',
            height: 'calc(280px + 100px)',
            minHeight: 'calc(280px + 100px)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        {carouselItems.map((item, idx) => {
          const cardStyle = getCardStyle(idx);
          const isTopCard = idx === currentIndex;
          const totalCards = carouselItems.length;
          const relativeIndex = (idx - currentIndex + totalCards) % totalCards;
          
          // Add shadow based on position in stack - removed on mobile
          const shadowStyle = relativeIndex === 0 
            ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
            : relativeIndex === 1
            ? '0 15px 30px rgba(0, 0, 0, 0.25)'
            : relativeIndex === 2
            ? '0 10px 20px rgba(0, 0, 0, 0.2)'
            : '0 5px 10px rgba(0, 0, 0, 0.15)';
          
          return (
            <div
              key={idx}
              className="absolute aspect-square rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-700 ease-out hover:brightness-105 detail-carousel-card"
              style={{
                width: '280px',
                height: '280px',
                top: '30px',
                left: 'calc(50% - 140px)',
                ...cardStyle,
                // Shadow will be removed on mobile via CSS
                boxShadow: shadowStyle,
              }}
              onClick={isTopCard ? handleCardClick : undefined}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-gradient-to-b from-[#004F6E] absolute inset-0 rounded-2xl to-transparent to-40%" />
              <img
                src={item.image}
                alt={item.title}
                className="size-full rounded-2xl object-cover"
                style={
                  item.title === "On Holiday" 
                    ? { objectPosition: '35% bottom' } 
                    : item.title === "Bookings"
                    ? { objectPosition: 'right bottom' }
                    : {}
                }
              />
              {/* Graduated Frosted Glass Overlay from Bottom */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[60%] backdrop-blur-xl z-[5] rounded-b-2xl" 
                style={{ 
                  backgroundColor: 'rgba(0, 79, 110, 0.65)',
                  WebkitBackdropFilter: 'blur(28px)',
                  backdropFilter: 'blur(28px)',
                  maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)'
                }} 
              />
              {/* Glass pill badge - top left */}
              <div
                className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(159, 240, 212, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(159, 240, 212, 0.5)',
                }}
              >
                <span className="text-white text-xs font-bold uppercase tracking-wide">
                  {item.title}
                </span>
              </div>
              {/* Glass icon - top right */}
              <div
                className="absolute top-4 right-4 z-10 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {item.iconText ? (
                  <span className="text-white text-base md:text-xl font-bold">{item.iconText}</span>
                ) : item.icon ? (
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
                ) : null}
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <p className="text-white/90 text-base md:text-lg font-semibold leading-tight">
                  {typeof item.description === 'string' ? item.description : item.description}
                </p>
              </div>
              {/* Arrow indicator - bottom right */}
              <div className="hidden md:flex absolute bottom-4 right-4 z-10 w-8 h-8 rounded-full items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30">
                <ChevronRight className="w-4 h-4" style={{ color: 'rgb(159, 240, 212)' }} strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export { DetailHandledCarousel };


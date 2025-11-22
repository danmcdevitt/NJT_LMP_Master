"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const CheckInAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any existing timeout
            if (delayTimeoutRef.current) {
              clearTimeout(delayTimeoutRef.current);
            }
            // Add delay before showing animation
            delayTimeoutRef.current = setTimeout(() => {
              setIsVisible(true);
            }, 800); // 800ms delay
          } else {
            // Reset animation when out of view
            if (delayTimeoutRef.current) {
              clearTimeout(delayTimeoutRef.current);
              delayTimeoutRef.current = null;
            }
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ aspectRatio: 'inherit' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .checkin-fade-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .checkin-fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 500ms ease-out, transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .checkin-container-enter {
          opacity: 0;
          transform: translateY(20px) scale(0.95);
        }
        .checkin-container-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: opacity 700ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />
      
      {/* Container */}
      <div className="relative rounded-[2rem] overflow-hidden transition-all duration-700 ease-out" style={{ backgroundColor: 'transparent' }}>
        {/* Status Area */}
        <div className="px-6 py-6">
          <div className={`backdrop-blur-xl rounded-2xl p-5 transition-all duration-500 relative overflow-hidden ${isVisible ? 'checkin-container-enter-active' : 'checkin-container-enter'}`} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.22)',
            WebkitBackdropFilter: 'blur(30px)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.15), 0 0 60px rgba(255, 255, 255, 0.08), inset 0 0 30px rgba(255, 255, 255, 0.1)',
            maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 60%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 90%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 60%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 90%, transparent 100%)'
          }}>
            {/* Cruise Blue edge fade - blends to background */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
              background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 65%, rgba(0, 79, 110, 0.2) 75%, rgba(0, 79, 110, 0.5) 85%, rgba(0, 79, 110, 0.8) 95%, rgb(0, 79, 110) 100%)',
              WebkitBackdropFilter: 'blur(15px)',
              backdropFilter: 'blur(15px)'
            }} />
            {/* Success State */}
            <div className="flex flex-col items-center justify-center py-1 space-y-3">
              <div className={`h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-emerald-600 transition-transform duration-500 ease-out ${isVisible ? 'scale-100' : 'scale-0'}`}>
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center space-y-0.5">
                <h3 className={`text-lg font-medium tracking-tight ${isVisible ? 'checkin-fade-enter-active' : 'checkin-fade-enter'}`} style={{ color: 'rgba(255, 245, 250, 0.98)' }}>
                  You're all checked in
                </h3>
                <p className={`text-xs ${isVisible ? 'checkin-fade-enter-active' : 'checkin-fade-enter'}`} style={{ color: 'rgba(250, 250, 250, 0.9)' }}>
                  Boarding pass sent to your wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CheckInAnimation };


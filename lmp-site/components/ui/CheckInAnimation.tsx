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
      `}} />
      
      {/* Container */}
      <div className="relative rounded-[2rem] overflow-hidden transition-all duration-700 ease-out" style={{ backgroundColor: 'rgba(255, 83, 83, 0.6)' }}>
        {/* Status Area */}
        <div className="px-6 py-6">
          <div className="backdrop-blur-md rounded-2xl p-5 border shadow-sm transition-all duration-500 bg-emerald-50/80 border-emerald-100/50">
            {/* Success State */}
            <div className="flex flex-col items-center justify-center py-1 space-y-3">
              <div className={`h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-emerald-600 transition-transform duration-500 ease-out ${isVisible ? 'scale-100' : 'scale-0'}`}>
                <Check className="w-6 h-6" />
              </div>
              <div className="text-center space-y-0.5">
                <h3 className={`text-lg font-medium text-slate-900 tracking-tight ${isVisible ? 'checkin-fade-enter-active' : 'checkin-fade-enter'}`}>
                  You're all checked in
                </h3>
                <p className={`text-xs text-slate-500 ${isVisible ? 'checkin-fade-enter-active' : 'checkin-fade-enter'}`}>
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


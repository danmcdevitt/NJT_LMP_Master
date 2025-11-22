"use client";

import { Star, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewCardProps {
  name?: string;
  initials?: string;
  review?: string;
  trip?: string;
  trustpilotUrl?: string;
  className?: string;
}

const ReviewCard = ({
  name = "Rachel",
  initials = "RS",
  review = "First time of using a travel agent and Becky was recommended by a friend. Our first holiday aboard with two boys they were keen to go but nervous about going, along with a husband who hadn't travelled for a long time either! Becky listened to all our quirks and came up with two good places and we tweaked flights etc and then booked! We had great flights, the hotel was just what we needed and overall non of us wanted to come home! The service we had from Becky was excellent, very easy to talk to but listened to the brief and hit it perfectly. The communication continued even after we had arrived to make sure we were having a great time! We cannot thank you enough!",
  trip = "Trip to Europe",
  trustpilotUrl = "https://www.trustpilot.com/review/www.notjusttravel.com",
  className = "",
}: ReviewCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full max-w-xl ${className}`}>
      {/* Main Glass Card */}
      <div
        className="relative bg-white/60 backdrop-blur-xl border border-neutral-200/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 overflow-hidden flex flex-col transition-opacity duration-800 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        {/* Subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

        {/* Header: User & Stars */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6 md:mb-8">
          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-neutral-100 text-neutral-600 text-sm font-medium tracking-tight">
              {initials}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="text-base font-medium text-neutral-800 tracking-tight">
                {name}
              </h3>
              <p className="text-xs text-neutral-400 font-normal">
                Verified Traveler
              </p>
            </div>
          </div>

          {/* 5 Star Rating */}
          <div className="flex items-center gap-1 p-2 bg-white/50 rounded-full border border-neutral-200/50 shadow-sm">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-green-500 fill-green-500" />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1">
          <p className="text-sm md:text-base leading-relaxed text-neutral-600 font-normal text-justify sm:text-left">
            {review}
          </p>
        </div>

        {/* Footer / Date */}
        <div className="pt-6 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-400 mt-auto">
          <span>{trip}</span>
          <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-default">
            <CheckCircle2 className="w-3 h-3 text-neutral-500" />
            <span>Booking Confirmed</span>
          </div>
        </div>

        {/* Trustpilot Button */}
        <div className="pt-4 mt-4 border-t border-neutral-200/60">
          <a
            href={trustpilotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black hover:bg-neutral-800 border-2 border-green-500 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md"
          >
            <img
              src="/images/logos/Trustpilot.png"
              alt="Trustpilot"
              className="h-4 w-auto object-contain"
            />
            <span>See our 6,000+ 5-star reviews.</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export { ReviewCard };


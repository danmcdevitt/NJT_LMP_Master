"use client";

import { ArrowRight, User, Gift, Plane, Star, ShieldCheck, Sparkles, Lightbulb, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FeatureGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
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
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative w-[95vw] mx-auto">
      <div className="w-full">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
            <Star className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
            <span>HOW IT WORKS</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-center mb-3 sm:mb-4 lg:mb-6 leading-tight" style={{ color: '#004F6E' }}>
          Everything you need, from<br className="hidden lg:block" /> someone you can call anytime
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-center mb-3 sm:mb-4 lg:mb-6 max-w-3xl mx-auto leading-relaxed text-muted-foreground">
          Get all the benefits, deals and protection of a major travel brand,<br className="hidden lg:block" /> as well as the personal number of your travel agent.
        </p>
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <a
            href="#"
            className={`group flex flex-col justify-end col-span-2 rounded-lg p-4 md:p-6 lg:p-10 sm:max-lg:col-span-1 ${isVisible ? 'fade-in-1' : ''}`}
            style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s ease-out 0s, transform 0.8s ease-out 0s' } : { transition: 'opacity 0.8s ease-out 0s, transform 0.8s ease-out 0s' }) }}
          >
            <User className="w-8 h-8 mb-2" style={{ color: '#004F6E' }} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 leading-none" style={{ color: '#004F6E' }}>
              Personal service
            </h3>
            <p className="text-sm md:text-base lg:text-lg font-medium leading-tight max-w-[18rem] sm:max-w-[20rem] text-balance" style={{ color: '#004F6E' }}>
              You'll be looked after by one of the top travel agents in the UK.
            </p>
          </a>
          <div className={`flex flex-col justify-end rounded-lg p-4 md:p-6 lg:p-10 ${isVisible ? 'fade-in-2' : ''}`} style={{ backgroundColor: 'rgba(159, 213, 209, 0.2)', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.9s ease-out 0.1s, transform 0.9s ease-out 0.1s' } : { transition: 'opacity 0.9s ease-out 0.1s, transform 0.9s ease-out 0.1s' }) }}>
            <Lightbulb className="w-8 h-8 mb-2" style={{ color: '#004F6E' }} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 leading-none" style={{ color: '#004F6E' }}>Insider knowledge</h3>
            <p className="text-sm md:text-base lg:text-lg font-medium leading-tight" style={{ color: '#004F6E' }}>
              Access to exclusive deals and expert industry insights.
            </p>
          </div>
          <div className={`relative flex flex-col items-start justify-between rounded-lg p-4 md:p-6 lg:p-10 overflow-hidden ${isVisible ? 'fade-in-3' : ''}`} style={{ backgroundColor: '#004F6E', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s' } : { transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s' }) }}>
            {/* Animated Shield Composition */}
            <div className="relative flex items-center justify-center flex-1 w-full" style={{ animation: 'float 6s ease-in-out infinite' }}>
              {/* Concentric Circles Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Inner Circle */}
                <div className="w-20 h-20 rounded-full border border-[#9FD5D1]/20 absolute"></div>
                
                {/* Middle Dashed Circle (Rotating) */}
                <div className="w-28 h-28 rounded-full border border-dashed border-[#9FD5D1]/15 absolute" style={{ animation: 'spin-slow 20s linear infinite' }}></div>
                
                {/* Outer Circle */}
                <div className="w-36 h-36 rounded-full border border-[#9FD5D1]/10 absolute"></div>
                
                {/* Faint Pulse Circle */}
                <div className="w-20 h-20 rounded-full border border-[#9FD5D1]/30 absolute" style={{ animation: 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
              </div>

              {/* Shield SVG without scanning beam */}
              <div className="relative drop-shadow-[0_0_25px_rgba(159,213,209,0.4)] transform scale-100 z-20">
                <svg width="80" height="95" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#9FD5D1]">
                  {/* Background of shield (Glassy) */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#9FD5D1" fillOpacity="0.05"></path>

                  {/* Shield Outline */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                
                {/* Plane Icon Centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#004F6E] p-2 rounded-full border border-[#9FD5D1]/30 shadow-[0_0_15px_rgba(159,213,209,0.25)]">
                    <Plane className="w-5 h-5 text-[#9FD5D1]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Headline and Body Copy */}
            <div className="mt-4 z-10">
              <ShieldCheck className="w-8 h-8 text-white mb-2" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white text-left mb-2 leading-none">Complete protection</h3>
              <p className="text-sm md:text-base lg:text-lg font-medium text-white text-left leading-tight">ABTA and ATOL protected for total peace of mind.</p>
            </div>
          </div>
          <div className={`flex flex-col justify-end rounded-lg p-4 md:p-6 lg:p-10 ${isVisible ? 'fade-in-4' : ''}`} style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 1s ease-out 0.15s, transform 1s ease-out 0.15s' } : { transition: 'opacity 1s ease-out 0.15s, transform 1s ease-out 0.15s' }) }}>
            <Sparkles className="w-8 h-8 mb-2" style={{ color: '#004F6E' }} />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 leading-none" style={{ color: '#004F6E' }}>Tailored to you,</h3>
            <p className="text-sm md:text-base lg:text-lg font-medium leading-tight" style={{ color: '#004F6E' }}>
              Every holiday suggestion is carefully crafted.
            </p>
          </div>
          <div className={`flex flex-col justify-end rounded-lg p-4 md:p-6 lg:p-10 ${isVisible ? 'fade-in-5' : ''}`} style={{ backgroundColor: '#FF5353', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.85s ease-out 0.25s, transform 0.85s ease-out 0.25s' } : { transition: 'opacity 0.85s ease-out 0.25s, transform 0.85s ease-out 0.25s' }) }}>
            <Gift className="w-8 h-8 mb-2 text-white" />
            <div className="mb-2 text-lg sm:text-xl lg:text-2xl font-medium text-white leading-none">Totally free</div>
            <div className="text-sm md:text-base lg:text-lg font-medium text-white leading-tight">Every detail taken care of, without costing you a penny.</div>
          </div>
          <a
            href="#"
            className={`group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1 ${isVisible ? 'fade-in-6' : ''}`}
            style={!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.95s ease-out 0.3s, transform 0.95s ease-out 0.3s' } : { transition: 'opacity 0.95s ease-out 0.3s, transform 0.95s ease-out 0.3s' }}
          >
            <img
              src="/images/amalfi.webp"
              alt="Amalfi Coast"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="sm:aspect-2/1 relative flex h-full w-full flex-col items-start justify-end p-4 transition-colors md:p-6 lg:p-10" style={{ backgroundColor: 'rgba(0, 79, 110, 0.5)' }}>
              <div className="relative z-10">
                <Heart className="w-8 h-8 mb-2 text-white" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white mb-2 leading-none">
                  Honest, unbiased advice
                </h3>
                <p className="text-sm md:text-base lg:text-lg font-medium text-white leading-tight">
                  No hidden agendas, just genuine<br />
                  recommendations that put you first.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { FeatureGrid };


"use client";

import { ArrowRight, User, Gift, Plane, Star, ShieldCheck, Sparkles, Lightbulb, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CheckInAnimation } from "@/components/ui/CheckInAnimation";
import { useConnectionQuality } from "@/lib/useConnectionQuality";

const FeatureGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Connection quality detection for slow connections
  const { shouldAutoplayVideo, videoPreload } = useConnectionQuality();

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
    <section ref={sectionRef} className="pt-6 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-24 px-5 sm:px-6 lg:px-8 relative w-[95vw] max-w-7xl mx-auto">
      <div className="w-full">
        <div className="flex justify-start lg:justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
            <Star className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
            <span>HOW IT WORKS</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-left lg:text-center mb-2 sm:mb-2 lg:mb-3 leading-tight" style={{ color: '#004F6E' }}>
          Truly personal service, from<br className="hidden lg:block" /> someone you can call anytime
        </h2>
        <p className="text-lg sm:text-lg md:text-xl text-left lg:text-center mb-6 sm:mb-8 lg:mb-10 max-w-3xl lg:mx-auto leading-relaxed text-muted-foreground">
          Get all the benefits, deals and protection of a major travel brand,<br className="hidden lg:block" /> as well as the personal number of your travel agent.
        </p>
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <div
            className={`group relative flex flex-col lg:col-span-2 rounded-lg pb-8 pt-4 pl-5 pr-4 md:p-6 lg:p-10 sm:max-lg:col-span-1 overflow-hidden min-h-[360px] lg:min-h-0 ${isVisible ? 'fade-in-1' : ''}`}
            style={!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s ease-out 0s, transform 0.8s ease-out 0s' } : { transition: 'opacity 0.8s ease-out 0s, transform 0.8s ease-out 0s' }}
          >
            {/* Background Image */}
            <img
              src="/images/corfu.webp"
              alt="Corfu"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Frosted Glass Overlay from Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[80%] backdrop-blur-xl z-0" 
              style={{ 
                backgroundColor: 'rgba(9, 24, 36, 0.3)',
                WebkitBackdropFilter: 'blur(24px)',
                backdropFilter: 'blur(24px)',
                maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)'
              }} 
            />
            
            <div className="relative z-10 flex flex-col justify-end h-full">
              <User className="w-8 h-8 mb-2 text-white" />
              <h3 className="text-xl sm:text-xl lg:text-2xl font-medium mb-2 leading-none text-white" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                <span className="lg:text-[1.275rem]">The best service</span>
              </h3>
              <p className="text-lg md:text-base lg:text-lg font-medium leading-tight max-w-[18rem] sm:max-w-[20rem] text-balance text-white lg:text-[0.96rem]">
                You'll be looked after by one of the top travel agents in the UK.
              </p>
            </div>
          </div>
          <div className={`group relative flex flex-col justify-end overflow-hidden rounded-lg pb-8 pt-4 pl-5 pr-4 md:p-6 lg:p-10 min-h-[360px] lg:min-h-0 ${isVisible ? 'fade-in-2' : ''}`} style={!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.9s ease-out 0.1s, transform 0.9s ease-out 0.1s' } : { transition: 'opacity 0.9s ease-out 0.1s, transform 0.9s ease-out 0.1s' }}>
            {/* Background Image */}
            <img
              src="/images/friendlyadvice.webp"
              alt="Friendly advice"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Frosted Glass Overlay from Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[80%] backdrop-blur-xl z-0" 
              style={{ 
                backgroundColor: 'rgba(9, 24, 36, 0.3)',
                WebkitBackdropFilter: 'blur(24px)',
                backdropFilter: 'blur(24px)',
                maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)'
              }} 
            />
            <div className="relative z-10">
              <Lightbulb className="w-8 h-8 mb-2 text-white" />
              <h3 className="text-xl sm:text-xl lg:text-2xl font-medium mb-2 leading-none text-white" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                <span className="lg:text-[1.275rem]">Friendly advice</span>
              </h3>
              <p className="text-lg md:text-base lg:text-lg font-medium leading-tight text-white lg:text-[0.96rem]">
                Get helpful guidance and recommendations.
              </p>
            </div>
          </div>
          <div className={`relative flex flex-col items-start justify-between rounded-lg pb-8 pt-4 pl-5 pr-4 md:p-6 lg:p-10 overflow-hidden min-h-[360px] lg:min-h-0 ${isVisible ? 'fade-in-3' : ''}`} style={{ backgroundColor: '#004F6E', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s' } : { transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s' }) }}>
            {/* Animated Shield Composition */}
            <div className="relative flex items-center justify-center flex-1 w-full self-center" style={{ animation: 'float 6s ease-in-out infinite' }}>
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
            <div className="relative z-10">
              <ShieldCheck className="w-8 h-8 text-white mb-2" />
              <h3 className="text-xl sm:text-xl lg:text-2xl font-medium text-white text-left mb-2 leading-none" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                <span className="lg:text-[1.275rem]">Complete protection</span>
              </h3>
              <p className="text-lg md:text-base lg:text-lg font-medium text-white text-left leading-tight lg:text-[0.96rem]">ABTA and ATOL protected<br className="lg:hidden" /> for total peace of mind.</p>
            </div>
          </div>
          <div className={`group relative flex flex-col justify-end overflow-clip rounded-lg pb-8 pt-4 pl-5 pr-4 md:p-6 lg:p-10 min-h-[360px] lg:min-h-0 ${isVisible ? 'fade-in-4' : ''}`} style={!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 1s ease-out 0.15s, transform 1s ease-out 0.15s' } : { transition: 'opacity 1s ease-out 0.15s, transform 1s ease-out 0.15s' }}>
            <img
              src="/images/villa1.webp"
              alt="Villa"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Frosted Glass Overlay from Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[40%] backdrop-blur-md" 
              style={{ 
                backgroundColor: 'rgba(9, 24, 36, 0.3)',
                WebkitBackdropFilter: 'blur(12px)',
                backdropFilter: 'blur(12px)',
                maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
              }} 
            />
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 mb-2 text-white" />
              <h3 className="text-xl sm:text-xl lg:text-2xl font-medium mb-2 leading-none text-white" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                <span className="lg:text-[1.275rem]">Tailored to you,</span>
              </h3>
              <p className="text-lg md:text-base lg:text-lg font-medium leading-tight text-white lg:text-[0.96rem]">
                Every holiday suggestion<br className="lg:hidden" /> is carefully crafted.
              </p>
            </div>
          </div>
          <div className={`relative flex flex-col justify-end overflow-hidden rounded-lg pb-8 pt-4 pl-5 pr-4 md:p-6 lg:p-10 min-h-[360px] lg:min-h-0 ${isVisible ? 'fade-in-5' : ''}`} style={{ backgroundColor: '#004F6E', ...(!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.85s ease-out 0.25s, transform 0.85s ease-out 0.25s' } : { transition: 'opacity 0.85s ease-out 0.25s, transform 0.85s ease-out 0.25s' }) }}>
            {/* NJ Logo Image Layer - Above Background */}
            <div className="absolute inset-0 z-[0.5] flex items-start justify-center pointer-events-none">
              <img 
                src="/images/NJ-only-white.png" 
                alt="NJ Logo" 
                className="w-auto h-auto max-w-full max-h-full object-contain"
                style={{ opacity: 0.1 }}
              />
            </div>
            {/* Check-in Animation - Behind Content */}
            <div className="absolute inset-0 flex items-center justify-center z-0" style={{ top: '-5%' }}>
              <div className="w-full h-full" style={{ aspectRatio: 'inherit' }}>
                <div className="w-full h-full flex items-center justify-center" style={{ transform: 'scale(0.922)' }}>
                  <CheckInAnimation />
                </div>
              </div>
            </div>
            {/* Frosted Glass Overlay - Behind Text */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[80%] backdrop-blur-xl" 
              style={{ 
                backgroundColor: 'rgba(0, 79, 110, 0.5)',
                WebkitBackdropFilter: 'blur(24px)',
                backdropFilter: 'blur(24px)',
                maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, transparent 100%)',
                zIndex: 5
              }} 
            />
            {/* Text Content - On Top */}
            <div className="relative z-10 flex flex-col justify-end">
              <Gift className="w-8 h-8 mb-2 text-white" />
              <div className="mb-2 text-xl sm:text-xl lg:text-2xl font-medium text-white leading-none" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                <span className="lg:text-[1.275rem]">Totally free</span>
              </div>
              <div className="text-lg md:text-base lg:text-lg font-medium text-white leading-tight lg:text-[0.96rem]">Every detail taken care of,<br className="lg:hidden" /> without costing you a penny.</div>
            </div>
          </div>
          <a
            href="#"
            className={`group relative lg:col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1 min-h-[360px] lg:min-h-0 ${isVisible ? 'fade-in-6' : ''}`}
            style={!isVisible ? { opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.95s ease-out 0.3s, transform 0.95s ease-out 0.3s' } : { transition: 'opacity 0.95s ease-out 0.3s, transform 0.95s ease-out 0.3s' }}
          >
            {/* Background Image Fallback - Shows immediately while video loads */}
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/images/sequence_03_poster.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Video Background */}
            <video
              autoPlay={shouldAutoplayVideo}
              loop
              muted
              playsInline
              preload={videoPreload}
              poster="/images/sequence_03_poster.jpg"
              className="absolute z-[1]"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'cover'
              }}
            >
              <source src="/Sequence%2003-converted.webm" type="video/webm" />
              <source src="/Sequence%2003-converted.mp4" type="video/mp4" />
            </video>
            
            <div className="sm:aspect-2/1 relative flex h-full w-full flex-col items-start justify-end pb-8 pt-4 pl-5 pr-4 transition-colors md:p-6 lg:p-10 z-10" style={{ backgroundColor: 'rgba(0, 79, 110, 0.5)' }}>
              <div className="relative z-10">
                <Heart className="w-8 h-8 mb-2 text-white" />
                <h3 className="text-xl sm:text-xl lg:text-2xl font-medium text-white mb-2 leading-none" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                  <span className="lg:text-[1.275rem]">One contact</span>
                </h3>
                <p className="text-lg md:text-base lg:text-lg font-medium text-white leading-tight lg:text-[0.96rem]">
                  One dedicated person from planning<br />
                  to your return, always here for you.
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


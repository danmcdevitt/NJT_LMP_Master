"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { HolidayTypeGallery } from "@/components/ui/holidaytypegallery";
import { Feature197 } from "@/components/feature197";
import { Footer13 } from "@/components/footer13";
import { PolicyModal } from "@/components/PolicyModal";
import { useEffect, useState, useRef } from "react";
import { Sparkles, MapPin, Award, ArrowRight, Plane, User, Phone, Heart } from "lucide-react";
import { useConnectionQuality } from "@/lib/useConnectionQuality";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFanCards, setShowFanCards] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [sparkleAnimated, setSparkleAnimated] = useState(false);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Connection quality detection for slow connections
  const { shouldAutoplayVideo, videoPreload, isSlowConnection } = useConnectionQuality();
  
  // Ensure video autoplays (fallback for browser autoplay policies)
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const attemptPlay = () => {
      if (shouldAutoplayVideo && video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Autoplay was prevented - this is normal for some browsers
            console.log('Video autoplay prevented:', error);
          });
        }
      }
    };
    
    // Try to play when video is ready
    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay, { once: true });
      video.addEventListener('canplay', attemptPlay, { once: true });
    }
    
    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [shouldAutoplayVideo]);
  
  // Profile card name font sizing
  const mobileNameRef = useRef<HTMLHeadingElement>(null);
  const desktopNameRef = useRef<HTMLHeadingElement>(null);
  const [mobileFontSize, setMobileFontSize] = useState<string>('text-[1.5rem] sm:text-[1.8rem]');
  const [desktopFontSize, setDesktopFontSize] = useState<string>('text-[1.8rem] sm:text-[2.4rem]');
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset; // Safari fallback
      setIsScrolled(currentScrollY > 10);
      
      // Track scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      const scrollThreshold = 200; // Show cards after scrolling 200px
      const hideThreshold = 100; // Hide cards when scrolling back up below this point
      
      // Show cards when scrolling past threshold, keep them visible once shown
      // Only hide when scrolling back up near the top
      if (currentScrollY > scrollThreshold) {
        setShowFanCards(true);
      } else if (currentScrollY < hideThreshold) {
        setShowFanCards(false);
      }
      
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Intersection Observer for carousel container
  useEffect(() => {
    if (!carouselContainerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only trigger animation if not already visible to prevent re-triggering
            if (!carouselVisible) {
              setCarouselVisible(true);
              // Animate cards sequentially based on scroll direction
              if (scrollDirection === 'down') {
                // Left to right: card 0, then 1, then 2
                setTimeout(() => setVisibleCards([true, false, false]), 100);
                setTimeout(() => setVisibleCards([true, true, false]), 250);
                setTimeout(() => setVisibleCards([true, true, true]), 400);
              } else {
                // Right to left: card 2, then 1, then 0
                setTimeout(() => setVisibleCards([false, false, true]), 100);
                setTimeout(() => setVisibleCards([false, true, true]), 250);
                setTimeout(() => setVisibleCards([true, true, true]), 400);
              }
            }
          } else {
            // Reset when scrolling away from the section
            if (scrollDirection === 'up' && scrollY < 200) {
              setCarouselVisible(false);
              setVisibleCards([false, false, false]);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of container is visible
        rootMargin: '-50px 0px', // Trigger when container is 50px into viewport
      }
    );
    
    observer.observe(carouselContainerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [scrollDirection, scrollY, carouselVisible]);

  // Sparkle animation observer - triggers once when features section is visible
  useEffect(() => {
    if (!carouselContainerRef.current || sparkleAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !sparkleAnimated) {
            setSparkleAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(carouselContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sparkleAnimated]);

  // Adjust mobile name font size if it exceeds 2 lines
  useEffect(() => {
    const adjustFontSize = (ref: React.RefObject<HTMLHeadingElement | null>, setFontSize: (size: string) => void, baseSize: string) => {
      if (!ref.current) return;
      
      const element = ref.current;
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      const scrollHeight = element.scrollHeight;
      
      // Check if text exceeds 2 lines (allowing some tolerance)
      if (scrollHeight > lineHeight * 2.2) {
        // Reduce font size progressively (20% smaller than original)
        if (baseSize.includes('text-4xl') || baseSize.includes('1.8rem')) {
          setFontSize('text-[1.2rem] sm:text-[1.5rem]');
        } else if (baseSize.includes('text-3xl') || baseSize.includes('1.5rem')) {
          setFontSize('text-[1rem] sm:text-[1.2rem]');
        } else if (baseSize.includes('text-5xl') || baseSize.includes('2.4rem')) {
          setFontSize('text-[1.5rem] sm:text-[1.8rem]');
        }
      }
    };

    // Use ResizeObserver and check on mount/resize
    const checkMobile = () => adjustFontSize(mobileNameRef, setMobileFontSize, 'text-3xl sm:text-4xl');
    const checkDesktop = () => adjustFontSize(desktopNameRef, setDesktopFontSize, 'text-4xl sm:text-5xl');

    // Check on mount
    setTimeout(() => {
      checkMobile();
      checkDesktop();
    }, 100);

    // Check on resize
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
      checkDesktop();
    });

    if (mobileNameRef.current) resizeObserver.observe(mobileNameRef.current);
    if (desktopNameRef.current) resizeObserver.observe(desktopNameRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'white' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        <div className="w-[95vw] max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-between px-5 sm:px-6 lg:px-8">
            <img
              src="/images/logos/NJT Logo Cruise Blue.webp"
              alt="Not Just Travel"
              className="h-12 sm:h-14 w-auto transition-all duration-300"
            />
            <div className="flex items-center gap-2">
              <p className="hidden md:block text-[1.24rem] font-medium transition-all duration-300" style={{ color: '#004F6E' }}>
                Contact Jane Smith on
              </p>
              <Button asChild size="lg" className="shadow-none group" style={{ backgroundColor: '#FF5353', color: 'white' }}>
                <a href="tel:07777000123" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  07777 000 123
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Wrapper for Hero and About sections to enable sticky card across both */}
      <div className="relative w-[95vw] mx-auto lg:grid lg:grid-cols-[1fr_400px] lg:gap-0 lg:items-start">
        {/* Left Column - Hero and About Sections */}
        <div className="lg:col-span-1">
          {/* Hero Section - Full Viewport Width */}
          <section 
            className="relative overflow-hidden flex items-center justify-center" 
            style={{ 
              width: '100vw', 
              height: 'min(90vh, 800px)', 
              marginLeft: 'calc((100vw - 95vw) / -2)',
              backgroundImage: 'url(/images/hero-video-2-poster.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#87CEEB'
            }}
          >
            {/* Background Image Fallback - Shows immediately while video loads */}
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/images/hero-video-2-poster.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Video Background - Optimized for fast loading */}
            <video
              ref={videoRef}
              autoPlay={shouldAutoplayVideo}
              loop
              muted
              playsInline
              preload={videoPreload}
              poster="/images/hero-video-2-poster.webp"
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
              // Optimize video loading - disable unnecessary features
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
            >
              {/* Prioritize WebM (better compression, smaller file ~2.7MB vs MP4) */}
              <source src="/Sequence%2002-converted.webm" type="video/webm" />
              {/* MP4 fallback for older browsers */}
              <source src="/Sequence%2002-converted.mp4" type="video/mp4" />
            </video>

            {/* Dreamy Fade Overlay at Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none" 
              style={{ 
                background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 0.95) 90%, white 100%)',
                zIndex: 5
              }} 
            />

            {/* Hero Content - Boxed */}
            <div className="relative z-20 w-[95vw] max-w-7xl h-full flex flex-col justify-between mx-auto px-5 sm:px-6 lg:px-12 py-8 lg:py-0">
              <div className="w-full flex-1 flex items-center">
                <div className="text-center lg:text-left space-y-6 sm:space-y-8 max-w-3xl w-full lg:-mt-4">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold uppercase mb-4 mt-4 sm:mt-8 lg:mt-4" style={{ backgroundColor: '#9FF0D4', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
                    <span>Your Personal Holiday Hero</span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.1] font-medium tracking-tight font-sans" style={{ color: '#004F6E' }}>
                    <span className="inline lg:block lg:whitespace-nowrap">Make planning a holiday,</span>
                    <span className="inline lg:block lg:whitespace-nowrap"> feel like a holiday</span>
                  </h1>
                  {/* Logo Container */}
                  <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 flex-wrap">
                    <img
                      src="/images/logos/Trustpilot.png"
                      alt="Trustpilot"
                      className="w-auto"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2 * 0.85)', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                    />
                    <span className="w-full sm:hidden"></span>
                    <img
                      src="/images/logos/abta_white.png"
                      alt="ABTA"
                      className="w-auto sm:h-[calc(2rem*0.85*1.2*1.2*1.2*0.85)]"
                      style={{ height: 'calc(1rem * 0.85 * 1.2 * 1.2)', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                    />
                    <img
                      src="/images/logos/EUROPE THE TRAVEL FRANCHISE.png"
                      alt="Europe The Travel Franchise"
                      className="w-auto sm:h-[calc(2rem*0.85*1.2*1.2*1.2)] lg:h-[calc(2.5rem*0.85*1.2*1.2*1.2)]"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2)', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                    />
                    <img
                      src="/images/logos/W Travel Franchise.png"
                      alt="W Travel Franchise"
                      className="w-auto sm:h-[calc(2rem*0.85*1.2*1.2*1.2)] lg:h-[calc(2.5rem*0.85*1.2*1.2*1.2)]"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2)', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                    />
                  </div>
                </div>
              </div>

              {/* Feature Elements at Bottom */}
              <div className="w-full pb-8 sm:pb-4 lg:pb-6" ref={carouselContainerRef}>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes sparkleMove {
                    0% {
                      left: -20px;
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      left: calc(100% + 20px);
                      opacity: 0;
                    }
                  }
                  .sparkle {
                    position: absolute;
                    top: 0;
                    width: 40px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(159, 240, 212, 0.6), transparent);
                    filter: blur(3px);
                    animation: sparkleMove 1.5s ease-in-out;
                    pointer-events: none;
                  }
                  .sparkle-delay-1 {
                    animation-delay: 0.3s;
                  }
                  .sparkle-delay-2 {
                    animation-delay: 1.1s;
                  }
                  .sparkle-delay-3 {
                    animation-delay: 1.9s;
                  }
                `}} />
                {/* Mobile: Horizontal scrollable carousel */}
                <div className="lg:hidden overflow-x-auto scrollbar-hide pl-12 sm:pl-16 pr-4" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                  <div className="flex gap-6 sm:gap-8" style={{ scrollSnapType: 'x mandatory' }}>
                    {/* Feature 1 */}
                    <div 
                      ref={cardRefs[0]}
                      className={`flex flex-col items-start text-white flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(100vw-7rem)] relative transition-all duration-700 ease-out ${
                        visibleCards[0] && carouselVisible
                          ? 'opacity-100 translate-x-0' 
                          : scrollDirection === 'down' 
                            ? 'opacity-0 -translate-x-8' 
                            : 'opacity-0 translate-x-8'
                      }`}
                      style={{ scrollSnapAlign: 'start', transitionDelay: visibleCards[0] && carouselVisible ? (scrollDirection === 'down' ? '100ms' : '300ms') : '0ms' }}
                    >
                      <div className="w-full border-t mb-4 sm:mb-4 relative" style={{ borderColor: 'white' }}>
                        {sparkleAnimated && <div className="sparkle sparkle-delay-1"></div>}
                      </div>
                      <ArrowRight className="absolute right-0 top-4 w-5 h-5" style={{ color: '#004F6E' }} />
                      <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mb-3" style={{ color: '#004F6E' }} />
                      <p className="text-lg sm:text-xl font-medium leading-tight" style={{ color: 'rgb(0, 79, 110)' }}>
                        Expert help to find the<br className="hidden lg:block" /> right holiday for you
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div 
                      ref={cardRefs[1]}
                      className={`flex flex-col items-start text-white flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(100vw-7rem)] relative transition-all duration-700 ease-out ${
                        visibleCards[1] && carouselVisible
                          ? 'opacity-100 translate-x-0' 
                          : scrollDirection === 'down' 
                            ? 'opacity-0 -translate-x-8' 
                            : 'opacity-0 translate-x-8'
                      }`}
                      style={{ scrollSnapAlign: 'start', transitionDelay: visibleCards[1] && carouselVisible ? (scrollDirection === 'down' ? '250ms' : '250ms') : '0ms' }}
                    >
                      <div className="w-full border-t mb-4 sm:mb-4 relative" style={{ borderColor: 'white' }}>
                        {sparkleAnimated && <div className="sparkle sparkle-delay-2"></div>}
                      </div>
                      <ArrowRight className="absolute right-0 top-4 w-5 h-5" style={{ color: '#004F6E' }} />
                      <Heart className="w-7 h-7 sm:w-8 sm:h-8 mb-3" style={{ color: '#004F6E' }} />
                      <p className="text-lg sm:text-xl font-medium leading-tight" style={{ color: 'rgb(0, 79, 110)' }}>
                        A completely personal<br className="hidden lg:block" /> travel experience
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div 
                      ref={cardRefs[2]}
                      className={`flex flex-col items-start text-white flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(100vw-7rem)] transition-all duration-700 ease-out ${
                        visibleCards[2] && carouselVisible
                          ? 'opacity-100 translate-x-0' 
                          : scrollDirection === 'down' 
                            ? 'opacity-0 -translate-x-8' 
                            : 'opacity-0 translate-x-8'
                      }`}
                      style={{ scrollSnapAlign: 'start', transitionDelay: visibleCards[2] && carouselVisible ? (scrollDirection === 'down' ? '400ms' : '100ms') : '0ms' }}
                    >
                      <div className="w-full border-t mb-4 sm:mb-4 relative" style={{ borderColor: 'white' }}>
                        {sparkleAnimated && <div className="sparkle sparkle-delay-3"></div>}
                      </div>
                      <Award className="w-7 h-7 sm:w-8 sm:h-8 mb-3" style={{ color: '#004F6E' }} />
                      <p className="text-lg sm:text-xl font-medium leading-tight" style={{ color: 'rgb(0, 79, 110)' }}>
                        Award-winning<br className="hidden lg:block" /> customer service
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop: Original layout */}
                <div className="hidden lg:flex flex-row gap-8 max-w-2xl lg:max-w-3xl">
                  {/* Feature 1 */}
                  <div className="flex flex-col items-start text-white flex-1">
                    <div className="w-full border-t mb-4 relative" style={{ borderColor: 'white' }}>
                      {sparkleAnimated && <div className="sparkle sparkle-delay-1"></div>}
                    </div>
                    <Sparkles className="w-6 h-6 mb-2" style={{ color: '#004F6E' }} />
                    <p className="text-lg font-medium leading-tight" style={{ color: 'rgb(0, 79, 110)' }}>
                      Expert help to find the<br className="hidden lg:block" /> right holiday for you
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-start text-white flex-1">
                    <div className="w-full border-t mb-4 relative" style={{ borderColor: 'white' }}>
                      {sparkleAnimated && <div className="sparkle sparkle-delay-2"></div>}
                    </div>
                    <Heart className="w-6 h-6 mb-2" style={{ color: '#004F6E' }} />
                    <p className="text-lg font-medium leading-tight" style={{ color: 'rgb(0, 79, 110)' }}>
                      A completely personal<br className="hidden lg:block" /> travel experience
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col items-start text-white flex-1">
                    <div className="w-full border-t mb-4 relative" style={{ borderColor: 'white' }}>
                      {sparkleAnimated && <div className="sparkle sparkle-delay-3"></div>}
                    </div>
                    <Award className="w-6 h-6 mb-2" style={{ color: '#004F6E' }} />
                    <p className="text-lg font-medium leading-tight" style={{ color: 'rgb(0, 79, 110)' }}>
                      Award-winning<br className="hidden lg:block" /> customer service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Portrait Card - Below Hero (Mobile Only) */}
          <div className="lg:hidden w-[90vw] mx-auto px-5 sm:px-6 -mt-8 sm:-mt-12 relative z-20">
            <Card
              glass
              className="border-0 overflow-hidden aspect-[3/4] w-full mx-auto relative"
            >
              {/* Background Image */}
              <img
                src="/images/logos/portraitjane.webp"
                alt="Jane Smith - Travel Expert"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Frosted Glass Overlay from Bottom */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[20%] bg-white/20 backdrop-blur-sm" 
                style={{ 
                  WebkitBackdropFilter: 'blur(8px)',
                  maskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)'
                }} 
              />

              {/* Content at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10 p-6 sm:p-8">
                <div className="space-y-1.5 sm:space-y-2 text-center">
                  <h3 ref={mobileNameRef} className={`${mobileFontSize} font-medium text-white drop-shadow-lg`}>Jane Smith</h3>
                  <Button asChild size="lg" className="shadow-none w-full sm:w-auto">
                    <a href="tel:07777000123" className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      07777 000 123
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* About Section */}
          <section id="about-section" className="py-12 sm:py-16 lg:py-24 pb-6 sm:pb-16 lg:pb-24 relative">
            <div className="w-[95vw] max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="w-full lg:max-w-2xl">
              <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
                    <Plane className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
                    <span>YOUR BEST EVER HOLIDAY</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2 sm:mb-3 lg:mb-4 leading-tight" style={{ color: '#004F6E' }}>I'm so excited to partner<br className="lg:hidden" /> with the<br className="hidden lg:block" /> award-winning<br className="lg:hidden" /> Not Just Travel</h2>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-3 sm:mb-4 lg:mb-6">
                    Bringing you amazing holidays, cruises, flights, hotels and more. Combining the best choice and value with outstanding personal service and the confidence of the world's best lifestyle franchise behind every booking.
                  </p>
                  {/* Logo Images */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                    <img
                      src="/images/logos/TTF website - KTP & Acc-(2).png.webp"
                      alt="TTF Logo"
                      className="h-auto max-w-[276px] sm:max-w-[345px]"
                    />
                    <img
                      src="/images/logos/TTF website - KTP & Acc-(3).png.webp"
                      alt="TTF Logo"
                      className="h-auto max-w-[276px] sm:max-w-[345px]"
                    />
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          </section>

        </div>


        {/* Right Column - Sticky Card that overlays hero */}
        <div 
          className="hidden lg:block lg:col-span-1 lg:z-40 sticky self-start" 
          style={{ 
            top: '120px'
          }}
        >
          <div className="lg:-ml-[calc(95vw/3-2rem+4rem)] relative" style={{ paddingTop: 'calc((min(90vh, 800px) - 320px * 4/3) / 2 - 100px)' }}>
            {/* Fan Cards - Behind main card, appear on scroll down */}
            {/* Card 1 - Fan left */}
            <Card
              className={`border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] shadow-lg transition-all duration-500 ease-out absolute top-0 left-0 ${
                showFanCards ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transform: showFanCards 
                  ? 'translateX(-80px) rotate(-12deg)' 
                  : 'translateX(0) rotate(0deg)',
                zIndex: 8
              }}
            >
              <img
                src="/images/29841.jpg"
                alt="Travel destination"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </Card>

            {/* Card 2 - Fan right */}
            <Card
              className={`border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] shadow-lg transition-all duration-500 ease-out absolute top-0 left-0 ${
                showFanCards ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transform: showFanCards 
                  ? 'translateX(80px) rotate(12deg)' 
                  : 'translateX(0) rotate(0deg)',
                zIndex: 9
              }}
            >
              <img
                src="/images/4292.jpg"
                alt="Travel destination"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </Card>

            {/* Main Photo Card */}
            <Card
              glass
              className="border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] relative z-10"
            >
              {/* Background Image */}
              <img
                src="/images/logos/portraitjane.webp"
                alt="Jane Smith - Travel Expert"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Frosted Glass Overlay from Bottom */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[20%] bg-white/20 backdrop-blur-sm" 
                style={{ 
                  WebkitBackdropFilter: 'blur(8px)',
                  maskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)'
                }} 
              />

              {/* Content at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10 p-8">
                <div className="space-y-2 text-center">
                  <h3 ref={desktopNameRef} className={`${desktopFontSize} font-medium text-white drop-shadow-lg`}>Jane Smith</h3>
                  <Button asChild size="lg" className="shadow-none">
                    <a href="tel:07777000123" className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      07777 000 123
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section - Feature Grid */}
      <section id="how-it-works" className="relative">
        <FeatureGrid />
      </section>

      {/* Holiday Types Gallery Section */}
      <section id="holiday-types" className="relative">
        <HolidayTypeGallery />
      </section>

      {/* Feature Accordion Section */}
      <section id="features" className="relative">
        <Feature197 />
      </section>

      {/* Footer */}
      <Footer13 />

      {/* Policy Modal */}
      <PolicyModal />

    </main>
  );
}

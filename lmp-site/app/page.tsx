"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { Sparkles, MapPin, Award, ArrowRight } from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFanCards, setShowFanCards] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset; // Safari fallback
      setIsScrolled(currentScrollY > 10);
      
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

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'white' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        <div className="w-[95vw] mx-auto py-4">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <img
              src="/images/logos/NJT Logo Cruise Blue.webp"
              alt="Not Just Travel"
              className={`h-12 sm:h-14 w-auto transition-all duration-300 ${!isScrolled ? 'brightness-0 invert' : ''}`}
            />
            <div className="flex items-center gap-4">
              <p className={`hidden md:block text-lg font-bold transition-all duration-300 ${!isScrolled ? 'text-white' : 'text-foreground'}`}>
                Contact Jane Smith on 07777 000 123
              </p>
              <Button size="sm" className="shadow-none">Contact Jane</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Wrapper for Hero and About sections to enable sticky card across both */}
      <div className="relative w-[95vw] mx-auto lg:grid lg:grid-cols-[1fr_400px] lg:gap-0 lg:items-start">
        {/* Left Column - Hero and About Sections */}
        <div className="lg:col-span-1">
          {/* Hero Section - Full Viewport Width */}
          <section className="relative overflow-hidden flex items-center justify-center" style={{ width: '100vw', height: 'min(90vh, 800px)', marginLeft: 'calc((100vw - 95vw) / -2)' }}>
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
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
              <source src="/hero-video-2.mp4" type="video/mp4" />
            </video>

            {/* Stylish Overlay with Noise */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/30" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay'
              }}
            />

            {/* Frosted Glass Overlay at Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[20%] bg-white/20 backdrop-blur-sm" 
              style={{ 
                WebkitBackdropFilter: 'blur(8px)',
                maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                zIndex: 5
              }} 
            />

            {/* Hero Content - Boxed */}
            <div className="relative z-10 w-[95vw] h-full flex flex-col justify-between mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-0">
              <div className="w-full flex-1 flex items-center">
                <div className="text-center lg:text-left space-y-4 sm:space-y-6 max-w-3xl w-full">
                  <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold mb-2 mt-4 sm:mt-8 lg:mt-12" style={{ backgroundColor: 'rgb(159, 240, 212)', color: 'rgb(0, 79, 110)' }}>
                    RISE TO THE TOP
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl text-white drop-shadow-xl leading-tight">
                    <span className="inline lg:block lg:whitespace-nowrap">Make planning a holiday,</span>
                    <span className="inline lg:block lg:whitespace-nowrap"> feel like a holiday</span>
                  </h1>
                  {/* Logo Container */}
                  <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 flex-wrap">
                    <img
                      src="/images/logos/Trustpilot.png"
                      alt="Trustpilot"
                      className="w-auto drop-shadow-lg"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2 * 0.85)' }}
                    />
                    <img
                      src="/images/logos/abta_white.png"
                      alt="ABTA"
                      className="w-auto drop-shadow-lg sm:h-[calc(2rem*0.85*1.2*1.2*1.2*0.85)]"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2 * 0.85)' }}
                    />
                    <img
                      src="/images/logos/EUROPE THE TRAVEL FRANCHISE.png"
                      alt="Europe The Travel Franchise"
                      className="w-auto drop-shadow-lg sm:h-[calc(2rem*0.85*1.2*1.2*1.2)] lg:h-[calc(2.5rem*0.85*1.2*1.2*1.2)]"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2)' }}
                    />
                    <img
                      src="/images/logos/W Travel Franchise.png"
                      alt="W Travel Franchise"
                      className="w-auto drop-shadow-lg sm:h-[calc(2rem*0.85*1.2*1.2*1.2)] lg:h-[calc(2.5rem*0.85*1.2*1.2*1.2)]"
                      style={{ height: 'calc(1.5rem * 0.85 * 1.2 * 1.2 * 1.2)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Feature Elements at Bottom */}
              <div className="w-full pb-20 sm:pb-6 lg:pb-12">
                {/* Mobile: Horizontal scrollable carousel */}
                <div className="lg:hidden overflow-x-auto scrollbar-hide pl-12 sm:pl-16 pr-4" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                  <div className="flex gap-6 sm:gap-8" style={{ scrollSnapType: 'x mandatory' }}>
                    {/* Feature 1 */}
                    <div className="flex flex-col items-start text-white flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(100vw-7rem)] relative" style={{ scrollSnapAlign: 'start' }}>
                      <div className="w-full border-t mb-4 sm:mb-4" style={{ borderColor: 'rgb(159, 240, 212)' }}></div>
                      <ArrowRight className="absolute right-0 top-4 w-5 h-5" style={{ color: 'rgb(159, 240, 212)' }} />
                      <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mb-3 drop-shadow-lg" style={{ color: 'rgb(159, 240, 212)' }} />
                      <p className="text-lg sm:text-xl font-medium drop-shadow-lg leading-relaxed">
                        Expert knowledge for<br />unforgettable travel experiences
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-start text-white flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(100vw-7rem)] relative" style={{ scrollSnapAlign: 'start' }}>
                      <div className="w-full border-t mb-4 sm:mb-4" style={{ borderColor: 'rgb(159, 240, 212)' }}></div>
                      <ArrowRight className="absolute right-0 top-4 w-5 h-5" style={{ color: 'rgb(159, 240, 212)' }} />
                      <MapPin className="w-7 h-7 sm:w-8 sm:h-8 mb-3 drop-shadow-lg" style={{ color: 'rgb(159, 240, 212)' }} />
                      <p className="text-lg sm:text-xl font-medium drop-shadow-lg leading-relaxed">
                        Personalized service<br />tailored to your preferences
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-start text-white flex-shrink-0 w-[calc(100vw-6rem)] sm:w-[calc(100vw-7rem)]" style={{ scrollSnapAlign: 'start' }}>
                      <div className="w-full border-t mb-4 sm:mb-4" style={{ borderColor: 'rgb(159, 240, 212)' }}></div>
                      <Award className="w-7 h-7 sm:w-8 sm:h-8 mb-3 drop-shadow-lg" style={{ color: 'rgb(159, 240, 212)' }} />
                      <p className="text-lg sm:text-xl font-medium drop-shadow-lg leading-relaxed">
                        Trusted by travelers<br />worldwide
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop: Original layout */}
                <div className="hidden lg:flex flex-row gap-8 max-w-2xl lg:max-w-3xl">
                  {/* Feature 1 */}
                  <div className="flex flex-col items-start text-white flex-1">
                    <div className="w-full border-t mb-4" style={{ borderColor: 'rgb(159, 240, 212)' }}></div>
                    <Sparkles className="w-6 h-6 mb-2 drop-shadow-lg" style={{ color: 'rgb(159, 240, 212)' }} />
                    <p className="text-base font-medium drop-shadow-lg leading-relaxed">
                      Expert knowledge for<br className="hidden lg:block" /> unforgettable travel experiences
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-start text-white flex-1">
                    <div className="w-full border-t mb-4" style={{ borderColor: 'rgb(159, 240, 212)' }}></div>
                    <MapPin className="w-6 h-6 mb-2 drop-shadow-lg" style={{ color: 'rgb(159, 240, 212)' }} />
                    <p className="text-base font-medium drop-shadow-lg leading-relaxed">
                      Personalized service<br className="hidden lg:block" /> tailored to your preferences
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col items-start text-white flex-1">
                    <div className="w-full border-t mb-4" style={{ borderColor: 'rgb(159, 240, 212)' }}></div>
                    <Award className="w-6 h-6 mb-2 drop-shadow-lg" style={{ color: 'rgb(159, 240, 212)' }} />
                    <p className="text-base font-medium drop-shadow-lg leading-relaxed">
                      Trusted by travelers<br className="hidden lg:block" /> worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Portrait Card - Below Hero (Mobile Only) */}
          <div className="lg:hidden w-[90vw] mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-20">
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
                  maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
                }} 
              />

              {/* Content at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">Jane Smith</h3>
                  <Button size="lg" className="shadow-none w-full sm:w-auto">Contact Jane</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* About Section */}
          <section id="about-section" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 pb-[300px] sm:pb-[400px] lg:pb-[500px] relative">
            <div className="w-full">
              <div className="max-w-4xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">About Our Service</h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  We're dedicated to making your holiday planning as enjoyable as the holiday itself.
                  With expert knowledge and personalized service, we create unforgettable travel experiences.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  Our team of travel experts works tirelessly to understand your preferences and craft
                  the perfect getaway tailored just for you.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  From exotic destinations to relaxing retreats, we handle every detail so you can
                  focus on making memories.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Sticky Card that overlays hero */}
        <div className="hidden lg:block lg:col-span-1 lg:sticky lg:self-start lg:z-40" style={{ top: '120px' }}>
          <div className="lg:-ml-[calc(95vw/3-2rem+4rem)] relative" style={{ paddingTop: 'calc((min(90vh, 800px) - 320px * 4/3) / 2 - 100px)' }}>
            {/* Fan Cards - Behind main card, appear on scroll down */}
            {/* Card 1 - Fan left */}
            <Card
              className={`border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] shadow-lg transition-all duration-500 ease-out absolute top-0 left-0 ${
                showFanCards ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transform: showFanCards 
                  ? 'translateX(-40px) rotate(-8deg)' 
                  : 'translateX(0) rotate(0deg)',
                zIndex: 8,
                backgroundColor: 'rgb(159, 213, 209)'
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className="text-foreground text-lg font-semibold text-center">Card 1</p>
              </div>
            </Card>

            {/* Card 2 - Fan right */}
            <Card
              className={`border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] shadow-lg transition-all duration-500 ease-out absolute top-0 left-0 ${
                showFanCards ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transform: showFanCards 
                  ? 'translateX(40px) rotate(8deg)' 
                  : 'translateX(0) rotate(0deg)',
                zIndex: 9,
                backgroundColor: 'rgb(159, 240, 212)'
              }}
            >
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className="text-foreground text-lg font-semibold text-center">Card 2</p>
              </div>
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
                  maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
                }} 
              />

              {/* Content at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
                <div className="space-y-4">
                  <h3 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">Jane Smith</h3>
                  <Button size="lg" className="shadow-none">Contact Jane</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

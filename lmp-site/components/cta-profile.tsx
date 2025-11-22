"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Phone, Sparkles } from "lucide-react";

const CtaProfile = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[rgb(245,240,236)] to-[rgb(240,235,231)]" />
      
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left space-y-3 sm:space-y-4">
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
                <span>START YOUR JOURNEY</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.1] tracking-tight" style={{ color: '#004F6E' }}>
              Magical memories start<br className="hidden lg:block" /> with a simple message
            </h2>
            
            <p className="text-xl sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Ready to start planning your dream getaway?<br className="hidden lg:block" /> Drop me a message or give me a call.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="shadow-xl w-full sm:w-auto text-lg px-8 h-14 rounded-full">
                <Phone className="w-5 h-5 mr-2" />
                Call me now
              </Button>
            </div>
          </div>

          {/* Right Column: Profile Card */}
          <div className="flex justify-center lg:justify-end lg:mr-8 lg:translate-x-[-15%]">
            <div className="relative aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] lg:w-[calc(95vw/3-2rem)] lg:max-w-[320px]">
              {/* Decorative blob behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[rgb(159,240,212)]/20 rounded-full blur-3xl -z-10" />
              
              {/* Fan Card 1 - Furthest Left */}
              <Card
                className="border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] absolute top-0 left-0 shadow-lg transform -translate-x-12 -rotate-12 scale-95 origin-bottom-right opacity-80"
                style={{ zIndex: 1 }}
              >
                <img
                  src="/images/29841.jpg"
                  alt="Travel destination"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Card>

              {/* Fan Card 2 - Middle Left */}
              <Card
                className="border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] absolute top-0 left-0 shadow-lg transform -translate-x-6 -rotate-6 scale-[0.98] origin-bottom-right opacity-90"
                style={{ zIndex: 2 }}
              >
                <img
                  src="/images/4292.jpg"
                  alt="Travel destination"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Card>

              {/* Main Profile Card */}
              <Card
                glass
                className="group border-0 overflow-hidden aspect-[3/4] w-[calc(95vw/3-2rem)] max-w-[320px] shadow-lg relative"
                style={{ zIndex: 10 }}
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
                  <div className="space-y-4 text-center flex flex-col items-center">
                    <h3 className="text-3xl font-medium text-white drop-shadow-lg">Jane Smith</h3>
                    <Button size="lg" className="shadow-none w-full sm:w-auto">07777 000 123</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export { CtaProfile };


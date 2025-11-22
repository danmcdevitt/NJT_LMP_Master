"use client";

import { useState, useEffect } from "react";
import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OfferCard } from "@/components/ui/OfferCard";
import { Logos13 } from "@/components/logos13";

interface FeatureItem {
  id: number;
  title: string;
  image?: string;
  backgroundImage?: string;
  component?: ReactNode;
  description: string;
}

interface Feature197Props {
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "All the best brands",
    backgroundImage: "/images/family2.webp",
    component: <Logos13 />,
    description:
      "We work with the world's leading travel brands, from luxury cruise lines to trusted tour operators. Access exclusive deals and packages from Jet2Holidays, TUI, P&O Cruises, Virgin Voyages, and many more, all in one place.",
  },
  {
    id: 2,
    title: "5-star rated",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    backgroundImage: "/images/4292.jpg",
    description:
      "Our exceptional service has earned us outstanding reviews from satisfied travellers. With top ratings on Trustpilot and countless happy customers, you can book with confidence knowing you're in expert hands.",
  },
  {
    id: 3,
    title: "Every detail handled",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    backgroundImage: "/images/29841.jpg",
    description:
      "From flights and hotels to transfers and excursions, we take care of every aspect of your holiday planning. No stress, no hassle—just relax and look forward to your perfect getaway while we handle all the arrangements.",
  },
  {
    id: 4,
    title: "Exclusive travel offers",
    backgroundImage: "/images/amalfi.webp",
    component: <OfferCard image="/images/amalfi.webp" destination="Amalfi Coast" description="Discover the breathtaking beauty of Italy's most stunning coastline. Enjoy luxury accommodations, world-class cuisine, and unforgettable views of the Mediterranean." />,
    description:
      "Get access to special deals and exclusive offers that aren't available to the general public. As a Not Just Travel agent, we can secure you better prices, added extras, and unique packages that make your holiday even more special.",
  },
  {
    id: 5,
    title: "Stress free support",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
    backgroundImage: "/images/home-snow-mountain.webp",
    description:
      "We're here for you every step of the way, from initial planning to your return home. If anything changes or you need assistance, just give us a call. Our personal service means you always have someone to turn to, making your holiday truly worry-free.",
  },
];

const Feature197 = ({
  features = defaultFeatures,
}: Feature197Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeContent, setActiveContent] = useState<ReactNode | string | undefined>(
    features[0].component || features[0].image
  );
  const [showFanCards, setShowFanCards] = useState(false);

  const activeFeature = features.find(f => f.id === activeTabId) || features[0];
  const backgroundImage = activeFeature?.backgroundImage;

  // All accordion items use Holiday Linen
  const activeColor = '#F5F0EC';

  // Check if activeContent is an OfferCard and trigger fan cards animation
  useEffect(() => {
    const isOfferCard = activeTabId === 4; // Feature id 4 is "Exclusive travel offers" with OfferCard
    
    if (isOfferCard) {
      // Main card animation completes around 3.5s (1.5s initial delay + 1s overlay + 0.5s text move + 0.5s buffer)
      const timer = setTimeout(() => {
        setShowFanCards(true);
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      setShowFanCards(false);
    }
  }, [activeTabId]);

  return (
    <section className="pt-3 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-24 px-5 sm:px-6 lg:px-8 relative w-[95vw] mx-auto">
      <style dangerouslySetInnerHTML={{__html: `
        button svg {
          color: #004F6E;
        }
      `}} />
      <div className="w-full">
        {/* Section Header */}
        <div className="flex justify-start lg:justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
            <span>WHY CHOOSE US</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-left lg:text-center mb-2 sm:mb-2 lg:mb-3 leading-tight" style={{ color: '#004F6E' }}>
          Everything you need for<br className="lg:hidden" /><br className="hidden lg:block" /> the perfect holiday
        </h2>
        <p className="text-lg sm:text-lg md:text-xl text-left lg:text-center mb-8 sm:mb-12 lg:mb-16 max-w-3xl lg:mx-auto leading-relaxed text-muted-foreground">
          From trusted brands to complete protection,<br className="lg:hidden" /><br className="hidden lg:block" /> we handle every detail so you can relax and enjoy.
        </p>
        
        <div className="overflow-hidden rounded-none md:rounded-lg border-0 md:border-2 -mx-5 sm:mx-0" style={{ 
          borderColor: 'rgba(220, 215, 211, 0.6)'
        }}>
          {/* Split Layout: Left (Color) + Right (Image) */}
          <div className="flex flex-col md:flex-row" style={{ minHeight: '500px' }}>
            {/* Left Half - Color Background */}
            <div 
              className="w-full md:w-1/2 relative p-6 md:p-6 lg:p-8 transition-colors duration-700 ease-in-out"
              style={{ backgroundColor: activeColor }}
            >
              {/* Noise Texture */}
              <div 
                className="absolute inset-0 z-[1] noise-texture opacity-30" 
              />
              {/* Content */}
              <div className="relative z-10">
                <Accordion type="single" className="w-full" defaultValue="item-1">
                  {features.map((tab, index) => (
                    <AccordionItem
                      key={tab.id}
                      value={`item-${tab.id}`}
                      className={`transition-opacity hover:opacity-80 ${index === features.length - 1 ? '!border-b-0' : ''}`}
                      style={index === features.length - 1 ? { borderBottom: 'none' } : { borderColor: 'rgba(0, 79, 110, 0.2)' }}
                    >
                      <AccordionTrigger
                        onClick={() => {
                          setActiveContent(tab.component || tab.image);
                          setActiveTabId(tab.id);
                        }}
                        className="!no-underline cursor-pointer py-4 sm:py-5 transition [&_svg]:text-[#004F6E]"
                      >
                        <h4
                          className={`text-lg sm:text-xl lg:text-2xl font-medium text-left ${tab.id === activeTabId ? "" : ""}`}
                          style={{ color: '#004F6E' }}
                        >
                          {tab.title}
                        </h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-lg sm:text-xl leading-relaxed" style={{ color: '#004F6E' }}>
                          {tab.description}
                        </p>
                        <div className={`mt-4 md:hidden ${tab.id === 1 ? 'min-h-[500px]' : ''}`}>
                          {tab.component ? (
                            <div className="w-full flex justify-center">
                              {tab.component}
                            </div>
                          ) : tab.image ? (
                            <img
                              src={tab.image}
                              alt={tab.title}
                              className="h-full max-h-80 w-full object-cover"
                            />
                          ) : null}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right Half - Content Only */}
            <div 
              className="hidden md:block w-full md:w-1/2 relative overflow-visible transition-colors duration-700 ease-in-out"
              style={{ backgroundColor: activeColor }}
            >
              {/* Noise Texture */}
              <div 
                className="absolute inset-0 z-[1] noise-texture opacity-30" 
              />
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-visible" style={{ minHeight: '500px', paddingBottom: '100px' }}>
                {typeof activeContent === 'string' ? (
                  <img
                    src={activeContent}
                    alt="Feature preview"
                    className="aspect-4/3 rounded-lg object-cover w-full max-w-md"
                  />
                ) : activeTabId === 4 ? (
                  // OfferCard with fan cards wrapper (desktop only)
                  <div className="relative w-full max-w-md flex items-center justify-center overflow-visible" style={{ minHeight: '300px', paddingBottom: '150px', paddingTop: '20px' }}>
                    {/* Left Fan Card - Desktop Only */}
                    <div
                      className="hidden md:block absolute transition-all duration-700 ease-out"
                      style={{
                        top: '0',
                        left: '0',
                        opacity: showFanCards ? 1 : 0,
                        transform: showFanCards 
                          ? 'translateX(-55px) rotate(-14deg) scale(0.75)' 
                          : 'translateX(0) rotate(0deg) scale(0.75)',
                        transformOrigin: 'center center',
                        zIndex: showFanCards ? 10 : 15,
                      }}
                    >
                      <div className="relative">
                        <OfferCard
                          image="/images/moon-rise-midtown-manhattan-with-city-skyline-night.webp"
                          destination="New York"
                          description="Experience the stunning beauty of this breathtaking destination with luxury accommodations and unforgettable moments."
                          disableAnimation={true}
                          className="w-[280px]"
                        />
                      </div>
                    </div>

                    {/* Main Card */}
                    <div className="relative z-20">
                      {activeContent}
                    </div>

                    {/* Right Fan Card - Desktop Only */}
                    <div
                      className="hidden md:block absolute transition-all duration-700 ease-out"
                      style={{
                        top: '0',
                        left: '0',
                        opacity: showFanCards ? 1 : 0,
                        transform: showFanCards 
                          ? 'translateX(166px) rotate(14deg) scale(0.75)' 
                          : 'translateX(0) rotate(0deg) scale(0.75)',
                        transformOrigin: 'center center',
                        zIndex: showFanCards ? 10 : 15,
                      }}
                    >
                      <div className="relative">
                        <OfferCard
                          image="/images/4292.jpg"
                          destination="Destination"
                          description="Experience the stunning beauty of this breathtaking destination with luxury accommodations and unforgettable moments."
                          disableAnimation={true}
                          className="w-[280px]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-md flex items-center justify-center overflow-visible" style={{ minHeight: '450px' }}>
                    {activeContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature197 };

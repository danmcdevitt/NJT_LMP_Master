"use client";

import { useState } from "react";
import { ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProfileCard } from "@/components/ui/ProfileCard";

interface FeatureItem {
  id: number;
  title: string;
  image?: string;
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
    component: <ProfileCard className="max-w-[320px] mx-auto" />,
    description:
      "We work with the world's leading travel brands, from luxury cruise lines to trusted tour operators. Access exclusive deals and packages from Jet2Holidays, TUI, P&O Cruises, Virgin Voyages, and many more, all in one place.",
  },
  {
    id: 2,
    title: "5-star rated",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    description:
      "Our exceptional service has earned us outstanding reviews from satisfied travellers. With top ratings on Trustpilot and countless happy customers, you can book with confidence knowing you're in expert hands.",
  },
  {
    id: 3,
    title: "Every detail handled",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    description:
      "From flights and hotels to transfers and excursions, we take care of every aspect of your holiday planning. No stress, no hassle—just relax and look forward to your perfect getaway while we handle all the arrangements.",
  },
  {
    id: 4,
    title: "Exclusive travel offers",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    description:
      "Get access to special deals and exclusive offers that aren't available to the general public. As a Not Just Travel agent, we can secure you better prices, added extras, and unique packages that make your holiday even more special.",
  },
  {
    id: 5,
    title: "Stress free support",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
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

  return (
    <section className="pt-0 sm:pt-1 lg:pt-2 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative w-[95vw] mx-auto">
      <div className="w-full">
        <div className="flex w-full items-start justify-between gap-8 lg:gap-12">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className="transition-opacity hover:opacity-80 border-b"
                  style={{ borderColor: 'rgba(220, 215, 211, 0.5)' }}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveContent(tab.component || tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="!no-underline cursor-pointer py-4 sm:py-5 transition"
                  >
                    <h4
                      className={`text-lg sm:text-xl lg:text-2xl font-medium text-left ${tab.id === activeTabId ? "" : ""}`}
                      style={{ color: tab.id === activeTabId ? '#004F6E' : '#004F6E' }}
                    >
                      {tab.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      {tab.component ? (
                        <div className="w-full max-w-[320px] mx-auto">
                          {tab.component}
                        </div>
                      ) : tab.image ? (
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="h-full max-h-80 w-full rounded-lg object-cover"
                        />
                      ) : null}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="bg-muted relative m-auto hidden w-1/2 overflow-hidden rounded-xl md:block flex items-center justify-center pl-4">
            {typeof activeContent === 'string' ? (
              <img
                src={activeContent}
                alt="Feature preview"
                className="aspect-4/3 rounded-lg object-cover w-full"
              />
            ) : (
              <div className="w-full flex items-center justify-center">
                {activeContent}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature197 };

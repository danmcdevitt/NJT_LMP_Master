"use client";

const travelLogos = [
  { name: "TUI", src: "/images/logos/TUI_Logo_2016.svg.png" },
  { name: "Jet2Holidays", src: "/images/logos/Jet2Holidays Logo.png" },
  { name: "P&O Cruises", src: "/images/logos/P&O Cruises Logo 2.png" },
  { name: "Virgin Voyages", src: "/images/logos/Virgin Voyages Logo.png" },
  { name: "Audley Travel", src: "/images/logos/audley-logo-green.png" },
  { name: "Saga", src: "/images/logos/Saga-Logo-min.png" },
  { name: "NCLH", src: "/images/logos/NCLH_BIG-28a413a2.png" },
  { name: "NJT", src: "/images/logos/NJT Logo Cruise Blue.webp" },
  { name: "TTF", src: "/images/logos/TTF website - KTP & Acc-(2).png.webp" },
  { name: "TTF 2", src: "/images/logos/TTF website - KTP & Acc-(3).png.webp" },
  { name: "Europe Travel", src: "/images/logos/EUROPE THE TRAVEL FRANCHISE.png" },
  { name: "W Travel", src: "/images/logos/W Travel Franchise.png" },
  { name: "Trustpilot", src: "/images/logos/Trustpilot.png" },
  { name: "ABTA", src: "/images/logos/abta_white.png" },
  { name: "Logo", src: "/images/logos/logo.fa71aa996cd64c0e4df7.webp" },
  // Adding some popular brands again to reach 20 items
  { name: "TUI", src: "/images/logos/TUI_Logo_2016.svg.png" },
  { name: "Jet2Holidays", src: "/images/logos/Jet2Holidays Logo.png" },
  { name: "P&O Cruises", src: "/images/logos/P&O Cruises Logo 2.png" },
  { name: "Virgin Voyages", src: "/images/logos/Virgin Voyages Logo.png" },
  { name: "Audley Travel", src: "/images/logos/audley-logo-green.png" },
];

const TravelLogoGrid = () => {
  const getRowIndex = (index: number, columns: number) => {
    return Math.floor(index / columns);
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-x-3 md:gap-x-4 gap-y-0.5 md:gap-y-1 w-full max-w-full">
      {travelLogos.map((logo, index) => {
        const mobileRow = getRowIndex(index, 4);
        const desktopRow = getRowIndex(index, 5);
        
        return (
          <div
            key={`${logo.name}-${index}`}
            className="relative aspect-square flex items-center justify-center p-3 md:p-4 transition-all duration-300 hover:scale-105 logo-row-fade-in"
            style={{
              animationDelay: `${mobileRow * 0.2}s`,
              '--desktop-delay': `${desktopRow * 0.2}s`,
            } as React.CSSProperties & { '--desktop-delay'?: string }}
          >
            {/* Logo */}
            <img
              src={logo.src}
              alt={logo.name}
              className="relative z-10 w-full h-full object-contain"
              style={{ 
                maxWidth: '120%',
                maxHeight: '120%',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export { TravelLogoGrid };


"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const Logos13 = () => {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [currentSet, setCurrentSet] = useState<1 | 2 | 3 | 4 | 5>(1);
  const gridRef = useRef<HTMLUListElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // All logos from KTP_Travel_Logos_Final directory
  const allLogos = [
    { id: "logo-1", name: "AMA Waterways", image: "/images/logos/KTP_Travel_Logos_Final/AMA-Waterways.webp" },
    { id: "logo-2", name: "Ambassador", image: "/images/logos/KTP_Travel_Logos_Final/Ambassador-webinar.webp" },
    { id: "logo-3", name: "American Canadian Affair", image: "/images/logos/KTP_Travel_Logos_Final/American-Canadian-Affair.webp" },
    { id: "logo-4", name: "APT", image: "/images/logos/KTP_Travel_Logos_Final/APT-1.webp" },
    { id: "logo-5", name: "Audley", image: "/images/logos/KTP_Travel_Logos_Final/Audley-1.webp" },
    { id: "logo-5a", name: "Azamara", image: "/images/logos/KTP_Travel_Logos_Final/azamara.webp" },
    { id: "logo-6", name: "Beachcomber", image: "/images/logos/KTP_Travel_Logos_Final/Beachcomber-2.webp" },
    { id: "logo-7", name: "Carnival", image: "/images/logos/KTP_Travel_Logos_Final/Carnival.webp" },
    { id: "logo-8", name: "Celebrity", image: "/images/logos/KTP_Travel_Logos_Final/Celebrity.webp" },
    { id: "logo-8a", name: "Constantinou", image: "/images/logos/KTP_Travel_Logos_Final/constantinou.webp" },
    { id: "logo-9", name: "easyJet", image: "/images/logos/KTP_Travel_Logos_Final/Easyjet.webp" },
    { id: "logo-10", name: "Emerald", image: "/images/logos/KTP_Travel_Logos_Final/Emerald.webp" },
    { id: "logo-11", name: "Etihad", image: "/images/logos/KTP_Travel_Logos_Final/Etihad.webp" },
    { id: "logo-12", name: "Exoticca", image: "/images/logos/KTP_Travel_Logos_Final/Exoticca.webp" },
    { id: "logo-13", name: "Fred Olsen", image: "/images/logos/KTP_Travel_Logos_Final/Fred-Olsen-Logo.webp" },
    { id: "logo-13a", name: "Do Something Different", image: "/images/logos/KTP_Travel_Logos_Final/Do Something Different.webp" },
    { id: "logo-14", name: "G Adventures", image: "/images/logos/KTP_Travel_Logos_Final/G-Adventures.webp" },
    { id: "logo-14a", name: "Gold Medal", image: "/images/logos/KTP_Travel_Logos_Final/Gold-Medal.webp" },
    { id: "logo-15", name: "Grecotel", image: "/images/logos/KTP_Travel_Logos_Final/Grecotel-KTP-Logo.webp" },
    { id: "logo-16", name: "Holland America", image: "/images/logos/KTP_Travel_Logos_Final/Holland-America.webp" },
    { id: "logo-18", name: "Inghams", image: "/images/logos/KTP_Travel_Logos_Final/Inghams-Logo.webp" },
    { id: "logo-19", name: "Inside Travel", image: "/images/logos/KTP_Travel_Logos_Final/Inside-Travel.webp" },
    { id: "logo-20", name: "ITC Travel", image: "/images/logos/KTP_Travel_Logos_Final/ITC-Logo.webp" },
    { id: "logo-21", name: "Domes Resorts", image: "/images/logos/KTP_Travel_Logos_Final/KTP-Page-Logo-Domes.webp" },
    { id: "logo-22", name: "Sani & Ikos Resorts", image: "/images/logos/KTP_Travel_Logos_Final/KTP-Page-Logo-Featured-Image-Sani-and-Ikos.webp" },
    { id: "logo-23", name: "Kuoni", image: "/images/logos/KTP_Travel_Logos_Final/Kuoni.webp" },
    { id: "logo-23a", name: "Latin Routes", image: "/images/logos/KTP_Travel_Logos_Final/latin-routes.webp" },
    { id: "logo-24", name: "Explora Journeys", image: "/images/logos/KTP_Travel_Logos_Final/logo_explora_journeys-removebg-preview.webp" },
    { id: "logo-26", name: "Norwegian Cruise Line", image: "/images/logos/KTP_Travel_Logos_Final/NCL.webp" },
    { id: "logo-27", name: "Not In The Guidebooks", image: "/images/logos/KTP_Travel_Logos_Final/Not-In-The-Guidebooks.webp" },
    { id: "logo-28", name: "Oceania", image: "/images/logos/KTP_Travel_Logos_Final/Oceania-8.webp" },
    { id: "logo-29", name: "P&O Cruises", image: "/images/logos/KTP_Travel_Logos_Final/PO-Cruises.webp" },
    { id: "logo-30", name: "Princess Cruises", image: "/images/logos/KTP_Travel_Logos_Final/Princess-2.webp" },
    { id: "logo-32", name: "Regent Seven Seas", image: "/images/logos/KTP_Travel_Logos_Final/Regent-Seven-Seas.webp" },
    { id: "logo-33", name: "Riviera Travel", image: "/images/logos/KTP_Travel_Logos_Final/Riviera.webp" },
    { id: "logo-34", name: "Royal Caribbean", image: "/images/logos/KTP_Travel_Logos_Final/Royal-Caribbean.webp" },
    { id: "logo-35", name: "Rush Insurance", image: "/images/logos/KTP_Travel_Logos_Final/Rush-Insurance-Thumbnail.webp" },
    { id: "logo-36", name: "Sandals & Beaches Resorts", image: "/images/logos/KTP_Travel_Logos_Final/Sandals-Beaches-KTP-Logo.webp" },
    { id: "logo-38", name: "Scenic Luxury Cruises & Tours", image: "/images/logos/KTP_Travel_Logos_Final/Scenic.webp" },
    { id: "logo-39", name: "Silversea", image: "/images/logos/KTP_Travel_Logos_Final/Silversea.webp" },
    { id: "logo-40", name: "Stuba Holidays", image: "/images/logos/KTP_Travel_Logos_Final/Stuba.webp" },
    { id: "logo-41", name: "Sunvil", image: "/images/logos/KTP_Travel_Logos_Final/Sunvil.webp" },
    { id: "logo-42", name: "Travelpack", image: "/images/logos/KTP_Travel_Logos_Final/Travelpack.webp" },
    { id: "logo-43", name: "TUI", image: "/images/logos/KTP_Travel_Logos_Final/Tui.webp" },
    { id: "logo-44", name: "Typically Holidays", image: "/images/logos/KTP_Travel_Logos_Final/Typically-Holidays-KTP-Logo.webp" },
    { id: "logo-45", name: "Uniworld", image: "/images/logos/KTP_Travel_Logos_Final/uniworld-webinar.webp" },
    { id: "logo-45a", name: "Seabourn", image: "/images/logos/KTP_Travel_Logos_Final/seabourn.webp" },
    { id: "logo-46", name: "US Airtours", image: "/images/logos/KTP_Travel_Logos_Final/USAirtours-Logo.webp" },
    { id: "logo-47", name: "Virgin Voyages", image: "/images/logos/KTP_Travel_Logos_Final/Virgin-Voyages.webp" },
    { id: "logo-48", name: "Jamaica Tourist Board", image: "/images/logos/KTP_Travel_Logos_Final/Jamaica-Tourist-Board-KTP-Logo.webp" },
  ];

  // Split logos into 5 sets of 10 (3 columns, ~4 rows each)
  const logosPerSet = 10;
  const logos1 = allLogos.slice(0, logosPerSet);
  const logos2 = allLogos.slice(logosPerSet, logosPerSet * 2);
  const logos3 = allLogos.slice(logosPerSet * 2, logosPerSet * 3);
  const logos4 = allLogos.slice(logosPerSet * 3, logosPerSet * 4);
  const logos5 = allLogos.slice(logosPerSet * 4, logosPerSet * 5);

  const getLogosForSet = (set: 1 | 2 | 3 | 4 | 5) => {
    switch (set) {
      case 1: return logos1;
      case 2: return logos2;
      case 3: return logos3;
      case 4: return logos4;
      case 5: return logos5;
    }
  };

  const logos = getLogosForSet(currentSet);

  const animateSet = useCallback((setNumber: 1 | 2 | 3 | 4 | 5, onComplete: () => void) => {
    // For 10 logos in 2 columns: 5 rows (2+2+2+2+2)
    const totalRows = 5;
    const fadeInDelay = 200; // 200ms delay between each row
    const displayDuration = 3000; // 3 seconds to display
    const fadeOutDelay = 200; // 200ms delay between each row fading out
    
    // Set the current set
    setCurrentSet(setNumber);
    setVisibleRows([]);
    
    // Fade in rows one at a time
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const timeout = setTimeout(() => {
        setVisibleRows((prev) => [...prev, rowIndex]);
        
        // After the last row fades in, wait then fade out
        if (rowIndex === totalRows - 1) {
          const fadeOutTimeout = setTimeout(() => {
            // Fade out rows one by one
            for (let fadeOutRowIndex = 0; fadeOutRowIndex < totalRows; fadeOutRowIndex++) {
              const fadeOutTimeout = setTimeout(() => {
                setVisibleRows((prev) => prev.filter((row) => row !== fadeOutRowIndex));
                
                // After all rows fade out, call onComplete
                if (fadeOutRowIndex === totalRows - 1) {
                  const completeTimeout = setTimeout(() => {
                    onComplete();
                  }, fadeOutDelay + 100); // Small delay after last row fades out
                  timeoutRefs.current.push(completeTimeout);
                }
              }, fadeOutRowIndex * fadeOutDelay);
              timeoutRefs.current.push(fadeOutTimeout);
            }
          }, displayDuration); // Wait 3 seconds after all rows are visible
          timeoutRefs.current.push(fadeOutTimeout);
        }
      }, rowIndex * fadeInDelay);
      timeoutRefs.current.push(timeout);
    }
  }, []);

  const startAnimation = useCallback(() => {
    // Clear any existing timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    // Cycle through all 5 sets
    const cycleSets = () => {
      animateSet(1, () => {
        animateSet(2, () => {
          animateSet(3, () => {
            animateSet(4, () => {
              animateSet(5, () => {
                // After set 5 completes, loop back to set 1
                cycleSets();
              });
            });
          });
        });
      });
    };
    
    cycleSets();
  }, [animateSet]);

  const resetAnimation = useCallback(() => {
    // Clear all timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
    setCurrentSet(1);
    setVisibleRows([]);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible, start animation after a short delay
            setTimeout(() => {
              startAnimation();
            }, 100);
          } else {
            // Element is not visible, reset animation
            resetAnimation();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(gridRef.current);

    return () => {
      observer.disconnect();
    };
  }, [startAnimation, resetAnimation]);

  return (
    <ul 
      ref={gridRef}
      className="grid w-full grid-cols-2 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-[3px]"
    >
      {logos.map((logo, index) => {
        // Determine which row this logo belongs to (0-indexed)
        // With 2 columns, each row has 2 logos
        const rowIndex = Math.floor(index / 2);
        const isRowVisible = visibleRows.includes(rowIndex);

        return (
          <li
            key={logo.id}
            className="relative flex items-center justify-center rounded-2xl px-4 py-1 md:py-0.5 min-h-[100px] md:min-h-[120px] transition-opacity duration-500"
            style={{
              opacity: isRowVisible ? 1 : 0,
            }}
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="max-h-full max-w-full object-contain"
            />
          </li>
        );
      })}
    </ul>
  );
};

export { Logos13 };

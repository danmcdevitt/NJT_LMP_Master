"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const Logos13 = () => {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const gridRef = useRef<HTMLUListElement>(null);

  const logos = [
    {
      id: "logo-1",
      name: "TUI",
      image: "/images/logos/TUI_Logo_2016.svg.png",
    },
    {
      id: "logo-2",
      name: "Jet2Holidays",
      image: "/images/logos/Jet2Holidays Logo.png",
    },
    {
      id: "logo-3",
      name: "P&O Cruises",
      image: "/images/logos/P&O Cruises Logo 2.png",
    },
    {
      id: "logo-4",
      name: "Virgin Voyages",
      image: "/images/logos/Virgin Voyages Logo.png",
    },
    {
      id: "logo-5",
      name: "Audley Travel",
      image: "/images/logos/audley-logo-green.png",
    },
    {
      id: "logo-6",
      name: "Saga",
      image: "/images/logos/Saga-Logo-min.png",
    },
    {
      id: "logo-7",
      name: "NCLH",
      image: "/images/logos/NCLH_BIG-28a413a2.png",
    },
    {
      id: "logo-8",
      name: "NJT",
      image: "/images/logos/NJT Logo Cruise Blue.webp",
    },
    {
      id: "logo-9",
      name: "TTF",
      image: "/images/logos/TTF website - KTP & Acc-(2).png.webp",
    },
    {
      id: "logo-10",
      name: "TTF 2",
      image: "/images/logos/TTF website - KTP & Acc-(3).png.webp",
    },
    {
      id: "logo-11",
      name: "Europe Travel",
      image: "/images/logos/EUROPE THE TRAVEL FRANCHISE.png",
    },
    {
      id: "logo-12",
      name: "W Travel",
      image: "/images/logos/W Travel Franchise.png",
    },
  ];

  const startAnimation = useCallback(() => {
    setVisibleRows([]);
    
    // Animate rows one at a time (4 rows total)
    const totalRows = 4;
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        setVisibleRows((prev) => [...prev, rowIndex]);
      }, rowIndex * 200); // 200ms delay between each row
    }
  }, []);

  const resetAnimation = useCallback(() => {
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
      className="grid w-full grid-cols-3 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-[3px]"
    >
      {logos.map((logo, index) => {
        // Determine which row this logo belongs to (0-indexed)
        const rowIndex = Math.floor(index / 3);
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

"use client";

import { useEffect, useState } from "react";
import { BrandCard } from "@/components/ui/BrandCard";

interface BrandCardData {
  backgroundImage: string;
  logoImage: string;
  logoAlt: string;
}

interface BrandCardFanProps {
  cards: BrandCardData[];
  shuffleInterval?: number; // milliseconds between shuffles
  className?: string;
}

const BrandCardFan = ({
  cards,
  shuffleInterval = 3000,
  className = "",
}: BrandCardFanProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cards.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for animation to complete before updating index
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setIsAnimating(false);
      }, 600); // Half of transition duration
    }, shuffleInterval);

    return () => clearInterval(interval);
  }, [cards.length, shuffleInterval]);

  // Calculate positions for each card
  const getCardStyle = (index: number) => {
    const totalCards = cards.length;
    const position = (index - currentIndex + totalCards) % totalCards;
    
    // Calculate z-index (current card on top, previous card moves to back)
    // During animation, the card moving to front gets highest z-index
    let zIndex;
    if (position === 0) {
      zIndex = totalCards + 2; // Current front card
    } else if (position === totalCards - 1) {
      zIndex = 1; // Card moving to back
    } else {
      zIndex = totalCards - position + 1; // Cards in between
    }
    
    // Calculate transform for fan effect
    // Cards spread out slightly in a fan
    const centerOffset = (totalCards - 1) / 2;
    const relativePosition = position - centerOffset;
    const angle = relativePosition * 3; // Slight rotation for fan effect
    const translateX = relativePosition * 15; // Horizontal offset
    const scale = position === 0 ? 1 : 1 - position * 0.04; // Scale down cards behind
    
    return {
      zIndex,
      transform: `translateX(${translateX}px) rotate(${angle}deg) scale(${scale})`,
      opacity: 1, // All cards remain fully opaque
      transition: isAnimating 
        ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s linear 0.6s'
        : 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      transformOrigin: 'center center',
    };
  };

  return (
    <div className={`relative aspect-[3/4] w-full max-w-[320px] mx-auto ${className}`} style={{ transform: 'scale(0.85)' }}>
      {cards.map((card, index) => (
        <div
          key={`${card.backgroundImage}-${index}`}
          className="absolute top-0 left-0 w-full h-full"
          style={getCardStyle(index)}
        >
          <BrandCard
            backgroundImage={card.backgroundImage}
            logoImage={card.logoImage}
            logoAlt={card.logoAlt}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export { BrandCardFan };


import { Card } from "@/components/ui/Card";

interface BrandCardProps {
  backgroundImage: string;
  logoImage: string;
  logoAlt?: string;
  className?: string;
}

const BrandCard = ({
  backgroundImage,
  logoImage,
  logoAlt = "Brand logo",
  className = "",
}: BrandCardProps) => {
  return (
    <Card
      glass
      className={`border-0 overflow-hidden aspect-[3/4] w-full relative z-10 ${className}`}
    >
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Frosted Glass Overlay from Bottom - Adjusted for logo visibility */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40%] backdrop-blur-xl" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
          maskImage: 'linear-gradient(to top, black 0%, black 40%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0.1) 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.3) 88%, rgba(0,0,0,0.1) 95%, transparent 100%)'
        }} 
      />

      {/* Brand Logo at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 flex items-center justify-center">
        <img
          src={logoImage}
          alt={logoAlt}
          className="max-w-full max-h-12 sm:max-h-14 md:max-h-16 w-auto h-auto object-contain drop-shadow-lg"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
    </Card>
  );
};

export { BrandCard };


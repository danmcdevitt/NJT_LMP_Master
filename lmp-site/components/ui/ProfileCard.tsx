import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProfileCardProps {
  name?: string;
  phone?: string;
  image?: string;
  className?: string;
}

const ProfileCard = ({
  name = "Jane Smith",
  phone = "07777 000 123",
  image = "/images/logos/portraitjane.webp",
  className = "",
}: ProfileCardProps) => {
  return (
    <Card
      glass
      className={`border-0 overflow-hidden aspect-[3/4] w-full relative z-10 ${className}`}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={`${name} - Travel Expert`}
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
        <div className="space-y-2">
          <h3 className="text-[1.8rem] sm:text-[2.4rem] font-medium text-white drop-shadow-lg">{name}</h3>
          <Button size="lg" className="shadow-none">{phone}</Button>
        </div>
      </div>
    </Card>
  );
};

export { ProfileCard };


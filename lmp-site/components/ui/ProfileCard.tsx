import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

interface ProfileCardProps {
  name?: string;
  phone?: string;
  image?: string;
  className?: string;
}

const ProfileCard = ({
  name = SITE_CONFIG.agentName,
  phone = SITE_CONFIG.phone,
  image = SITE_CONFIG.agentImage,
  className = "",
}: ProfileCardProps) => {
  return (
    <Card
      className={`border-0 overflow-hidden aspect-[3/4] w-full relative z-10 ${className}`}
      style={{ backgroundColor: '#004F6E' }}
    >
      {/* Circular Image Mask */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-48 h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={image}
            alt={`${name} - Travel Expert`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Content at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
        <div className="space-y-2">
          <h3 className="text-[1.8rem] sm:text-[2.4rem] font-medium text-white">{name}</h3>
          <Button size="lg" className="shadow-none">{phone}</Button>
        </div>
      </div>
    </Card>
  );
};

export { ProfileCard };


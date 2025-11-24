import { Award } from "lucide-react";

const Hero4Adapted = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative w-[95vw] mx-auto">
      <div className="w-full grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="bg-muted flex justify-end">
          <img
            src="/images/ctawaves.webp"
            alt="Ocean waves and beach destination"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </div>
        <div className="flex flex-col items-center text-center lg:max-w-3xl lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold mb-4 sm:mb-6" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)', color: 'rgb(0, 120, 120)', border: '1px solid rgba(0, 120, 120, 0.3)' }}>
            <Award className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'rgb(0, 120, 120)' }} />
            <span>BIG BRANDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-2 sm:mb-3 lg:mb-4 leading-tight" style={{ color: '#004F6E' }}>
            Big brands with a personal touch
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3 sm:mb-4 lg:mb-6">
            We partner with the world&apos;s leading travel brands to bring you exclusive deals and packages. From luxury cruise lines to trusted tour operators, access the best holidays all in one place with personalized service.
          </p>
          <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <div className="flex items-center">
              <img
                src="/images/logos/Trustpilot.png"
                alt="Trustpilot"
                className="h-auto max-h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero4Adapted };


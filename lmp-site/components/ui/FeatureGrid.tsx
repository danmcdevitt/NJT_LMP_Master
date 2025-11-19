import { ArrowRight, User } from "lucide-react";

const FeatureGrid = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative w-[95vw] mx-auto">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <a
            href="#"
            className="group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1"
          >
            <img
              src="/images/amalfi.webp"
              alt="Amalfi Coast"
              className="absolute h-full w-full object-cover object-center zoom-in-slow"
            />
            <div className="sm:aspect-3/2 relative flex h-full w-full flex-col items-start justify-end p-4 transition-colors md:p-6 lg:p-10">
              {/* Frosted Glass Overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[40%] bg-white/20 backdrop-blur-sm" 
                style={{ 
                  WebkitBackdropFilter: 'blur(8px)',
                  maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
                }} 
              />
              <div className="w-full relative z-10">
                <User className="w-8 h-8 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl mb-1">
                  Personal service
                </h3>
                <p className="text-sm font-medium text-white md:text-base lg:text-lg leading-tight max-w-[18rem] sm:max-w-[20rem] text-balance">
                  You'll be looked after by one of the top travel agencies in the UK.
                </p>
              </div>
            </div>
          </a>
          <div className="flex flex-col justify-between rounded-lg p-4 sm:justify-end md:p-6 lg:p-10" style={{ backgroundColor: '#9FF0D4' }}>
            <div className="mb-2 text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: '#004F6E' }}>Totally free</div>
            <div className="text-xs md:text-base lg:text-lg leading-tight" style={{ color: '#004F6E' }}>We handle every detail for you, including research, quotes, bookings, amendments and aftercare.</div>
          </div>
          <div className="flex flex-col justify-between rounded-lg p-4 sm:justify-end md:p-6 lg:p-10" style={{ backgroundColor: 'rgba(159, 213, 209, 0.2)' }}>
            <div className="mb-2 text-3xl sm:mb-2 lg:text-5xl font-bold" style={{ color: '#004F6E' }}>5</div>
            <div className="text-xs md:text-base lg:text-lg leading-tight text-muted-foreground">Metric 2</div>
          </div>
          <div className="flex flex-col justify-between rounded-lg p-4 md:p-6 lg:p-10" style={{ backgroundColor: 'rgba(159, 240, 212, 0.15)' }}>
            <div className="mb-2 text-3xl lg:text-5xl font-bold" style={{ color: '#004F6E' }}>150+</div>
            <div className="text-xs md:text-base lg:text-lg leading-tight text-muted-foreground">Metric 3</div>
          </div>
          <div className="flex flex-col justify-between rounded-lg p-4 md:p-6 lg:p-10" style={{ backgroundColor: 'rgba(159, 213, 209, 0.2)' }}>
            <div className="mb-2 text-3xl lg:text-5xl font-bold" style={{ color: '#004F6E' }}>10</div>
            <div className="text-xs md:text-base lg:text-lg leading-tight text-muted-foreground">Metric 4</div>
          </div>
          <a
            href="#"
            className="group relative col-span-2 overflow-clip rounded-lg sm:max-lg:col-span-1"
          >
            <img
              src="https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Travel destination"
              className="absolute h-full w-full object-cover object-center"
            />
            <div className="sm:aspect-2/1 relative flex h-full w-full flex-col items-start justify-between gap-4 p-4 transition-colors md:flex-row md:items-end md:p-6 lg:p-10" style={{ backgroundColor: 'rgba(0, 79, 110, 0.5)' }}>
              <div>
                <img
                  src="/images/logos/NJT Logo Cruise Blue.webp"
                  alt="Not Just Travel"
                  className="mb-2 h-7 brightness-0 invert"
                />
              </div>
              <div className="flex shrink-0 items-center text-xs font-medium text-white md:text-base lg:text-lg leading-tight">
                Read more{" "}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { FeatureGrid };


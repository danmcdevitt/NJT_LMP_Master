import {
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

const Footer13 = () => {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0" style={{ backgroundColor: '#001620', color: 'white' }}>
      <div className="w-[95vw] mx-auto px-5 sm:px-6 lg:px-8">
        <footer>
          <div className="mb-12 sm:mb-16">
            <div className="flex flex-col items-center text-center">
              <h2 className="max-w-[800px] text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white">
                Your best memories can start with a message
              </h2>
              <p className="text-white/80 mt-4 max-w-[600px] text-base sm:text-lg">
                Get in touch to start planning<br className="md:hidden" /> your perfect holiday today.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="group" style={{ backgroundColor: '#FF5353', color: 'white' }}>
                  <a href="tel:07777000123" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    07777 000 123
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ABTA Information Section */}
      <nav className="w-full border-b py-8 sm:py-10 md:py-12 lg:py-14" style={{ backgroundColor: '#010101', borderColor: 'rgba(159, 240, 212, 0.2)' }}>
        <div className="w-[95vw] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:gap-6 items-start">
            <div className="w-full md:flex-[3] md:pr-6">
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Not Just Travel (Agency) Ltd, sells travel services on behalf of Hays Travel Limited and benefits from Hays Travel's membership of ABTA with membership number K9413. ABTA and ABTA Members help holidaymakers to get the most from their travel and assist them when things do not go according to plan. We are obliged to maintain a high standard of service to you by ABTA's Code of Conduct.
                </p>
                <p>
                  For further information about ABTA, the Code of Conduct and the arbitration scheme available to you if you have a complaint, contact ABTA, 30 Park Street, London SE1 9EQ. Tel: 020 3117 0599 or www.abta.com.
                </p>
                <p>
                  Book with Confidence. We are a Member of ABTA which means you have the benefit of ABTA's assistance and Code of Conduct. We provide financial protection for your money when you buy a package holiday. If you buy other travel arrangements such as accommodation only this protection doesn't apply.
                </p>
              </div>
            </div>
            <div className="flex md:flex-[1] flex-row items-start gap-4 flex-wrap md:min-h-[100px] mt-6 md:mt-0">
              <img
                src="/images/logos/Trustpilot.png"
                alt="Trustpilot"
                className="w-auto h-auto"
                style={{ maxWidth: '180px', maxHeight: '72px', objectFit: 'contain' }}
              />
              <img
                src="/images/logos/abta_white.png"
                alt="ABTA"
                className="w-auto h-auto"
                style={{ maxWidth: '90px', maxHeight: '54px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="w-full" style={{ backgroundColor: '#010101', paddingTop: '12px', paddingBottom: '12px' }}>
        <div className="w-[95vw] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
            <p className="text-white/80 font-medium text-sm sm:text-base text-center sm:text-left">
              © {new Date().getFullYear()} Not Just Travel
            </p>
            <div className="flex flex-row gap-4 sm:gap-6 items-center">
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Booking Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer13 };

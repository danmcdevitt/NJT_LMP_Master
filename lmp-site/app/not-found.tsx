import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'white' }}>
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4" style={{ color: '#004F6E' }}>404</h1>
        <h2 className="text-2xl font-medium mb-4" style={{ color: '#004F6E' }}>
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" style={{ backgroundColor: '#004F6E', color: 'white' }}>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="lg" style={{ backgroundColor: '#FF5353', color: 'white' }}>
            <a href={`tel:${SITE_CONFIG.phoneFormatted}`} className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}


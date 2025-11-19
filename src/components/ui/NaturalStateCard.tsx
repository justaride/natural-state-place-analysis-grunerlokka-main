import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

interface NaturalStateCardProps {
  variant?: 'default' | 'compact';
}

export default function NaturalStateCard({ variant = 'default' }: NaturalStateCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href="https://naturalstate.no"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105"
      >
        <div className="rounded-lg border-2 border-lokka-primary/20 bg-gradient-to-br from-lokka-primary/5 to-lokka-secondary/5 p-4 text-center shadow-sm hover:shadow-md">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Image
              src="/images/branding/ns-logo.webp"
              alt="Natural State"
              width={64}
              height={64}
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-lokka-primary">
              Natural State
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Utviklet av Natural State
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Card className="overflow-hidden border-2 border-lokka-primary/20 bg-gradient-to-br from-lokka-primary/5 to-lokka-secondary/5">
      <CardHeader className="border-b border-natural-forest/10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/branding/ns-logo.webp"
            alt="Natural State"
            width={96}
            height={96}
            className="h-12 w-auto"
          />
          <div>
            <CardTitle className="text-lokka-primary">Natural State AS</CardTitle>
            <p className="text-sm text-gray-500">nature, human, society</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-natural-forest">Om Selskapet</h3>
            <p className="text-sm text-gray-600">
              Natural State spesialiserer seg på bærekraftig stedsutvikling, sirkulær økonomi og
              dataanalyse for eiendomsforvaltning og samfunnsutvikling.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-natural-forest">Kjernevirksomhet</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Strategisk stedsutvikling</li>
              <li>• Sirkulær økonomi for bygg</li>
              <li>• Markedsanalyser</li>
              <li>• Medvirkningsprosesser</li>
            </ul>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-white/50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-natural-forest">Kontakt</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📍</span>
              <span className="text-gray-600">St Halvards Gate 33, Oslo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📧</span>
              <a href="mailto:gabriel@naturalstate.no" className="text-natural-sage hover:underline">
                gabriel@naturalstate.no
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🌐</span>
              <a href="https://naturalstate.no" target="_blank" rel="noopener noreferrer" className="text-natural-sage hover:underline">
                naturalstate.no
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="https://naturalstate.no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-lokka-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lokka-secondary"
          >
            Besøk naturalstate.no
            <span className="text-lg">→</span>
          </Link>
          <Link
            href="https://www.linkedin.com/company/20143755"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-lokka-primary px-4 py-2 text-sm font-medium text-lokka-primary transition-colors hover:bg-lokka-primary/10"
          >
            LinkedIn
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

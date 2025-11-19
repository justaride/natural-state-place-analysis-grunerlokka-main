import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import NaturalStateCard from '@/components/ui/NaturalStateCard';

export const metadata = {
  title: 'Om Prosjektet',
  description: 'Informasjon om Natural State Place Analysis for Grünerløkka',
};

export default function OmProsjektetPage() {
  return (
    <Container>
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-natural-forest">
          Om Prosjektet
        </h1>
        <p className="text-xl text-gray-600">
          Natural State Place Analysis for Grünerløkka 2025
        </p>
      </div>

      <div className="grid gap-8">
        {/* Purpose - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Formål</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Natural State Place Analysis for Grünerløkka er et analyseverktøy og system hvor vi samler Plaace-underlaget til en felles plattform for å gjøre dypere analyser av området gjennom hele 2025. Vi inkorporerer andre viktige elementer av data og innsikter som vi tilegner oss gjennom året - fra månedlige utviklingstrender til hendelsesanalyser og komparative studier med andre bydeler.
            </p>
            <p className="text-gray-600">
              Vi bruker Plaace, KI-verktøy, koding og en bred rekke verktøy, samt en engasjert gruppe med mennesker som bidrar til å oppnå mye med smarte og innovative tilnærminger. Målet er å bygge en omfattende forståelse av Grünerløkkas utvikling, utfordringer og muligheter.
            </p>
          </CardContent>
        </Card>

        {/* Two column grid for Data Sources and Contact */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Datakilder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Data kommer fra flere kilder for å gi et mest mulig helhetlig bilde av Grünerløkka. Vi benytter månedlige Plaace-rapporter som primærkilde, og beriker dette med hendelsesregistrering, mediasporing, komparative analyser med andre bydeler, feltstudier og andre teknologiske prosesser. Dette skaper en plattform som er grunnlaget for å følge stedets utvikling gjennom hele 2025.
              </p>
            </CardContent>
          </Card>

          <div id="kontakt">
            <Card>
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                For spørsmål, tilbakemeldinger eller forslag, kontakt Natural State:
              </p>
              <div className="mb-4 rounded-lg bg-gray-50 p-4">
                <p className="font-medium text-natural-forest">Gabriel B Freeman</p>
                <a
                  href="mailto:gabriel@naturalstate.no"
                  className="text-sm text-natural-sage hover:text-natural-forest"
                >
                  gabriel@naturalstate.no
                </a>
              </div>

              {/* Google Forms Embed */}
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Send tilbakemelding</h4>
                <p className="mb-3 text-xs text-gray-600">
                  Vi setter stor pris på dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeo32aBhqz7MhKLaKT5MY3mv5zazND2Fb8hfM3t92SeFIRS-w/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-natural-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-natural-sage"
                >
                  Åpne tilbakemeldingsskjema
                  <span className="text-lg">→</span>
                </a>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>

        {/* Natural State Information Section */}
        <div className="my-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-natural-forest">
            Om Natural State
          </h2>

          {/* Natural State Card - Full Width */}
          <NaturalStateCard />

          {/* Additional Natural State Info */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Visjon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Vi arbeider for en fremtid hvor byutvikling skjer i harmoni med naturen og skaper varige verdier for samfunn, miljø og økonomi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metodikk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Vi kombinerer dyptgående analyser, sirkulære prinsipper og medvirkningsprosesser for å skape helhetlige og bærekraftige løsninger.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ekspertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  10+ ansatte med tverrfaglig kompetanse innen økonomi, arkitektur, bærekraft, planlegging og kommunikasjon.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Market Sphere Visual */}
          <div className="mt-12 rounded-xl bg-gradient-to-br from-natural-forest/5 to-natural-sage/5 p-8">
            <h3 className="mb-6 text-center text-2xl font-bold text-natural-forest">
              Natural State Metoden
            </h3>
            <div className="mx-auto max-w-2xl">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/branding/market-sphere.png"
                  alt="Natural State Metoden"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p className="mt-6 text-center text-sm text-gray-600">
                Natural State Metoden integrerer økonomiske, miljømessige og sosiale verdier i stedsutviklingsprosjekter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

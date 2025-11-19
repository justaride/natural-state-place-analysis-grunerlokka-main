import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { PopulationTrendChart } from '@/components/demografi/PopulationTrendChart';
import { AgePyramidChart } from '@/components/demografi/AgePyramidChart';
import { IncomeDistributionChart } from '@/components/demografi/IncomeDistributionChart';
import { HouseholdCompositionChart } from '@/components/demografi/HouseholdCompositionChart';
import { DemografiData } from '@/types/demografi';
import { loadAnalysis } from '@/lib/place-loader';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const metadata: Metadata = {
  title: 'Demografi 2017-2023 | Natural State',
  description: 'Demografisk analyse av Grünerløkka 2017-2023 med befolkningsutvikling, aldersfordeling, inntekt og husholdningssammensetning',
};

async function loadDemografiData(): Promise<DemografiData> {
  const filePath = join(process.cwd(), 'src/data/demografi/demografi-2017-2023.json');
  const fileContent = await readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export default async function DemografiPage() {
  const analysis = await loadAnalysis('demografi-2017-2023');
  const data = await loadDemografiData();

  if (!analysis) {
    notFound();
  }

  const firstYear = data.populationOverTime[0];
  const lastYear = data.populationOverTime[data.populationOverTime.length - 1];

  const populationGrowth = firstYear && lastYear
    ? ((lastYear.population - firstYear.population) / firstYear.population) * 100
    : 0;

  return (
    <>
      {/* Hero Image Header Section */}
      <section className="relative overflow-hidden border-b border-gray-200">
        <div className="relative aspect-[21/9] w-full md:aspect-[24/9] lg:aspect-[32/9]">
          {analysis.metadata.heroImage && (
            <Image
              src={analysis.metadata.heroImage}
              alt={analysis.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-indigo-600/20 opacity-50 mix-blend-overlay" />

          {/* Content overlay */}
          <Container className="absolute inset-0 flex flex-col justify-between py-6 md:py-8">
            <div>
              <Link
                href="/analyser"
                className="inline-flex items-center gap-2 text-xs text-white/90 transition-colors hover:text-white md:text-sm"
              >
                <span>←</span> Tilbake til oversikt
              </Link>
            </div>

            <div className="pb-4 md:pb-6">
              <div className="mb-3 md:mb-4">
                <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium backdrop-blur-sm md:text-sm">
                  Demografisk Analyse 2017-2023
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:mb-3 md:text-4xl lg:text-5xl">
                {analysis.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 drop-shadow-md md:text-lg">
                {analysis.area.displayName} ({analysis.area.areaSize})
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="border-b border-gray-200/30 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-indigo-50/30 py-8 md:py-12">
        <Container>
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl font-bold text-natural-forest md:text-3xl">
              Om Analysen
            </h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              {analysis.description}
            </p>
          </div>

          {/* Year Period Cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-blue-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">
                  2017-2019
                </div>
                <div className="text-sm text-gray-600">
                  Tidlig periode
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Grunnlinje for sammenligning
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-green-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">
                  2020
                </div>
                <div className="text-sm text-gray-600">
                  Pandemi-år
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  COVID-19 påvirkning
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-yellow-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">
                  2021-2022
                </div>
                <div className="text-sm text-gray-600">
                  Normalisering
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Gradvis gjenopptaking
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:rounded-2xl md:p-6">
              <div className="absolute right-0 top-0 h-2 w-full bg-purple-500" />
              <div className="relative mt-4">
                <div className="mb-2 text-2xl font-bold text-natural-forest md:text-3xl">
                  2023
                </div>
                <div className="text-sm text-gray-600">
                  Seneste data
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Nåværende situasjon
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {analysis.highlights?.map((highlight, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200/50 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl font-bold text-natural-forest">
                  {highlight.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-gray-900">
                  {highlight.title}
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  {highlight.description}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Charts Section */}
      <Container className="py-12 md:py-16 lg:py-20">
        {/* Population Trend Over Time */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-natural-forest md:text-3xl">
            Befolkningsutvikling over tid
          </h2>
          <p className="mb-8 text-gray-600">
            Befolkningsvekst fra {firstYear?.population.toLocaleString('nb-NO')} i 2017
            til {lastYear?.population.toLocaleString('nb-NO')} i 2023
            (+{populationGrowth.toFixed(1)}% vekst over perioden)
          </p>
          <PopulationTrendChart data={data.populationOverTime} />
        </div>

        {/* Age Distribution Trends */}
        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-natural-forest md:text-3xl">
            Alderssammensetning over tid
          </h2>
          <p className="mb-8 text-gray-600">
            Kjønnsfordelt alderspyramide som viser demografisk sammensetning for hvert år.
            Velg år for å sammenligne endringer i aldersfordeling.
          </p>
          <AgePyramidChart data={data.ageDistribution} />
        </div>

        {/* Household Composition Trends */}
        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-natural-forest md:text-3xl">
            Husholdningssammensetning over tid
          </h2>
          <p className="mb-8 text-gray-600">
            Utvikling i husholdningstyper fra 2017 til 2023. Bytt mellom fordeling og utvikling
            for å se både øyeblikksbilde og trender.
          </p>
          <HouseholdCompositionChart data={data.householdTypes} />
        </div>

        {/* Income Distribution Trends */}
        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-natural-forest md:text-3xl">
            Inntektsfordeling over tid
          </h2>
          <p className="mb-8 text-gray-600">
            Sammenligning av inntektsbraketter på tvers av år. Velg to år for å se detaljerte
            endringer i inntektsfordelingen.
          </p>
          <IncomeDistributionChart data={data.incomeDistribution} />
        </div>

        {/* Deep Insights Section */}
        <div className="mt-20">
          <Card>
            <CardContent className="p-6 md:p-8">
              <h3 className="mb-6 text-2xl font-bold text-natural-forest md:text-3xl">
                Viktige funn fra analysen
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">
                    📈 Stabil befolkningsvekst
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Befolkningen har vokst jevnt fra {firstYear?.population.toLocaleString('nb-NO')} i 2017
                    til {lastYear?.population.toLocaleString('nb-NO')} i 2023,
                    en økning på {populationGrowth.toFixed(1)}%. Dette reflekterer områdets
                    fortsatte attraktivitet som bosted.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">
                    🏠 Dominans av aleneboende
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Aleneboende utgjør den klart største husholdningstypen, noe som er
                    typisk for urbane sentrumsområder. Dette påvirker både boligetterspørsel
                    og kommersielle tjenester i området.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">
                    👥 Ung befolkning
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Aldersgruppen 23-34 år dominerer befolkningen, noe som gjenspeiler
                    områdets status som et attraktivt boområde for unge voksne og
                    nyetablerte profesjonelle.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">
                    💰 Variert inntektsnivå
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-700">
                    Inntektsfordelingen viser en blanding av ulike inntektsnivåer,
                    med en betydelig andel i mellom- og høyinntektsbrakettene,
                    typisk for et etablert Oslo-område med god infrastruktur.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        {analysis.metadata.notater && analysis.metadata.notater.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h3 className="mb-4 text-xl font-bold text-natural-forest md:text-2xl">
                  Viktige notater
                </h3>
                <ul className="list-disc space-y-3 pl-5 text-gray-700">
                  {analysis.metadata.notater.map((note, index) => (
                    <li key={index} className="leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Datakilder: {analysis.plaaceData?.datakilder?.join(', ') || 'Plaace.ai, SSB'} | Oppdatert:{' '}
          {new Date(analysis.metadata.sistOppdatert || analysis.metadata.updatedAt || analysis.metadata.createdAt || analysis.metadata.opprettet).toLocaleDateString('nb-NO')}
        </div>
      </Container>
    </>
  );
}

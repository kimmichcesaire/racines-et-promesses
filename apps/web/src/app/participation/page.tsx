import type { Metadata } from "next";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { PrayerForm } from "@/components/forms/PrayerForm";
import { ContributionBlock } from "@/components/ContributionBlock";
import { PageWatermark } from "@/components/PageWatermark";
import { WatermarkCard } from "@/components/WatermarkCard";
import { BlockText } from "@/components/BlockText";
import { getContentBlocks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Participation — Racines & Promesses",
  description: "Présence, prière, semence, cadeau : prenez part à notre histoire.",
};

const FALLBACK_INTRO = `Une alliance ne se construit jamais seule. Aujourd'hui, nous souhaitons vous donner la possibilité de prendre part à cette nouvelle saison.`;

export default async function ParticipationPage() {
  const blocks = await getContentBlocks("participation");

  return (
    <section className="relative px-6 py-20 sm:py-28 overflow-hidden">
      <PageWatermark />

      <WatermarkCard className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl text-vert-profond">
          Vous faites partie de notre histoire
        </h1>
        <div className="font-sans text-[15px] leading-relaxed text-vert-profond/85 mt-6">
          <BlockText text={blocks.intro?.contenu ?? FALLBACK_INTRO} />
        </div>
        <p className="font-display italic text-lg text-or-mat mt-4">
          Chacun peut semer à sa manière.
        </p>
      </WatermarkCard>

      <div className="relative mx-auto max-w-xl mt-16 space-y-16">
        <WatermarkCard id="presence">
          <h2 className="font-display text-2xl text-vert-profond text-center mb-6">Présence</h2>
          <RsvpForm />
        </WatermarkCard>

        <WatermarkCard id="priere">
          <h2 className="font-display text-2xl text-vert-profond text-center mb-6">Prière</h2>
          <PrayerForm />
        </WatermarkCard>

        <WatermarkCard id="semence" className="text-center">
          <h2 className="font-display text-2xl text-vert-profond mb-4">Semence &amp; Cadeau</h2>
          <p className="font-sans text-sm text-vert-profond/80 mb-6">
            Contribuer à notre foyer, à votre manière.
          </p>
          <div id="cadeau">
            <ContributionBlock />
          </div>
        </WatermarkCard>
      </div>

      <p className="relative text-center font-display text-lg tracking-wide text-vert-profond mt-20">
        Merci de semer avec nous.
      </p>
    </section>
  );
}

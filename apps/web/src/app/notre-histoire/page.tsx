import type { Metadata } from "next";
import { Verse } from "@/components/Verse";
import { PageWatermark } from "@/components/PageWatermark";
import { WatermarkCard } from "@/components/WatermarkCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BlockText } from "@/components/BlockText";
import { getContentBlocks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notre histoire — Racines & Promesses",
  description: "Le récit chronologique de Luciana & Ben.",
};

const FALLBACK_RECIT = `Le récit chronologique détaillé de Luciana & Ben prendra place ici : leur rencontre à Lille, la période du Covid et leurs premiers échanges, la distance entre Nice et Reims, le rôle de Dieu dans leur histoire, la naissance de la soif spirituelle de Ben, leur décision de se marier, leur vision du foyer, et le cheminement spirituel qui les a menés jusqu'ici.`;

export default async function NotreHistoirePage() {
  const blocks = await getContentBlocks("notre-histoire");

  return (
    <section className="relative px-6 py-20 sm:py-28 overflow-hidden">
      <PageWatermark />

      <WatermarkCard className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl text-vert-profond">Notre histoire</h1>
        <p className="font-sans text-xs uppercase tracking-widest text-or-mat mt-4">
          Récit en cours de rédaction — photos à venir (séance photo en cours)
        </p>

        <div className="font-sans text-[15px] leading-relaxed text-vert-profond/85 space-y-6 mt-10 text-left">
          <BlockText text={blocks.recit?.contenu ?? FALLBACK_RECIT} />
          <p className="text-vert-profond/60 italic">
            Cette page sera complétée avec le couple, accompagnée des photos de leur séance
            en cours.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl text-vert-profond text-center mb-6">Nos photos</h2>
          <PhotoGallery />
        </div>

        <div className="mt-14">
          <Verse reference="Psaume 127:1">Si l&apos;Éternel ne bâtit la maison…</Verse>
        </div>
      </WatermarkCard>
    </section>
  );
}

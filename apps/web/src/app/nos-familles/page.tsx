import type { Metadata } from "next";
import { PageWatermark } from "@/components/PageWatermark";
import { WatermarkCard } from "@/components/WatermarkCard";

export const metadata: Metadata = {
  title: "Nos familles — Racines & Promesses",
  description: "Présentation des familles de Luciana & Ben.",
};

export default function NosFamillesPage() {
  return (
    <section className="relative px-6 py-20 sm:py-28 overflow-hidden">
      <PageWatermark />

      <WatermarkCard className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl text-vert-profond">Nos familles</h1>
        <p className="font-sans text-xs uppercase tracking-widest text-or-mat mt-4">
          Contenu à préparer avec le couple
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-vert-profond/85 mt-8">
          Cette page présentera les familles de Luciana &amp; Ben — un contenu qui reste à
          définir ensemble avant sa publication.
        </p>
      </WatermarkCard>
    </section>
  );
}

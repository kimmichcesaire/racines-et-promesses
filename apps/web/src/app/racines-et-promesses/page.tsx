import type { Metadata } from "next";
import { Verse } from "@/components/Verse";
import { PageWatermark } from "@/components/PageWatermark";
import { WatermarkCard } from "@/components/WatermarkCard";

export const metadata: Metadata = {
  title: "Racines & Promesses — Luciana & Ben",
  description: "Approfondissement du concept Racines, Alliance et Promesses.",
};

const PILIERS = [
  {
    titre: "Racines",
    citation: "Honorer nos racines, c'est reconnaître ce qui nous a façonnés.",
    texte:
      "D'où nous venons : notre foi, nos familles, notre parcours et les personnes qui ont semé dans nos vies.",
  },
  {
    titre: "Alliance",
    citation: "Deux vies. Une alliance. Une même source.",
    texte:
      "Ce que nous construisons : deux histoires qui se rencontrent, deux personnes qui choisissent de marcher ensemble, et une nouvelle maison qui prend forme.",
  },
  {
    titre: "Promesses",
    citation:
      "Nous ne voulons pas seulement bâtir une maison. Nous voulons bâtir un héritage.",
    texte:
      "Ce vers quoi nous avançons : notre avenir, notre foyer, le fruit que nous désirons porter et l'héritage que nous voulons transmettre.",
  },
];

export default function RacinesEtPromessesPage() {
  return (
    <section className="relative px-6 py-20 sm:py-28 overflow-hidden">
      <PageWatermark />

      <WatermarkCard className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl text-vert-profond">Racines &amp; Promesses</h1>
        <p className="font-sans text-xs uppercase tracking-widest text-or-mat mt-4">
          Page à rédiger avec le couple — structure ci-dessous à conserver
        </p>

        <div className="mt-14 space-y-14 text-left">
          {PILIERS.map((pilier) => (
            <div key={pilier.titre}>
              <h2 className="font-display text-2xl text-vert-profond text-center">
                {pilier.titre}
              </h2>
              <p className="font-sans text-[15px] leading-relaxed text-vert-profond/85 mt-3">
                {pilier.texte}
              </p>
              <p className="font-display italic text-or-mat text-center mt-3">
                « {pilier.citation} »
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Verse reference="Jean 15:5">
            Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit.
          </Verse>
        </div>

        <p className="font-display text-lg tracking-wide text-vert-profond mt-10">
          DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.
        </p>
      </WatermarkCard>
    </section>
  );
}

import Link from "next/link";
import { Verse } from "@/components/Verse";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Reveal } from "@/components/Reveal";
import { OpeningHeroVideo } from "@/components/OpeningHeroVideo";
import { BlockText } from "@/components/BlockText";
import { ShareSaveTheDateButton } from "@/components/ShareSaveTheDateButton";
import { getContentBlocks } from "@/lib/content";

// Repli affiché si l'API/Supabase est injoignable — identique au texte
// seedé en base (cahier des charges, section 5), pour que la page reste
// correcte même quand le contenu dynamique ne peut pas être chargé.
const FALLBACK = {
  ecran_2: `Notre histoire ne commence pas simplement avec le jour où nous nous sommes rencontrés. Elle est faite de tout ce qui nous a précédés, de tout ce que nous avons traversé et de tout ce que Dieu nous a permis de devenir. Aujourd'hui, deux histoires se rejoignent pour commencer à en écrire une nouvelle.

NOS RACINES : notre foi, nos familles, notre histoire, les personnes qui ont semé dans nos vies et les valeurs que nous voulons porter dans notre foyer.

NOTRE ALLIANCE : le choix de marcher ensemble, de bâtir ensemble et de demeurer attachés à la même source.

NOS PROMESSES : le foyer que nous voulons construire, les générations à venir et le fruit que nous désirons porter.`,
  ecran_3: `Rencontre à Lille, les premiers échanges pendant le Covid, la distance entre Nice et Reims, le rôle de Dieu dans leur histoire, la naissance de la soif spirituelle de Ben, la décision du mariage, la vision de leur foyer, le fruit et l'héritage qu'ils désirent porter, et ce qu'ils admirent l'un chez l'autre.`,
  ecran_4: `Nous ne voulons pas seulement construire une vie ensemble. Nous voulons que l'Éternel bâtisse notre maison. Nous voulons que notre foyer soit enraciné dans Sa Parole, conduit par Sa présence et orienté vers Son œuvre.

UN FOYER POUR SA GLOIRE : notre mariage doit être plus qu'une union entre deux personnes — un témoignage vivant de la grâce de Dieu sur la terre.

PORTER DU FRUIT : relation avec Dieu, amour, service, vies touchées et transmission aux générations.`,
  ecran_6: `Nous vous invitons à garder cette période libre afin de célébrer avec nous une nouvelle étape de notre histoire. La date exacte vous sera communiquée prochainement.`,
  ecran_7: `Une alliance ne se construit jamais seule. Derrière notre histoire se trouvent des personnes qui ont prié, aimé, encouragé, conseillé et semé dans nos vies. Aujourd'hui, nous souhaitons vous donner la possibilité de prendre part à cette nouvelle saison.`,
};

export default async function AccueilPage() {
  const blocks = await getContentBlocks("accueil");

  return (
    <>
      {/* Écran 1 — Ouverture */}
      <section
        id="ecran-1"
        // Ton exact du fond de la vidéo (#F3EBE0), échantillonné pixel par
        // pixel, plutôt que le token --color-ivoire (#F8F4ED) légèrement
        // plus clair : aucune bordure visible entre la vidéo et la section.
        className="min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-[#F3EBE0]"
      >
        <div className="mb-2">
          <OpeningHeroVideo />
        </div>
        <h1
          className="rise-in font-display text-4xl sm:text-5xl tracking-wide text-vert-profond"
          style={{ animationDelay: "150ms" }}
        >
          RACINES &amp; PROMESSES
        </h1>
        <p
          className="rise-in font-display text-2xl sm:text-3xl mt-2 text-vert-profond/90"
          style={{ animationDelay: "300ms" }}
        >
          Luciana &amp; Ben
        </p>
        <div className="rise-in" style={{ animationDelay: "450ms" }}>
          <Verse reference="Jérémie 17:8">
            Ils seront comme des arbres plantés près d&apos;un cours d&apos;eau.
          </Verse>
        </div>
        <p
          className="rise-in font-sans text-sm uppercase tracking-[0.2em] text-vert-profond/70 mt-8"
          style={{ animationDelay: "600ms" }}
        >
          Une nouvelle saison commence.
          <br />
          Bienvenue dans notre histoire.
        </p>
        <a
          href="#ecran-2"
          className="rise-in mt-10 font-sans text-xs uppercase tracking-[0.25em] text-or-mat hover:text-vert-profond transition-colors"
          style={{ animationDelay: "750ms" }}
        >
          Entrer dans notre histoire ↓
        </a>
      </section>

      {/* Écran 2 — Le nom "Racines & Promesses" */}
      <section id="ecran-2" className="px-6 py-24 bg-white">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display italic text-xl text-or-mat mb-6">
            « Une histoire qui prend racine. Une alliance qui porte une promesse. »
          </p>
          <div className="font-sans text-[15px] leading-relaxed text-vert-profond/90 space-y-5 text-left sm:text-center">
            <BlockText
              text={blocks.ecran_2?.contenu ?? FALLBACK.ecran_2}
              labelClassName="text-vert-profond"
            />
          </div>
          <p className="font-display text-lg tracking-wide text-vert-profond mt-8">
            DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.
          </p>
          <a
            href="#ecran-3"
            className="inline-block mt-8 font-sans text-xs uppercase tracking-[0.25em] text-or-mat hover:text-vert-profond transition-colors"
          >
            Découvrir notre histoire ↓
          </a>
        </Reveal>
      </section>

      {/* Écran 3 — Luciana & Ben */}
      <section id="ecran-3" className="px-6 py-24 bg-vert-sauge/10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-or-mat mb-4">
            Texte en cours de révision par Luciana
          </p>
          <div className="font-sans text-[15px] leading-relaxed text-vert-profond/80 space-y-4">
            <BlockText text={blocks.ecran_3?.contenu ?? FALLBACK.ecran_3} />
          </div>
          <div className="mt-8">
            <Verse reference="Psaume 127:1">
              Si l&apos;Éternel ne bâtit la maison…
            </Verse>
          </div>
          <a
            href="#ecran-4"
            className="inline-block mt-8 font-sans text-xs uppercase tracking-[0.25em] text-or-mat hover:text-vert-profond transition-colors"
          >
            Découvrir notre parcours ↓
          </a>
        </Reveal>
      </section>

      {/* Écran 4 — Notre Source */}
      <section id="ecran-4" className="px-6 py-24 bg-vert-profond text-ivoire">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display italic text-lg sm:text-xl leading-relaxed">
            « Ils seront comme des arbres plantés près d&apos;un cours d&apos;eau, qui étend
            ses racines vers le courant. »{" "}
            <span className="not-italic text-or-mat">— Jérémie 17:8</span>
          </p>
          <div className="font-sans text-[15px] leading-relaxed text-ivoire/85 space-y-5 mt-8">
            <BlockText
              text={blocks.ecran_4?.contenu ?? FALLBACK.ecran_4}
              labelClassName="text-or-mat"
            />
          </div>
          <p className="font-display text-lg tracking-wide mt-8">NOTRE SOURCE, C&apos;EST CHRIST.</p>
          <a
            href="#ecran-5"
            className="inline-block mt-8 font-sans text-xs uppercase tracking-[0.25em] text-or-mat hover:text-ivoire transition-colors"
          >
            Découvrir nos racines ↓
          </a>
        </Reveal>
      </section>

      {/* Écran 5 — Racines • Alliance • Promesses */}
      <section id="ecran-5" className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-3xl grid gap-10 sm:grid-cols-3 text-center">
          <Reveal>
            <h2 className="font-display text-xl text-vert-profond mb-2">Racines</h2>
            <p className="font-sans text-sm text-vert-profond/80 leading-relaxed">
              D&apos;où nous venons : foi, familles, parcours et personnes qui ont semé dans
              nos vies.
            </p>
            <p className="font-display italic text-sm text-or-mat mt-3">
              « Honorer nos racines, c&apos;est reconnaître ce qui nous a façonnés. »
            </p>
          </Reveal>
          <Reveal delayMs={150}>
            <h2 className="font-display text-xl text-vert-profond mb-2">Alliance</h2>
            <p className="font-sans text-sm text-vert-profond/80 leading-relaxed">
              Ce que nous construisons : deux histoires qui se rencontrent, deux personnes
              qui choisissent de marcher ensemble et une nouvelle maison qui prend forme.
            </p>
            <p className="font-display italic text-sm text-or-mat mt-3">
              « Deux vies. Une alliance. Une même source. »
            </p>
          </Reveal>
          <Reveal delayMs={300}>
            <h2 className="font-display text-xl text-vert-profond mb-2">Promesses</h2>
            <p className="font-sans text-sm text-vert-profond/80 leading-relaxed">
              Ce vers quoi nous avançons : avenir, foyer, fruit, transmission et héritage.
            </p>
            <p className="font-display italic text-sm text-or-mat mt-3">
              « Nous ne voulons pas seulement bâtir une maison. Nous voulons bâtir un
              héritage. »
            </p>
          </Reveal>
        </div>
        <Reveal className="mx-auto max-w-2xl text-center mt-14">
          <Verse reference="Jean 15:5">
            Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit.
          </Verse>
          <p className="font-display text-lg tracking-wide text-vert-profond mt-8">
            DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.
          </p>
          <a
            href="#ecran-6"
            className="inline-block mt-8 font-sans text-xs uppercase tracking-[0.25em] text-or-mat hover:text-vert-profond transition-colors"
          >
            Découvrir notre save the date ↓
          </a>
        </Reveal>
      </section>

      {/* Écran 6 — Save the Date */}
      <section id="ecran-6" className="px-6 py-24 bg-beige-sable/30 text-center">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-or-mat mb-3">
            Save the date
          </p>
          <SaveTheDate dateEvenement={blocks.ecran_6?.date_evenement ?? null} />
          <p className="font-display italic text-lg text-vert-profond/80 mt-2">
            Une nouvelle saison commence.
          </p>
          <div className="font-sans text-[15px] leading-relaxed text-vert-profond/85 max-w-xl mx-auto mt-6">
            <BlockText text={blocks.ecran_6?.contenu ?? FALLBACK.ecran_6} />
          </div>
          {/* Emplacement réservé pour la vidéo Save the Date (YouTube/Vimeo), en préparation par le couple. */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="font-sans text-xs uppercase tracking-widest border border-vert-profond text-vert-profond px-6 py-3 rounded-full hover:bg-vert-profond hover:text-ivoire transition-colors"
            >
              Restez à l&apos;écoute
            </button>
            <ShareSaveTheDateButton />
          </div>
        </Reveal>
      </section>

      {/* Écran 7 — Participation */}
      <section id="ecran-7" className="px-6 py-24 bg-white text-center">
        <Reveal>
          <h2 className="font-display text-3xl text-vert-profond">
            Vous faites partie de notre histoire
          </h2>
          <div className="font-sans text-[15px] leading-relaxed text-vert-profond/85 max-w-xl mx-auto mt-6">
            <BlockText text={blocks.ecran_7?.contenu ?? FALLBACK.ecran_7} />
          </div>
          <p className="font-display italic text-lg text-or-mat mt-6">
            Chacun peut semer à sa manière.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {[
            {
              titre: "Présence",
              texte: "Célébrer avec nous",
              cta: "Confirmer ma présence",
              href: "/participation#presence",
            },
            {
              titre: "Prière",
              texte: "Porter notre foyer dans la prière",
              cta: "Déposer une prière",
              href: "/participation#priere",
            },
            {
              titre: "Semence",
              texte: "Semer dans notre nouvelle saison",
              cta: "Je souhaite semer",
              href: "/participation#semence",
            },
            {
              titre: "Cadeau",
              texte: "Contribuer à notre foyer",
              cta: "Découvrir",
              href: "/participation#cadeau",
            },
          ].map((bloc, i) => (
            <Reveal key={bloc.titre} delayMs={i * 100}>
              <Link
                href={bloc.href}
                className="block rounded-lg border border-beige-sable bg-ivoire p-6 text-left hover:border-or-mat transition-colors"
              >
                <p className="font-display text-lg text-vert-profond">{bloc.titre}</p>
                <p className="font-sans text-sm text-vert-profond/75 mt-1">{bloc.texte}</p>
                <span className="inline-block font-sans text-xs uppercase tracking-widest text-or-mat mt-4">
                  {bloc.cta} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="font-display text-lg tracking-wide text-vert-profond mt-14">
          Merci de semer avec nous.
        </p>
        <p className="font-display italic text-sm text-vert-profond/70 mt-2">
          « Que chacun puisse trouver sa manière de prendre part à cette histoire. »
        </p>
      </section>
    </>
  );
}

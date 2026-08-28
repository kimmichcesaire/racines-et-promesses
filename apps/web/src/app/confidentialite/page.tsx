import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité — Racines & Promesses",
  description: "Politique de confidentialité et RGPD du site de Luciana & Ben.",
};

export default function ConfidentialitePage() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-vert-profond text-center">
          Confidentialité
        </h1>

        <div className="font-sans text-[15px] leading-relaxed text-vert-profond/90 space-y-8 mt-12">
          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">
              Qui gère ce site ?
            </h2>
            <p>
              Ce site est géré par Luciana et Ben dans le cadre de l&apos;organisation de
              leur mariage. Il a été développé par{" "}
              <span className="text-or-mat">[Nom / activité du développeur]</span>,
              responsable des aspects techniques.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">
              Quelles informations sont collectées ?
            </h2>
            <p>
              Selon les formulaires que vous utilisez sur ce site, nous pouvons collecter :
              votre nom et prénom, votre réponse de présence (RSVP), le nombre de personnes
              vous accompagnant, ainsi que, si vous le souhaitez, un message de prière ou de
              bénédiction.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">
              Pourquoi ces informations sont-elles collectées ?
            </h2>
            <p>
              Uniquement pour l&apos;organisation du mariage : gérer la liste des invités,
              préparer le jour J, et transmettre vos messages à Luciana et Ben. Aucune
              information n&apos;est utilisée à des fins commerciales, publicitaires ou
              revendue à des tiers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">
              Qui a accès à ces informations ?
            </h2>
            <p>
              Seuls Luciana et Ben ont accès aux réponses RSVP et aux messages de prière,
              qui restent strictement privés. Les messages de prière ne sont jamais publiés
              sur le site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">
              Combien de temps sont-elles conservées ?
            </h2>
            <p>
              Les informations sont conservées le temps de la préparation et de la tenue de
              l&apos;événement, puis supprimées dans un délai raisonnable après le mariage.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">
              Paiement et contribution
            </h2>
            <p>
              Ce site ne traite aucun paiement directement. Les liens de contribution
              redirigent vers des services externes (Lydia) qui appliquent leurs propres
              règles de confidentialité.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-vert-profond mb-2">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous
              pouvez demander à tout moment l&apos;accès, la correction ou la suppression
              des informations vous concernant, en écrivant à{" "}
              <span className="text-or-mat">[adresse email de contact du couple]</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

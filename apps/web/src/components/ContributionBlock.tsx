import { API_URL } from "@/lib/api";

type ParticipationLink = { type: "lydia" | "rib"; valeur: string };

async function getParticipationLinks(): Promise<ParticipationLink[]> {
  try {
    const res = await fetch(`${API_URL}/participation-links`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    // API/Supabase pas encore configurés — on affiche un état gracieux plutôt
    // que de faire planter la page.
    return [];
  }
}

export async function ContributionBlock() {
  const links = await getParticipationLinks();
  const lydia = links.find((l) => l.type === "lydia");
  const rib = links.find((l) => l.type === "rib");

  if (!lydia && !rib) {
    return (
      <p className="font-sans text-sm text-vert-profond/60 italic">
        Les informations de contribution seront disponibles très prochainement.
      </p>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {lydia && (
        <div>
          <p className="font-sans text-xs text-vert-profond/70 leading-relaxed mb-2">
            En cliquant sur ce lien, vous serez redirigé vers Lydia, un service de paiement
            externe non géré par ce site. Racines &amp; Promesses ne collecte ni ne conserve
            aucune information relative à votre contribution.
          </p>
          <a
            href={lydia.valeur}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-6 py-3 rounded-full hover:bg-or-mat transition-colors"
          >
            Contribuer via Lydia →
          </a>
        </div>
      )}
      {rib && (
        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-vert-profond/70 mb-1">
            Ou par virement
          </p>
          <p className="font-sans text-sm text-vert-profond bg-white border border-beige-sable rounded-md px-4 py-2 inline-block">
            {rib.valeur}
          </p>
        </div>
      )}
    </div>
  );
}

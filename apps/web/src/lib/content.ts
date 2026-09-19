import { API_URL } from "./api";

export type ContentBlock = {
  section: string;
  contenu: string;
  date_evenement: string | null;
};

/**
 * Textes édités depuis l'espace admin (content_blocks), par section, pour une
 * page donnée. Mis en cache 60s (`revalidate`) : une modification en admin
 * apparaît sur le site public en moins d'une minute, ce qui évite de refaire
 * un aller-retour réseau complet (et de réveiller l'API si elle était en
 * veille) à chaque navigation d'un visiteur.
 * En cas d'échec (API/Supabase indisponible), on renvoie un objet vide plutôt
 * que de faire planter la page — chaque appelant garde alors son texte de
 * repli codé en dur.
 */
export async function getContentBlocks(page: string): Promise<Record<string, ContentBlock>> {
  try {
    const res = await fetch(`${API_URL}/content-blocks?page=${encodeURIComponent(page)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const blocks: ContentBlock[] = await res.json();
    return Object.fromEntries(blocks.map((b) => [b.section, b]));
  } catch {
    return {};
  }
}

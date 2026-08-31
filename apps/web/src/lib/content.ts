import { API_URL } from "./api";

export type ContentBlock = {
  section: string;
  contenu: string;
  date_evenement: string | null;
};

/**
 * Textes édités depuis l'espace admin (content_blocks), par section, pour une
 * page donnée. `cache: "no-store"` comme pour la galerie : une modification
 * en admin doit apparaître immédiatement, pas après une fenêtre de cache.
 * En cas d'échec (API/Supabase indisponible), on renvoie un objet vide plutôt
 * que de faire planter la page — chaque appelant garde alors son texte de
 * repli codé en dur.
 */
export async function getContentBlocks(page: string): Promise<Record<string, ContentBlock>> {
  try {
    const res = await fetch(`${API_URL}/content-blocks?page=${encodeURIComponent(page)}`, {
      cache: "no-store",
    });
    if (!res.ok) return {};
    const blocks: ContentBlock[] = await res.json();
    return Object.fromEntries(blocks.map((b) => [b.section, b]));
  } catch {
    return {};
  }
}

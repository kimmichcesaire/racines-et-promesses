import { API_URL } from "@/lib/api";
import { PhotoGalleryLightbox } from "./PhotoGalleryLightbox";

type MediaItem = { id: string; url: string; type: "photo" | "video" };

async function getMedia(): Promise<MediaItem[]> {
  try {
    // Mis en cache 60s : les médias sont ajoutés/supprimés rarement, inutile
    // de refaire un aller-retour réseau à chaque navigation d'un visiteur.
    const res = await fetch(`${API_URL}/gallery-media`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    // API/Supabase pas encore configurés — on affiche un état gracieux plutôt
    // que de faire planter la page (même logique que ContributionBlock).
    return [];
  }
}

export async function PhotoGallery() {
  const media = await getMedia();

  if (media.length === 0) {
    return (
      <p className="font-sans text-sm text-vert-profond/60 italic text-center">
        Les premières photos seront bientôt ajoutées ici.
      </p>
    );
  }

  return <PhotoGalleryLightbox media={media} />;
}

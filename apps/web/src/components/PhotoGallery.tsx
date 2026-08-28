import { API_URL } from "@/lib/api";
import { PhotoGalleryLightbox } from "./PhotoGalleryLightbox";

type MediaItem = { id: string; url: string; type: "photo" | "video" };

async function getMedia(): Promise<MediaItem[]> {
  try {
    // Toujours interrogé sans cache : les médias sont ajoutés/supprimés
    // rarement mais doivent apparaître immédiatement sur le site public dès
    // qu'un changement est fait en admin (contrairement à `revalidateTag`,
    // qui ne garantit qu'une mise à jour différée en arrière-plan).
    const res = await fetch(`${API_URL}/gallery-media`, { cache: "no-store" });
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

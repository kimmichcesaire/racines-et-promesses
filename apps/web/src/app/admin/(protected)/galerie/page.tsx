"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, ApiError } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type MediaItem = {
  id: string;
  url: string;
  type: "photo" | "video";
  created_at: string;
};

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,video/mp4,video/quicktime";

export default function AdminGalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [uploadError, setUploadError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMedia = useCallback(() => {
    const token = getAdminToken();
    if (!token) return;

    fetch(`${API_URL}/gallery-media`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new ApiError("Erreur", res.status))))
      .then(setItems)
      .catch((err) => {
        if (isUnauthorized(err)) redirectToLogin(router);
      });
  }, [router]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const token = getAdminToken();
    if (!token) return;

    setUploadStatus("uploading");
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/gallery-media`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (response.status === 401) {
          redirectToLogin(router);
          return;
        }
        throw new Error(payload?.message ?? "Échec de l'envoi.");
      }

      const created: MediaItem = await response.json();
      setItems((prev) => (prev ? [created, ...prev] : [created]));
      setUploadStatus("idle");
    } catch (err) {
      setUploadStatus("error");
      setUploadError(err instanceof Error ? err.message : "Échec de l'envoi.");
    }
  }

  async function handleDelete(id: string) {
    const token = getAdminToken();
    if (!token) return;
    if (!window.confirm("Supprimer définitivement ce média ?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/gallery-media/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        redirectToLogin(router);
        return;
      }
      if (!response.ok) throw new Error();
      setItems((prev) => prev?.filter((item) => item.id !== id) ?? null);
    } catch {
      window.alert("Impossible de supprimer ce média. Merci de réessayer.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-vert-profond">Galerie photos &amp; vidéos</h1>
      <p className="font-sans text-sm text-vert-profond/70 mt-2">
        Formats acceptés : JPG, PNG, WEBP, MP4, MOV — 50 Mo maximum par fichier.
      </p>

      <div className="mt-6">
        <label
          className={`inline-block font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-6 py-3 rounded-full hover:bg-or-mat transition-colors cursor-pointer ${
            uploadStatus === "uploading" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {uploadStatus === "uploading" ? "Envoi en cours…" : "Ajouter une photo ou une vidéo"}
          <input
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={handleUpload}
            disabled={uploadStatus === "uploading"}
            className="hidden"
          />
        </label>
        {uploadStatus === "error" && (
          <p className="font-sans text-sm text-red-700 mt-3">{uploadError}</p>
        )}
      </div>

      {items && items.length === 0 && (
        <p className="font-sans text-sm text-vert-profond/60 italic mt-10">
          Aucun média pour le moment.
        </p>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-xl overflow-hidden border border-beige-sable/40 bg-white"
            >
              {item.type === "photo" ? (
                // eslint-disable-next-line @next/next/no-img-element -- médias distants du bucket Supabase, hors domaines optimisés par next/image
                <img src={item.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <video src={item.url} className="h-full w-full object-cover" muted playsInline />
              )}

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                className="absolute top-2 right-2 rounded-full bg-vert-profond/85 text-ivoire text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-60"
              >
                {deletingId === item.id ? "…" : "Supprimer"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

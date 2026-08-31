"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiDelete, apiGet } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type Prayer = {
  id: string;
  nom_complet: string;
  message: string;
  consentement_rgpd: boolean;
  created_at: string;
};

export default function AdminPrayersPage() {
  const router = useRouter();
  const [prayers, setPrayers] = useState<Prayer[] | null>(null);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    apiGet<Prayer[]>("/prayers", token)
      .then(setPrayers)
      .catch((err) => {
        if (isUnauthorized(err)) {
          redirectToLogin(router);
          return;
        }
        setError("Impossible de charger les prières.");
      });
  }, [router]);

  async function handleDelete(p: Prayer) {
    const token = getAdminToken();
    if (!token) return;
    if (!window.confirm(`Supprimer définitivement la prière de ${p.nom_complet} ?`)) return;

    setDeletingId(p.id);
    try {
      await apiDelete(`/prayers/${p.id}`, token);
      setPrayers((prev) => prev?.filter((item) => item.id !== p.id) ?? null);
    } catch (err) {
      if (isUnauthorized(err)) {
        redirectToLogin(router);
        return;
      }
      window.alert("Impossible de supprimer cette prière. Merci de réessayer.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-vert-profond">Prières reçues</h1>
      <p className="font-sans text-sm text-vert-profond/70 mt-2">
        {prayers ? `${prayers.length} prière${prayers.length > 1 ? "s" : ""}` : "Chargement…"} — strictement
        privées, jamais publiées sur le site.
      </p>

      {error && <p className="font-sans text-sm text-red-700 mt-4">{error}</p>}

      {prayers && prayers.length === 0 && (
        <p className="font-sans text-sm text-vert-profond/60 italic mt-8">
          Aucune prière pour le moment.
        </p>
      )}

      <div className="mt-8 space-y-4">
        {prayers?.map((p) => (
          <div key={p.id} className="rounded-2xl border border-beige-sable/40 bg-white px-6 py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg text-vert-profond">{p.nom_complet}</p>
              <div className="flex items-center gap-4">
                <p className="font-sans text-xs text-vert-profond/50">
                  {new Date(p.created_at).toLocaleString("fr-FR")}
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(p)}
                  disabled={deletingId === p.id}
                  className="font-sans text-xs uppercase tracking-widest text-camel hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  {deletingId === p.id ? "…" : "Supprimer"}
                </button>
              </div>
            </div>
            <p className="font-sans text-sm text-vert-profond/85 leading-relaxed mt-3 whitespace-pre-wrap">
              {p.message}
            </p>
            {!p.consentement_rgpd && (
              <p className="font-sans text-xs text-red-700 mt-3">
                Consentement RGPD manquant (ne devrait pas arriver — à vérifier).
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiDelete, apiGet } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type Genre = "H" | "F";

type RsvpResponse = {
  id: string;
  nom_complet: string;
  presence: boolean;
  nb_accompagnants: number;
  accompagnants: Genre[];
  message: string | null;
  created_at: string;
};

function genresList(accompagnants: Genre[]): string | null {
  if (!accompagnants || accompagnants.length === 0) return null;
  // Un genre par accompagnant, dans l'ordre où l'invité a coché H/F pour
  // chacun sur la page Participation.
  return accompagnants.join(", ");
}

export default function AdminRsvpPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<RsvpResponse[] | null>(null);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    apiGet<RsvpResponse[]>("/rsvp", token)
      .then(setResponses)
      .catch((err) => {
        if (isUnauthorized(err)) {
          redirectToLogin(router);
          return;
        }
        setError("Impossible de charger les réponses RSVP.");
      });
  }, [router]);

  async function handleDelete(r: RsvpResponse) {
    const token = getAdminToken();
    if (!token) return;
    if (
      !window.confirm(
        `Supprimer définitivement la réponse de ${r.nom_complet} ? Une prière envoyée sous ce même nom serait aussi supprimée automatiquement.`,
      )
    )
      return;

    setDeletingId(r.id);
    try {
      const result = await apiDelete<{ id: string; prieresSupprimees: number }>(
        `/rsvp/${r.id}`,
        token,
      );
      setResponses((prev) => prev?.filter((item) => item.id !== r.id) ?? null);
      if (result.prieresSupprimees > 0) {
        window.alert(
          `Réponse supprimée. ${result.prieresSupprimees} prière${result.prieresSupprimees > 1 ? "s" : ""} envoyée${result.prieresSupprimees > 1 ? "s" : ""} sous ce nom ${result.prieresSupprimees > 1 ? "ont" : "a"} aussi été supprimée${result.prieresSupprimees > 1 ? "s" : ""}.`,
        );
      }
    } catch (err) {
      if (isUnauthorized(err)) {
        redirectToLogin(router);
        return;
      }
      window.alert("Impossible de supprimer cette réponse. Merci de réessayer.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-vert-profond">Réponses RSVP</h1>
      <p className="font-sans text-sm text-vert-profond/70 mt-2">
        {responses ? `${responses.length} réponse${responses.length > 1 ? "s" : ""}` : "Chargement…"}
      </p>

      {error && <p className="font-sans text-sm text-red-700 mt-4">{error}</p>}

      {responses && responses.length === 0 && (
        <p className="font-sans text-sm text-vert-profond/60 italic mt-8">
          Aucune réponse pour le moment.
        </p>
      )}

      {responses && responses.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-beige-sable/40 bg-white">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-beige-sable/40 text-xs uppercase tracking-widest text-vert-profond/60">
                <th className="px-5 py-3">Nom</th>
                <th className="px-5 py-3">Présence</th>
                <th className="px-5 py-3">Accompagnants</th>
                <th className="px-5 py-3">Message</th>
                <th className="px-5 py-3">Reçu le</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {responses.map((r) => (
                <tr key={r.id} className="border-b border-beige-sable/20 last:border-0 align-top">
                  <td className="px-5 py-3 text-vert-profond">{r.nom_complet}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs ${
                        r.presence ? "bg-vert-sauge/20 text-vert-profond" : "bg-camel/15 text-camel"
                      }`}
                    >
                      {r.presence ? "Présent(e)" : "Absent(e)"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-vert-profond/80">
                    <span className="tabular-nums">{r.nb_accompagnants}</span>
                    {genresList(r.accompagnants) && (
                      <p className="text-xs text-vert-profond/60 mt-1">{genresList(r.accompagnants)}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-vert-profond/80 max-w-xs">{r.message || "—"}</td>
                  <td className="px-5 py-3 text-vert-profond/60 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("fr-FR")}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(r)}
                      disabled={deletingId === r.id}
                      className="font-sans text-xs uppercase tracking-widest text-camel hover:text-red-700 transition-colors disabled:opacity-50"
                    >
                      {deletingId === r.id ? "…" : "Supprimer"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

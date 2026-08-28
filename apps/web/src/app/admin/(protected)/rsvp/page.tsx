"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type RsvpResponse = {
  id: string;
  nom_complet: string;
  presence: boolean;
  nb_accompagnants: number;
  message: string | null;
  created_at: string;
};

export default function AdminRsvpPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<RsvpResponse[] | null>(null);
  const [error, setError] = useState("");

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
                  <td className="px-5 py-3 tabular-nums text-vert-profond/80">{r.nb_accompagnants}</td>
                  <td className="px-5 py-3 text-vert-profond/80 max-w-xs">{r.message || "—"}</td>
                  <td className="px-5 py-3 text-vert-profond/60 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString("fr-FR")}
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

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPatch } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type ParticipationLink = { type: "lydia" | "rib"; valeur: string };

export default function AdminParticipationPage() {
  const router = useRouter();
  const [lydia, setLydia] = useState("");
  const [rib, setRib] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    apiGet<ParticipationLink[]>("/participation-links", token)
      .then((links) => {
        setLydia(links.find((l) => l.type === "lydia")?.valeur ?? "");
        setRib(links.find((l) => l.type === "rib")?.valeur ?? "");
        setLoaded(true);
      })
      .catch((err) => {
        if (isUnauthorized(err)) redirectToLogin(router);
      });
  }, [router]);

  return (
    <div>
      <h1 className="font-display text-3xl text-vert-profond">Lien Lydia &amp; RIB</h1>
      <p className="font-sans text-sm text-vert-profond/70 mt-2">
        Affichés sur la page Participation, section « Semence &amp; Cadeau ».
      </p>

      {loaded && (
        <div className="mt-8 space-y-6 max-w-xl">
          <LinkEditor type="lydia" label="Lien Lydia" value={lydia} onSaved={setLydia} />
          <LinkEditor type="rib" label="RIB (texte affiché tel quel)" value={rib} onSaved={setRib} multiline />
        </div>
      )}
    </div>
  );
}

function LinkEditor({
  type,
  label,
  value,
  onSaved,
  multiline,
}: {
  type: "lydia" | "rib";
  label: string;
  value: string;
  onSaved: (value: string) => void;
  multiline?: boolean;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(value);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;

    setStatus("saving");
    try {
      const updated = await apiPatch<{ valeur: string }>(`/participation-links/${type}`, { valeur: draft }, token);
      onSaved(updated.valeur);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      if (isUnauthorized(err)) {
        redirectToLogin(router);
        return;
      }
      setStatus("error");
    }
  }

  const dirty = draft !== value;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-beige-sable/40 bg-white px-6 py-5"
    >
      <label htmlFor={type} className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          maxLength={500}
          className="mt-2 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      ) : (
        <input
          id={type}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={500}
          className="mt-2 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={!dirty || status === "saving"}
          className="font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-5 py-2.5 rounded-full hover:bg-or-mat transition-colors disabled:opacity-40"
        >
          {status === "saving" ? "Enregistrement…" : "Enregistrer"}
        </button>
        {status === "saved" && (
          <span className="font-sans text-xs text-vert-sauge">Enregistré.</span>
        )}
        {status === "error" && (
          <span className="font-sans text-xs text-red-700">Échec de l&apos;enregistrement.</span>
        )}
      </div>
    </form>
  );
}

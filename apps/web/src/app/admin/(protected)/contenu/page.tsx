"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPatch } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type ContentBlock = {
  section: string;
  contenu: string;
  editable_par_client: boolean;
  date_evenement: string | null;
  updated_at: string;
};

const PAGES = [
  { slug: "accueil", label: "Accueil" },
  { slug: "notre-histoire", label: "Notre histoire" },
  { slug: "racines-et-promesses", label: "Racines & Promesses" },
  { slug: "nos-familles", label: "Nos familles" },
  { slug: "participation", label: "Participation" },
] as const;

export default function AdminContentPage() {
  const router = useRouter();
  const [blocksByPage, setBlocksByPage] = useState<Record<string, ContentBlock[]> | null>(null);
  const [activePage, setActivePage] = useState<string>(PAGES[0].slug);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    Promise.all(
      PAGES.map((p) => apiGet<ContentBlock[]>(`/content-blocks?page=${p.slug}`, token)),
    )
      .then((results) => {
        const map: Record<string, ContentBlock[]> = {};
        PAGES.forEach((p, i) => {
          map[p.slug] = [...results[i]].sort((a, b) => a.section.localeCompare(b.section));
        });
        setBlocksByPage(map);
      })
      .catch((err) => {
        if (isUnauthorized(err)) redirectToLogin(router);
      });
  }, [router]);

  return (
    <div>
      <h1 className="font-display text-3xl text-vert-profond">Contenu du site</h1>
      <p className="font-sans text-sm text-vert-profond/70 mt-2">
        Les blocs grisés sont réservés au développeur (structure ou animation) et ne peuvent pas être modifiés ici.
      </p>

      <div className="flex flex-wrap gap-1 mt-6 border-b border-beige-sable/40">
        {PAGES.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setActivePage(p.slug)}
            className={`font-sans text-sm px-4 py-2 rounded-t-lg -mb-px border-b-2 transition-colors ${
              activePage === p.slug
                ? "border-or-mat text-vert-profond"
                : "border-transparent text-vert-profond/50 hover:text-vert-profond"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {!blocksByPage && <p className="font-sans text-sm text-vert-profond/60">Chargement…</p>}

        {blocksByPage?.[activePage]?.map((block) => (
          <ContentBlockCard
            key={`${activePage}-${block.section}`}
            page={activePage}
            block={block}
            onSaved={(updated) =>
              setBlocksByPage((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  [activePage]: prev[activePage].map((b) =>
                    b.section === block.section ? { ...b, ...updated } : b,
                  ),
                };
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

function ContentBlockCard({
  page,
  block,
  onSaved,
}: {
  page: string;
  block: ContentBlock;
  onSaved: (updated: Pick<ContentBlock, "contenu" | "date_evenement">) => void;
}) {
  const router = useRouter();
  const [contenu, setContenu] = useState(block.contenu);
  const [dateEvenement, setDateEvenement] = useState(block.date_evenement ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const showDateField = block.section === "ecran_6";
  const dirty = contenu !== block.contenu || dateEvenement !== (block.date_evenement ?? "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getAdminToken();
    if (!token) return;

    setStatus("saving");
    setErrorMessage("");
    try {
      await apiPatch(
        `/content-blocks/${page}/${block.section}`,
        { contenu, dateEvenement: dateEvenement || undefined },
        token,
      );
      onSaved({ contenu, date_evenement: dateEvenement || null });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      if (isUnauthorized(err)) {
        redirectToLogin(router);
        return;
      }
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Échec de l'enregistrement.");
    }
  }

  if (!block.editable_par_client) {
    return (
      <div className="rounded-2xl border border-beige-sable/30 bg-beige-sable/10 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs uppercase tracking-widest text-vert-profond/50">{block.section}</p>
          <span className="font-sans text-xs text-vert-profond/40 italic">Réservé au développeur</span>
        </div>
        <p className="font-sans text-sm text-vert-profond/50 mt-3 whitespace-pre-wrap line-clamp-3">
          {block.contenu}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-beige-sable/40 bg-white px-6 py-5">
      <p className="font-sans text-xs uppercase tracking-widest text-vert-profond/60">{block.section}</p>

      <textarea
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        rows={Math.min(14, Math.max(4, contenu.split("\n").length + 1))}
        maxLength={10000}
        className="mt-3 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond leading-relaxed focus:outline-none focus:ring-2 focus:ring-or-mat"
      />

      {showDateField && (
        <div className="mt-3">
          <label htmlFor="date_evenement" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
            Date du mariage (une fois connue)
          </label>
          <input
            id="date_evenement"
            type="date"
            value={dateEvenement}
            onChange={(e) => setDateEvenement(e.target.value)}
            className="mt-1 w-48 rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
          />
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={!dirty || status === "saving"}
          className="font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-5 py-2.5 rounded-full hover:bg-or-mat transition-colors disabled:opacity-40"
        >
          {status === "saving" ? "Enregistrement…" : "Enregistrer"}
        </button>
        {status === "saved" && <span className="font-sans text-xs text-vert-sauge">Enregistré.</span>}
        {status === "error" && <span className="font-sans text-xs text-red-700">{errorMessage}</span>}
      </div>
    </form>
  );
}

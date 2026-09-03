"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, apiGet, apiPatch, ApiError } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type ParticipationLink = { type: "lydia" | "rib"; valeur: string };
type ContentBlock = { section: string; contenu: string };

export default function AdminParticipationPage() {
  const router = useRouter();
  const [lydia, setLydia] = useState("");
  const [rib, setRib] = useState("");
  const [tenuePhotoUrl, setTenuePhotoUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    Promise.all([
      apiGet<ParticipationLink[]>("/participation-links", token),
      apiGet<ContentBlock[]>("/content-blocks?page=participation", token),
    ])
      .then(([links, blocks]) => {
        setLydia(links.find((l) => l.type === "lydia")?.valeur ?? "");
        setRib(links.find((l) => l.type === "rib")?.valeur ?? "");
        setTenuePhotoUrl(blocks.find((b) => b.section === "tenue_photo_url")?.contenu ?? "");
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
          <DressCodePhotoEditor value={tenuePhotoUrl} onSaved={setTenuePhotoUrl} />
        </div>
      )}
    </div>
  );
}

function DressCodePhotoEditor({
  value,
  onSaved,
}: {
  value: string;
  onSaved: (url: string) => void;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const token = getAdminToken();
    if (!token) return;

    setStatus("uploading");
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/content-blocks/participation/tenue_photo_url/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          redirectToLogin(router);
          return;
        }
        const payload = await response.json().catch(() => null);
        throw new ApiError(payload?.message ?? "Échec de l'envoi.", response.status);
      }

      const updated: ContentBlock = await response.json();
      onSaved(updated.contenu);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Échec de l'envoi.");
    }
  }

  return (
    <div className="rounded-2xl border border-beige-sable/40 bg-white px-6 py-5">
      <label htmlFor="tenue-photo" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
        Photo « Comment s&apos;habiller ? »
      </label>
      <p className="font-sans text-xs text-vert-profond/60 mt-1">
        Affichée sur la page Participation. Le texte qui l&apos;accompagne se modifie dans l&apos;onglet
        « Contenu » du site, page Participation, bloc « tenue_texte ».
      </p>

      {value && (
        // eslint-disable-next-line @next/next/no-img-element -- image distante du bucket Supabase
        <img
          src={value}
          alt="Aperçu de la tenue vestimentaire"
          className="mt-4 max-h-64 rounded-lg border border-beige-sable/40 object-contain"
        />
      )}

      <div className="mt-4">
        <label
          className={`inline-block font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-5 py-2.5 rounded-full hover:bg-or-mat transition-colors cursor-pointer ${
            status === "uploading" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {status === "uploading" ? "Envoi en cours…" : value ? "Remplacer la photo" : "Ajouter une photo"}
          <input
            type="file"
            id="tenue-photo"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={status === "uploading"}
            className="hidden"
          />
        </label>
        {status === "error" && <p className="font-sans text-sm text-red-700 mt-3">{errorMessage}</p>}
      </div>
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

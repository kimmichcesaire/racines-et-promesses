"use client";

import { FormEvent, useState } from "react";
import { apiPost, ApiError } from "@/lib/api";

type Status = "idle" | "loading" | "error" | "success";

export function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nbAccompagnants, setNbAccompagnants] = useState(0);
  // Une seule case H et une seule case F au total, chacune avec un nombre —
  // pas une paire par accompagnant : cocher H et mettre 1, cocher F et
  // mettre 2, couvre déjà un groupe mixte de 3 (1 homme, 2 femmes).
  const [hChecked, setHChecked] = useState(false);
  const [hCount, setHCount] = useState(1);
  const [fChecked, setFChecked] = useState(false);
  const [fCount, setFCount] = useState(1);

  const totalGenres = (hChecked ? hCount : 0) + (fChecked ? fCount : 0);

  function handleNbAccompagnantsChange(value: number) {
    setNbAccompagnants(Math.max(0, Math.min(20, value || 0)));
  }

  // Reconstitue un tableau ["H", "H", "F", ...] à partir des deux totaux —
  // le format attendu par l'API (un genre par accompagnant) ne change pas.
  function buildAccompagnants(): ("H" | "F")[] {
    return [
      ...Array(hChecked ? hCount : 0).fill("H" as const),
      ...Array(fChecked ? fCount : 0).fill("F" as const),
    ];
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (nbAccompagnants > 0 && totalGenres !== nbAccompagnants) {
      setStatus("error");
      setErrorMessage(
        `Le nombre d'hommes et de femmes coché (${totalGenres}) ne correspond pas au nombre d'accompagnants déclaré (${nbAccompagnants}).`,
      );
      return;
    }

    setStatus("loading");

    // Capturé avant le `await` : une fois l'événement terminé, le navigateur
    // remet `event.currentTarget` à `null` — l'utiliser après l'attente
    // provoquerait une erreur alors même que l'envoi a réussi.
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      await apiPost("/rsvp", {
        nomComplet: String(form.get("nomComplet") ?? "").trim(),
        presence: form.get("presence") === "oui",
        nbAccompagnants,
        accompagnants: buildAccompagnants(),
        message: String(form.get("message") ?? "").trim() || undefined,
      });
      setStatus("success");
      formElement.reset();
      setNbAccompagnants(0);
      setHChecked(false);
      setHCount(1);
      setFChecked(false);
      setFCount(1);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof ApiError ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <p className="font-sans text-sm text-vert-profond bg-vert-sauge/15 border border-vert-sauge/40 rounded-lg p-5">
        Merci ! Votre réponse a bien été enregistrée.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div>
        <label htmlFor="nomComplet" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
          Nom complet
        </label>
        <input
          id="nomComplet"
          name="nomComplet"
          type="text"
          required
          maxLength={120}
          className="mt-1 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      </div>

      <fieldset>
        <legend className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
          Serez-vous présent(e) ?
        </legend>
        <div className="mt-2 flex gap-6 font-sans text-sm text-vert-profond">
          <label className="flex items-center gap-2">
            <input type="radio" name="presence" value="oui" required /> Oui, avec joie
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="presence" value="non" required /> Je ne pourrai pas venir
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="nbAccompagnants" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
          Nombre d&apos;accompagnants
        </label>
        <input
          id="nbAccompagnants"
          type="number"
          min={0}
          max={20}
          value={nbAccompagnants}
          onChange={(e) => handleNbAccompagnantsChange(Number(e.target.value))}
          className="mt-1 w-24 rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      </div>

      {nbAccompagnants > 0 && (
        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
            Genre de vos accompagnants
          </p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 font-sans text-sm text-vert-profond">
                <input
                  type="checkbox"
                  checked={hChecked}
                  onChange={(e) => setHChecked(e.target.checked)}
                />
                H
              </label>
              {hChecked && (
                <input
                  type="number"
                  min={1}
                  max={nbAccompagnants}
                  value={hCount}
                  onChange={(e) => setHCount(Math.max(1, Number(e.target.value) || 1))}
                  aria-label="Nombre d'hommes accompagnants"
                  className="w-16 rounded-md border border-beige-sable bg-white px-2 py-1 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 font-sans text-sm text-vert-profond">
                <input
                  type="checkbox"
                  checked={fChecked}
                  onChange={(e) => setFChecked(e.target.checked)}
                />
                F
              </label>
              {fChecked && (
                <input
                  type="number"
                  min={1}
                  max={nbAccompagnants}
                  value={fCount}
                  onChange={(e) => setFCount(Math.max(1, Number(e.target.value) || 1))}
                  aria-label="Nombre de femmes accompagnantes"
                  className="w-16 rounded-md border border-beige-sable bg-white px-2 py-1 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
                />
              )}
            </div>
            <p className="font-sans text-xs text-vert-profond/50">
              {totalGenres} / {nbAccompagnants} accompagnant{nbAccompagnants > 1 ? "s" : ""} renseigné
              {totalGenres > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
          Message (facultatif)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={2000}
          className="mt-1 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-6 py-3 rounded-full hover:bg-or-mat transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Envoi…" : "Confirmer ma présence"}
      </button>

      <p className="font-sans text-xs text-vert-profond/60">
        En envoyant ce formulaire, j&apos;accepte que ces informations soient utilisées pour
        l&apos;organisation de l&apos;événement.
      </p>
    </form>
  );
}

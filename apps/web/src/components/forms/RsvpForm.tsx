"use client";

import { FormEvent, useState } from "react";
import { apiPost, ApiError } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

export function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);

    try {
      await apiPost("/rsvp", {
        nomComplet: String(form.get("nomComplet") ?? "").trim(),
        presence: form.get("presence") === "oui",
        nbAccompagnants: Number(form.get("nbAccompagnants") ?? 0),
        message: String(form.get("message") ?? "").trim() || undefined,
      });
      setStatus("success");
      event.currentTarget.reset();
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
          name="nbAccompagnants"
          type="number"
          min={0}
          max={20}
          defaultValue={0}
          className="mt-1 w-24 rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      </div>

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

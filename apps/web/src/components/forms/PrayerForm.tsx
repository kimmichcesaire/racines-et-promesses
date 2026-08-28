"use client";

import { FormEvent, useState } from "react";
import { apiPost, ApiError } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

export function PrayerForm() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;

    setStatus("loading");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);

    try {
      await apiPost("/prayers", {
        nom: String(form.get("nom") ?? "").trim(),
        prenom: String(form.get("prenom") ?? "").trim(),
        message: String(form.get("message") ?? "").trim(),
        consentementRgpd: consent,
        siteWeb: String(form.get("siteWeb") ?? ""), // honeypot
      });
      setStatus("success");
      event.currentTarget.reset();
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof ApiError ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <p className="font-sans text-sm text-vert-profond bg-vert-sauge/15 border border-vert-sauge/40 rounded-lg p-5">
        Merci. Votre message a été transmis à Luciana &amp; Ben, en toute confidentialité.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <p className="font-sans text-xs text-vert-profond/70 leading-relaxed bg-ivoire border border-beige-sable rounded-lg p-4">
        Les informations transmises via ce formulaire (nom, prénom, message) sont destinées
        uniquement à Luciana et Ben. Elles ne seront ni publiées sur le site, ni communiquées
        à des tiers, et seront conservées jusqu&apos;à la fin de la période de préparation du
        mariage.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="prenom" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
            Prénom
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            required
            maxLength={80}
            className="mt-1 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
          />
        </div>
        <div>
          <label htmlFor="nom" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            maxLength={80}
            className="mt-1 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
          />
        </div>
      </div>

      <div>
        <label htmlFor="prayer-message" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
          Votre prière
        </label>
        <textarea
          id="prayer-message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          className="mt-1 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />
      </div>

      {/* Piège à robots : invisible et ignoré par un visiteur humain */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="siteWeb">Site web</label>
        <input id="siteWeb" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 font-sans text-xs text-vert-profond/80">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5"
        />
        J&apos;accepte que ce message, ainsi que mon nom et prénom, soient transmis à
        Luciana et Ben dans le cadre de ce formulaire.
      </label>

      {status === "error" && (
        <p className="font-sans text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={!consent || status === "loading"}
        className="font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-6 py-3 rounded-full hover:bg-or-mat transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Envoi…" : "Déposer ma prière"}
      </button>
    </form>
  );
}

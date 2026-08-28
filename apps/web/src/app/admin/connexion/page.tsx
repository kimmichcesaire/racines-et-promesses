"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost, ApiError } from "@/lib/api";
import { getAdminToken, setAdminToken } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (getAdminToken()) router.replace("/admin");
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const { accessToken } = await apiPost<{ accessToken: string }>("/auth/login", {
        password,
      });
      setAdminToken(accessToken);
      router.replace("/admin");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof ApiError ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-beige-sable/40 bg-white px-8 py-10 shadow-sm"
      >
        <p className="font-display text-2xl text-vert-profond text-center">
          Racines &amp; Promesses
        </p>
        <p className="font-sans text-xs uppercase tracking-widest text-vert-profond/50 text-center mt-1 mb-8">
          Espace admin
        </p>

        <label htmlFor="password" className="font-sans text-xs uppercase tracking-widest text-vert-profond/70">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-beige-sable bg-white px-3 py-2 font-sans text-sm text-vert-profond focus:outline-none focus:ring-2 focus:ring-or-mat"
        />

        {status === "error" && (
          <p className="font-sans text-sm text-red-700 mt-4">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 w-full font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-6 py-3 rounded-full hover:bg-or-mat transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

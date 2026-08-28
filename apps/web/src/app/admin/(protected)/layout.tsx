"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin/AdminNav";

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/connexion");
      return;
    }
    // Le token vit dans localStorage (une donnée hors de React, non connue au
    // premier rendu serveur) : cette lecture ne peut se faire que côté client,
    // dans un effet — il n'y a pas d'équivalent "calculé pendant le rendu" ici.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router]);

  // Évite un flash de contenu protégé avant la vérification du token.
  if (!ready) return null;

  return (
    <div className="min-h-screen bg-ivoire">
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

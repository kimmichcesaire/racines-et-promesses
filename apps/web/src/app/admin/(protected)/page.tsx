"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
import { getAdminToken, isUnauthorized, redirectToLogin } from "@/lib/admin-auth";

type RsvpResponse = { presence: boolean; nb_accompagnants: number };
type Prayer = { id: string };

const SHORTCUTS = [
  {
    href: "/admin/contenu",
    label: "Contenu du site",
    description: "Modifier les textes des écrans et des pages intérieures.",
  },
  {
    href: "/admin/galerie",
    label: "Galerie photos & vidéos",
    description: "Ajouter ou supprimer les photos et vidéos du couple.",
  },
  {
    href: "/admin/rsvp",
    label: "Réponses RSVP",
    description: "Voir qui a confirmé sa présence.",
  },
  {
    href: "/admin/prieres",
    label: "Prières reçues",
    description: "Lire les prières envoyées par les invités.",
  },
  {
    href: "/admin/participation",
    label: "Lien Lydia & RIB",
    description: "Mettre à jour les informations de contribution.",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<{ present: number; absent: number; invites: number; prieres: number } | null>(
    null,
  );

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    Promise.all([
      apiGet<RsvpResponse[]>("/rsvp", token),
      apiGet<Prayer[]>("/prayers", token),
    ])
      .then(([rsvp, prayers]) => {
        const present = rsvp.filter((r) => r.presence).length;
        const absent = rsvp.filter((r) => !r.presence).length;
        const invites = rsvp
          .filter((r) => r.presence)
          .reduce((total, r) => total + 1 + (r.nb_accompagnants ?? 0), 0);
        setStats({ present, absent, invites, prieres: prayers.length });
      })
      .catch((err) => {
        if (isUnauthorized(err)) redirectToLogin(router);
      });
  }, [router]);

  return (
    <div>
      <h1 className="font-display text-3xl text-vert-profond">Tableau de bord</h1>
      <p className="font-sans text-sm text-vert-profond/70 mt-2">
        Vue d&apos;ensemble de l&apos;activité du site.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        <StatTile label="Présents confirmés" value={stats?.present} />
        <StatTile label="Absents confirmés" value={stats?.absent} />
        <StatTile label="Personnes attendues" value={stats?.invites} />
        <StatTile label="Prières reçues" value={stats?.prieres} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        {SHORTCUTS.map((shortcut) => (
          <Link
            key={shortcut.href}
            href={shortcut.href}
            className="rounded-2xl border border-beige-sable/40 bg-white px-6 py-5 hover:border-or-mat transition-colors"
          >
            <p className="font-display text-lg text-vert-profond">{shortcut.label}</p>
            <p className="font-sans text-sm text-vert-profond/70 mt-1">{shortcut.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="rounded-2xl border border-beige-sable/40 bg-white px-5 py-4">
      <p className="font-display text-3xl text-vert-profond tabular-nums">{value ?? "—"}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-vert-profond/60 mt-1">
        {label}
      </p>
    </div>
  );
}

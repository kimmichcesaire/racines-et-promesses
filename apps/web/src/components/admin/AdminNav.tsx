"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/admin-auth";

const LINKS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/contenu", label: "Contenu" },
  { href: "/admin/galerie", label: "Galerie" },
  { href: "/admin/rsvp", label: "RSVP" },
  { href: "/admin/prieres", label: "Prières" },
  { href: "/admin/participation", label: "Participation" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/connexion");
  }

  return (
    <header className="border-b border-beige-sable/40 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-xl text-vert-profond">Racines &amp; Promesses</p>
          <p className="font-sans text-[11px] uppercase tracking-widest text-vert-profond/50">
            Espace admin
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-1 font-sans text-sm">
          {LINKS.map((link) => {
            const active = link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 transition-colors ${
                  active
                    ? "bg-vert-profond text-ivoire"
                    : "text-vert-profond/70 hover:bg-vert-pale"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 rounded-full px-4 py-2 font-sans text-sm text-camel hover:bg-beige-sable/20 transition-colors"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/racines-et-promesses", label: "Racines & Promesses" },
  { href: "/nos-familles", label: "Nos familles" },
  { href: "/participation", label: "Participation" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Ferme le menu avec Échap, et si l'écran repasse en largeur desktop.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    const mq = window.matchMedia("(min-width: 640px)");
    function onResize() {
      if (mq.matches) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-vert-pale border-b border-vert-sauge/25 shadow-[0_1px_3px_rgba(62,75,54,0.08)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo/favicon-48x48.png"
            alt="Racines & Promesses — Luciana & Ben"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="font-display text-lg tracking-wide text-vert-profond hidden sm:inline">
            Racines &amp; Promesses
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden sm:block">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-[13px] uppercase tracking-wider text-vert-profond/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-or-mat transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton menu mobile — trois barres, se transforme en croix à l'ouverture */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="sm:hidden relative h-9 w-9 shrink-0 -mr-1 flex items-center justify-center"
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-vert-profond transition-all duration-300 ease-out ${
              open ? "rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-vert-profond transition-all duration-300 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-vert-profond transition-all duration-300 ease-out ${
              open ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      {/* Navigation mobile */}
      <nav
        id="mobile-nav"
        aria-label="Navigation mobile"
        className={`sm:hidden overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col border-t border-vert-sauge/25 px-5 py-3 font-sans text-sm uppercase tracking-wider text-vert-profond/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 hover:text-or-mat transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

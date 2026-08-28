import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/racines-et-promesses", label: "Racines & Promesses" },
  { href: "/participation", label: "Participation" },
  { href: "/confidentialite", label: "Confidentialité" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-vert-profond text-ivoire">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="font-display text-2xl tracking-wide">RACINES &amp; PROMESSES</p>
        <p className="font-display text-lg mt-1">LUCIANA &amp; BEN</p>
        <p className="font-sans italic text-sm text-ivoire/80 mt-4">
          « Ils seront comme des arbres plantés près d&apos;un cours d&apos;eau. » — Jérémie 17:8
        </p>
        <p className="font-sans text-sm text-ivoire/80 mt-6 leading-relaxed">
          Merci d&apos;avoir pris le temps d&apos;entrer dans notre histoire.
          <br />
          Nous avons hâte de partager cette nouvelle saison avec vous.
          <br />
          Avec amour ♡
        </p>

        <nav aria-label="Navigation de pied de page" className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-xs uppercase tracking-widest text-ivoire/70">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-or-mat transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai en ms, pour faire apparaître plusieurs blocs en cascade douce. */
  delayMs?: number;
};

/**
 * Fait apparaître son contenu en fondu léger dès qu'il entre dans le viewport
 * (cahier des charges, 7.5 : "animations au défilement, subtiles et lentes").
 * Le contenu reste dans le DOM dès le rendu serveur — seule l'opacité change,
 * donc rien ne casse le SEO ni la lecture par un lecteur d'écran.
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

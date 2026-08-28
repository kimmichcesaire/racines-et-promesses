"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type MediaItem = { id: string; url: string; type: "photo" | "video" };

export function PhotoGalleryLightbox({ media }: { media: MediaItem[] }) {
  const photos = media.filter((m) => m.type === "photo");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  function open(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }

  function close() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  function showPrevious() {
    setOpenIndex((current) => (current === null ? current : (current - 1 + photos.length) % photos.length));
  }

  function showNext() {
    setOpenIndex((current) => (current === null ? current : (current + 1) % photos.length));
  }

  useEffect(() => {
    if (openIndex === null) return;

    // Empêche le défilement de la page derrière la visionneuse — synchronisation
    // avec le DOM, hors de portée de React (pas de "setState" ici).
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- open()/close() ferment sur des refs stables, pas besoin de les lister
  }, [openIndex]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {media.map((item) =>
          item.type === "photo" ? (
            <button
              key={item.id}
              type="button"
              onClick={(event) => open(photos.indexOf(item), event.currentTarget)}
              className="group aspect-square rounded-xl overflow-hidden border border-beige-sable/30 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-or-mat"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- médias distants du bucket Supabase, hors domaines optimisés par next/image */}
              <img
                src={item.url}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ) : (
            <video
              key={item.id}
              src={item.url}
              controls
              preload="metadata"
              className="aspect-square rounded-xl overflow-hidden border border-beige-sable/30 h-full w-full object-cover"
            />
          ),
        )}
      </div>

      {openIndex !== null &&
        createPortal(
          // Rendu via un portail dans <body> : un ancêtre de la grille utilise
          // backdrop-filter (WatermarkCard), ce qui transforme cet ancêtre en
          // "containing block" pour tout descendant en position fixed — sans
          // portail, la visionneuse resterait piégée dans les limites de la
          // carte au lieu de couvrir tout l'écran.
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-vert-profond/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={close}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Photo agrandie"
              tabIndex={-1}
              className="relative max-h-full max-w-full outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- médias distants du bucket Supabase */}
              <img
                src={photos[openIndex].url}
                alt=""
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />

              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-ivoire text-vert-profond flex items-center justify-center text-xl shadow-md hover:bg-or-mat hover:text-ivoire transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-or-mat"
              >
                ×
              </button>

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Photo précédente"
                    className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-14 h-10 w-10 rounded-full bg-ivoire/90 text-vert-profond flex items-center justify-center text-xl shadow-md hover:bg-or-mat hover:text-ivoire transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-or-mat"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Photo suivante"
                    className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-14 h-10 w-10 rounded-full bg-ivoire/90 text-vert-profond flex items-center justify-center text-xl shadow-md hover:bg-or-mat hover:text-ivoire transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-or-mat"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

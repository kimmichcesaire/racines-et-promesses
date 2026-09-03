"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className: string;
};

// Version à une seule image du même principe que PhotoGalleryLightbox (sans
// navigation précédent/suivant, inutile ici) : portail dans <body> pour sortir
// du "containing block" créé par le backdrop-filter des WatermarkCard.
export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setOpen(true);
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-or-mat ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- image distante du bucket Supabase */}
        <img src={src} alt={alt} className="h-full w-full object-contain" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-vert-profond/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={close}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              tabIndex={-1}
              className="relative max-h-full max-w-full outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- image distante du bucket Supabase */}
              <img
                src={src}
                alt={alt}
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
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

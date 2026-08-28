type SaveTheDateProps = {
  /** ISO date (YYYY-MM-DD). Reste `null` tant que la date exacte n'est pas fixée. */
  dateEvenement: string | null;
};

/**
 * Cahier des charges, écran 6 : la date exacte n'est pas connue en Phase 1.
 * Ce composant affiche la période indicative tant que `dateEvenement` est vide,
 * et affichera un compte à rebours automatiquement dès qu'une date sera
 * renseignée en base — sans redéveloppement nécessaire.
 */
export function SaveTheDate({ dateEvenement }: SaveTheDateProps) {
  if (!dateEvenement) {
    return (
      <p className="font-display text-3xl sm:text-4xl tracking-wide text-vert-profond">
        SEPTEMBRE – DÉCEMBRE 2026
      </p>
    );
  }

  const target = new Date(dateEvenement);
  const formatted = target.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <p className="font-display text-3xl sm:text-4xl tracking-wide text-vert-profond">
      {formatted}
    </p>
  );
}

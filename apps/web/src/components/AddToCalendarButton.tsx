"use client";

type AddToCalendarButtonProps = {
  /** ISO date (YYYY-MM-DD). Tant que null, le bouton ne s'affiche pas. */
  dateEvenement: string | null;
};

// Génère un fichier .ics (norme iCalendar) plutôt qu'un lien "Ajouter à Google
// Agenda" : ça fonctionne nativement avec Apple Calendar, Outlook et Google
// Calendar en un seul bouton, sans devoir proposer un choix de service à
// l'invité.
function buildIcsContent(dateISO: string): string {
  const start = dateISO.replace(/-/g, "");
  const endDate = new Date(`${dateISO}T00:00:00`);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Racines et Promesses//Save the Date//FR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:racines-et-promesses-${start}@luciana-et-ben`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    "SUMMARY:Mariage de Luciana \\& Ben",
    "DESCRIPTION:Racines \\& Promesses — save the date.",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function AddToCalendarButton({ dateEvenement }: AddToCalendarButtonProps) {
  if (!dateEvenement) return null;

  function handleClick() {
    const blob = new Blob([buildIcsContent(dateEvenement as string)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mariage-luciana-et-ben.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="font-sans text-xs uppercase tracking-widest border border-vert-profond text-vert-profond px-6 py-3 rounded-full hover:bg-vert-profond hover:text-ivoire transition-colors"
    >
      Ajouter à mon calendrier
    </button>
  );
}

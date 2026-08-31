/**
 * Affiche un texte édité en admin (un bloc `content_blocks.contenu`) sous
 * forme de paragraphes. Un paragraphe qui commence par une étiquette en
 * MAJUSCULES suivie de ":" ou "—" (ex. "NOS RACINES : ...") a son étiquette
 * mise en valeur — ce même motif est utilisé dans plusieurs écrans du
 * cahier des charges (section 5).
 */
type BlockTextProps = {
  text: string;
  labelClassName?: string;
};

// Chaque paragraphe est déjà aplati sur une seule ligne (voir splitParagraphs)
// avant ce test, donc pas besoin du flag "s" (dotAll) pour "." ici.
const LABEL_PATTERN = /^([A-ZÀ-Ü0-9&' -]{2,60}?)\s*[:—]\s*(.+)$/;

function splitParagraphs(text: string): string[] {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function BlockText({ text, labelClassName }: BlockTextProps) {
  return (
    <>
      {splitParagraphs(text).map((paragraph, i) => {
        const match = paragraph.match(LABEL_PATTERN);
        if (match) {
          return (
            <p key={i}>
              <strong className={labelClassName}>{match[1]}</strong> : {match[2]}
            </p>
          );
        }
        return <p key={i}>{paragraph}</p>;
      })}
    </>
  );
}

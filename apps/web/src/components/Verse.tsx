export function Verse({ children, reference }: { children: string; reference: string }) {
  return (
    <p className="font-display italic text-lg sm:text-xl text-vert-profond/90 max-w-xl mx-auto text-center leading-relaxed">
      « {children} » <span className="not-italic text-or-mat">— {reference}</span>
    </p>
  );
}

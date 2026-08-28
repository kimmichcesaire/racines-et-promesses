type WatermarkCardProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * Panneau translucide qui garde le texte parfaitement lisible au-dessus du
 * filigrane de <PageWatermark>, quel que soit le niveau d'opacité de ce
 * dernier — les deux ne sont ainsi jamais en compétition.
 */
export function WatermarkCard({ children, className = "", id }: WatermarkCardProps) {
  return (
    <div
      id={id}
      className={`relative rounded-2xl border border-beige-sable/30 bg-ivoire/75 backdrop-blur-[2px] px-6 py-10 sm:px-12 sm:py-14 ${className}`}
    >
      {children}
    </div>
  );
}

import Image from "next/image";

/**
 * Médaillon L&B en filigrane, fixe en arrière-plan pendant que le contenu
 * défile devant lui (cahier des charges, 7.5 : animations subtiles, lentes).
 * À placer une fois en tête de chaque page qui doit en bénéficier, puis
 * envelopper le texte dans <WatermarkCard> pour garantir sa lisibilité.
 */
export function PageWatermark() {
  return (
    <div
      aria-hidden="true"
      className="watermark-logo fixed left-1/2 top-1/2 -z-10 pointer-events-none select-none"
    >
      <Image src="/logo/logo-lb-w832.png" alt="" width={520} height={780} loading="eager" />
    </div>
  );
}

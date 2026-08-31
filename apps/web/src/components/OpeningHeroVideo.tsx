/**
 * Écran 1 — animation d'ouverture (cahier des charges) : goutte d'eau → onde
 * → arbre. Fournie directement par le couple sous forme de vidéo (carré
 * 1080x1080, sans son, fond ivoire assorti à la charte) — plus besoin de la
 * reconstruire en CSS/SVG, cette vidéo remplace entièrement les tentatives
 * précédentes.
 *
 * Lecture automatique, muette, en boucle, `playsInline` pour éviter le passage
 * en plein écran sur iOS — la seule combinaison qui garantit l'autoplay sur
 * mobile sans geste de l'utilisateur.
 *
 * Purement décorative (pas de son, pas de contenu informatif propre — le
 * texte qui suit dit déjà tout) : on désactive donc l'icône native
 * "agrandir / image dans l'image" que Chrome affiche au survol de toute
 * vidéo, même sans barre de contrôle. Cette icône zoome la vidéo hors de
 * son cadre carré d'origine et la recentre mal sur un écran non carré —
 * la retirer règle le problème à la racine plutôt que de tenter de
 * rattraper le rendu de ce mode.
 */
export function OpeningHeroVideo() {
  return (
    <div className="mx-auto w-[230px] sm:w-[300px] md:w-[340px]">
      <video
        className="block aspect-square w-full object-contain object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
        aria-hidden="true"
      >
        <source src="/logo/ivory.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

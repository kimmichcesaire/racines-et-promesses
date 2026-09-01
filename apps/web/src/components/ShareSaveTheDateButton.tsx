"use client";

// Bouton "Partager le save the date" — utilise le menu de partage natif du
// téléphone quand disponible (WhatsApp, SMS, email...), avec repli sur la
// copie du lien dans le presse-papiers pour les navigateurs qui ne le
// supportent pas (essentiellement desktop).
export function ShareSaveTheDateButton() {
  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: "Racines & Promesses — Luciana & Ben",
      text: "Save the date : le mariage de Luciana & Ben approche !",
      url,
    };

    // navigator.share existe sur certains navigateurs desktop sans jamais
    // fonctionner correctement (aucune cible de partage configurée) : on ne
    // s'y fie que s'il déclare explicitement pouvoir traiter ces données.
    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return; // annulé par l'utilisateur
        // Sinon on retente via le presse-papiers ci-dessous plutôt que d'échouer en silence.
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        window.alert("Lien copié ! Vous pouvez maintenant le partager.");
        return;
      } catch {
        // On retente via la méthode de repli ci-dessous.
      }
    }

    // Dernier repli, compatible avec tout navigateur : copie via un champ
    // temporaire, ou à défaut une boîte de dialogue à copier manuellement.
    try {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      window.alert("Lien copié ! Vous pouvez maintenant le partager.");
    } catch {
      window.prompt("Copiez ce lien pour le partager :", url);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="font-sans text-xs uppercase tracking-widest bg-vert-profond text-ivoire px-6 py-3 rounded-full hover:bg-or-mat transition-colors"
    >
      Partager le save the date
    </button>
  );
}

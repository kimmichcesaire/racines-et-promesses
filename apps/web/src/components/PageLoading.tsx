// Affiché par les `loading.tsx` des pages dynamiques (server-rendered à
// chaque requête) pendant l'appel à l'API — sans ça, la navigation restait
// sans aucun retour visuel pendant l'attente, donnant l'impression d'un
// site figé.
export function PageLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-20">
      <div
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-vert-profond/20 border-t-vert-profond"
      />
      <p className="font-sans text-sm text-vert-profond/60">Un instant…</p>
    </div>
  );
}

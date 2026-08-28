import { ApiError } from "./api";

const TOKEN_KEY = "rp_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

// Le token peut expirer (12h) ou être révoqué entre deux visites : toute
// réponse 401 doit ramener vers l'écran de connexion plutôt qu'afficher une
// page cassée.
export function isUnauthorized(err: unknown): boolean {
  return err instanceof ApiError && err.status === 401;
}

// Un 401 doit toujours effacer le token avant de rediriger : sinon la page de
// connexion le retrouve encore présent, se renvoie aussitôt vers /admin, qui
// retente l'appel API, reçoit à nouveau 401... et boucle indéfiniment entre
// les deux écrans.
export function redirectToLogin(router: { replace: (href: string) => void }): void {
  clearAdminToken();
  router.replace("/admin/connexion");
}


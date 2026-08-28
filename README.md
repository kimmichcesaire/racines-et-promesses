# Racines & Promesses — Luciana & Ben

Site internet de mariage, Phase 1 (Save the Date). Voir
`CAHIER_DES_CHARGES_TECHNIQUE.md` pour le détail fonctionnel complet.

## Structure

```
mariage/
├── apps/
│   ├── web/     Next.js (frontend public + espace admin à venir)
│   └── api/     NestJS (API REST)
├── branding/    Logo L&B (source + déclinaisons favicon/web)
├── supabase/
│   └── migrations/   Schéma SQL (tables + RLS)
└── package.json Workspace racine (scripts de convenance)
```

## Démarrage

### 1. Prérequis
- Node.js 20+
- Un projet Supabase (gratuit) : https://supabase.com

### 2. Base de données
Dans le SQL Editor de votre projet Supabase, exécuter dans l'ordre :
1. `supabase/migrations/0001_init.sql` (tables + RLS)
2. `supabase/migrations/0002_seed_content.sql` (textes des 8 écrans)
3. `supabase/migrations/0003_gallery_media_storage.sql` (bucket Storage pour
   la galerie photos/vidéos)

### 3. Variables d'environnement

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Remplir dans `apps/api/.env` :
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Settings → API)
- `JWT_SECRET` (une chaîne aléatoire longue)
- `ADMIN_PASSWORD_HASH` : générer avec
  ```bash
  cd apps/api && npm run hash-password -- "le-mot-de-passe-choisi-avec-le-couple"
  ```
- `RESEND_API_KEY` / `COUPLE_NOTIFICATION_EMAIL` / `NOTIFICATION_FROM_EMAIL` :
  à renseigner une fois l'adresse de réception des prières confirmée par le
  couple (point en attente, cahier des charges section 12). Tant que ces
  variables sont vides, les prières restent enregistrées normalement — seul
  l'email de notification ne part pas.

### 4. Installation et lancement

```bash
npm install          # à la racine, installe les deux apps (workspaces npm)
npm run dev:api       # terminal 1 — http://localhost:4000
npm run dev:web       # terminal 2 — http://localhost:3000
```

## État actuel (voir la Définition de "terminé", section 14 du cahier des charges)

Fait :
- 8 écrans de l'accueil, structure et contenu (écran 3 en attente du texte
  définitif de Luciana), animation d'ouverture goutte → onde → arbre (vidéo
  fournie par le couple)
- Pages `/notre-histoire`, `/racines-et-promesses`, `/nos-familles`,
  `/confidentialite`, `/participation`
- Formulaires RSVP et prière fonctionnels, reliés à l'API, consentement RGPD
  bloquant et horodaté
- Bloc contribution (Lydia + RIB) avec mention de redirection
- Galerie photos/vidéos publique (page « Notre histoire »), avec ouverture en
  plein écran au clic
- Espace admin (JWT) : édition des textes par écran (`content_blocks`), gestion
  de la galerie (ajout/suppression photos & vidéos), consultation RSVP et
  prières, édition des liens de participation (Lydia/RIB)
- API NestJS : validation, rate-limiting, authentification admin (JWT), RLS
  Supabase
- Logo L&B intégré (favicon, header, footer, métadonnées de partage)

Reste à faire :
- Compléter `apps/api/.env` avec un vrai projet Supabase + Resend
- Renseigner les vrais liens Lydia / RIB dans `participation_links`
- Compléter les deux mentions en attente sur `/confidentialite` (nom du
  développeur, email de contact du couple)
- Contenu définitif à ajouter par le couple : photos/vidéos de la galerie
  (déjà gérable depuis l'admin), texte de `/nos-familles`, texte final de
  l'écran 3
- Nom de domaine + hébergement définitifs (Vercel + Render/Railway)

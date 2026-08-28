# Racines & Promesses — Cahier des charges technique
### Site internet de mariage — Luciana & Ben — Phase 1 (Save the Date)

> Document de spécification technique consolidé, destiné à guider le développement du site avec Claude Code. Il regroupe le cahier des charges éditorial fourni par le couple, les réponses obtenues en clarification, et les décisions techniques validées.

---

## 1. Contexte et vision

Racines & Promesses est le site internet dédié au mariage de **Luciana & Ben** (ordre des prénoms à respecter partout sur le site : Luciana en premier, Ben en second).

Le concept repose sur l'image biblique de l'arbre planté près d'un cours d'eau (Jérémie 17:8) : racines (passé, foi, familles), alliance (choix de marcher ensemble), promesses (foyer futur, héritage). Le cours d'eau représente Dieu comme Source.

**Vision centrale :** *Un amour qui prend racine en Dieu, grandit dans l'alliance et porte du fruit pour les générations.*

Le site doit raconter une histoire, pas seulement informer : progression émotionnelle voulue par le couple : calme → élégance → curiosité → émotion → foi → engagement → anticipation.

---

## 2. Périmètre du projet

### Phase 1 (objet de ce cahier des charges) — Save the Date
Construite maintenant. Couvre : identité visuelle, histoire du couple, concept, période indicative du mariage, participation.

### Phases suivantes (hors périmètre, devis complémentaire à venir)
- **Phase 2 — Préparation** : programme, lieux, infos pratiques, dress code, RSVP détaillé (dépend de la confirmation du lieu de mairie/soirée)
- **Phase 3 — Semaine du mariage** : horaires définitifs, itinéraires
- **Phase 4 — Après le mariage** : galerie photos/vidéos, témoignages, bénédictions

**Contrainte actuelle bloquant les phases 2+ :** seule la bénédiction nuptiale est confirmée à ce jour. La mairie et la soirée ne sont pas encore fixées. La date précise n'est connue qu'à la période **septembre–décembre 2026**. La page "Infos pratiques" complète et le compte à rebours précis ne sont donc **pas** à développer en Phase 1.

---

## 3. Public cible

Familles des deux côtés, amis et proches, communauté chrétienne, invités au mariage (~150 personnes attendues), visiteurs découvrant leur histoire après le mariage.

---

## 4. Arborescence du site (Phase 1)

```
/                       Accueil (8 écrans, voir section 5)
/notre-histoire         Récit chronologique détaillé
/racines-et-promesses   Approfondissement du concept
/participation          Présence, prière, semence, cadeau
/nos-familles           Présentation des familles (contenu à venir)
/confidentialite        Page RGPD (voir section 9)
```

Pages prévues mais **hors Phase 1** : `/le-jour-j`, `/infos-pratiques`, `/galerie` (dépendent d'informations non disponibles).

---

## 5. Page d'accueil — contenu des 8 écrans

### Écran 1 — Ouverture
Animation : goutte d'eau → onde → racines → tronc → branches → feuilles → arbre. Fond ivoire mat, animation lente et contemplative, **sans musique automatique** (pas de musique du tout, décision validée par le client).

Texte :
```
RACINES & PROMESSES
Luciana & Ben
« Ils seront comme des arbres plantés près d'un cours d'eau. » Jérémie 17:8

Une nouvelle saison commence.
Bienvenue dans notre histoire.

[ENTRER DANS NOTRE HISTOIRE →]
```

### Écran 2 — Le nom « Racines & Promesses »
```
Accroche : « Une histoire qui prend racine. Une alliance qui porte une promesse. »

Notre histoire ne commence pas simplement avec le jour où nous nous sommes rencontrés.
Elle est faite de tout ce qui nous a précédés, de tout ce que nous avons traversé et de
tout ce que Dieu nous a permis de devenir. Aujourd'hui, deux histoires se rejoignent pour
commencer à en écrire une nouvelle.

NOS RACINES : notre foi, nos familles, notre histoire, les personnes qui ont semé dans nos
vies et les valeurs que nous voulons porter dans notre foyer.

NOTRE ALLIANCE : le choix de marcher ensemble, de bâtir ensemble et de demeurer attachés
à la même source.

NOS PROMESSES : le foyer que nous voulons construire, les générations à venir et le fruit
que nous désirons porter.

DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.

[DÉCOUVRIR NOTRE HISTOIRE →]
```

### Écran 3 — Luciana & Ben
> **Statut : texte en cours de révision par Luciana (raccourcissement en cours).** Prévoir ce bloc comme une zone de contenu éditable (`content_blocks`, voir section 8) plutôt qu'un texte figé en dur, pour permettre une mise à jour sans redéploiement.

Structure validée à conserver : rencontre à Lille, Covid et premiers échanges, distance Nice-Reims, rôle de Dieu dans leur histoire, naissance de la soif spirituelle de Ben, décision du mariage, vision du foyer (Psaume 127:1), fruit et héritage, ce qu'ils admirent l'un chez l'autre.

Verset : *« Si l'Éternel ne bâtit la maison… » — Psaume 127:1*
Bouton : `[DÉCOUVRIR NOTRE PARCOURS →]`

### Écran 4 — Notre Source
```
Verset central : « Ils seront comme des arbres plantés près d'un cours d'eau, qui étend ses
racines vers le courant. » — Jérémie 17:8

Nous ne voulons pas seulement construire une vie ensemble. Nous voulons que l'Éternel
bâtisse notre maison. Nous voulons que notre foyer soit enraciné dans Sa Parole, conduit
par Sa présence et orienté vers Son œuvre.

UN FOYER POUR SA GLOIRE : notre mariage doit être plus qu'une union entre deux personnes :
un témoignage vivant de la grâce de Dieu sur la terre.

PORTER DU FRUIT : relation avec Dieu, amour, service, vies touchées et transmission aux
générations.

NOTRE SOURCE, C'EST CHRIST.

[DÉCOUVRIR NOS RACINES →]
```

### Écran 5 — Racines • Alliance • Promesses
```
RACINES — D'où nous venons : foi, familles, parcours et personnes qui ont semé dans nos vies.
« HONORER NOS RACINES, C'EST RECONNAÎTRE CE QUI NOUS A FAÇONNÉS. »

ALLIANCE — Ce que nous construisons : deux histoires qui se rencontrent, deux personnes qui
choisissent de marcher ensemble et une nouvelle maison qui prend forme.
« DEUX VIES. UNE ALLIANCE. UNE MÊME SOURCE. »

PROMESSES — Ce vers quoi nous avançons : avenir, foyer, fruit, transmission et héritage.
« NOUS NE VOULONS PAS SEULEMENT BÂTIR UNE MAISON. NOUS VOULONS BÂTIR UN HÉRITAGE. »

Verset complémentaire : « Celui qui demeure en moi et en qui je demeure porte beaucoup de
fruit. » — Jean 15:5

DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.

[DÉCOUVRIR NOTRE SAVE THE DATE →]
```

### Écran 6 — Save the Date
```
SAVE THE DATE
SEPTEMBRE – DÉCEMBRE 2026
UNE NOUVELLE SAISON COMMENCE.

Nous vous invitons à garder cette période libre afin de célébrer avec nous une nouvelle
étape de notre histoire. La date exacte vous sera communiquée prochainement.

[RESTEZ À L'ÉCOUTE]   [PARTAGER LE SAVE THE DATE]
```
**Note technique :** la date exacte n'étant pas connue, ne pas coder de compte à rebours pour l'instant. Prévoir un champ `date_evenement` (nullable) dans `content_blocks` ou une table dédiée, avec un composant compte à rebours conditionnel qui s'affiche automatiquement dès que la date sera renseignée en Phase 2 — pas de redéveloppement nécessaire le moment venu.

Une vidéo Save the Date est en cours de préparation par le couple et pourra être ajoutée à cet écran ultérieurement (prévoir un emplacement d'embed vidéo optionnel, ex. YouTube/Vimeo, non bloquant pour la Phase 1).

### Écran 7 — Participation
```
VOUS FAITES PARTIE DE NOTRE HISTOIRE

Une alliance ne se construit jamais seule. Derrière notre histoire se trouvent des personnes
qui ont prié, aimé, encouragé, conseillé et semé dans nos vies. Aujourd'hui, nous souhaitons
vous donner la possibilité de prendre part à cette nouvelle saison.

CHACUN PEUT SEMER À SA MANIÈRE.

PRÉSENCE : Célébrer avec nous → [Confirmer ma présence]
PRIÈRE : Porter notre foyer dans la prière → [Déposer une prière]
SEMENCE : Semer dans notre nouvelle saison → [Je souhaite semer]
CADEAU : Contribuer à notre foyer → [Découvrir]

MERCI DE SEMER AVEC NOUS.
« Que chacun puisse trouver sa manière de prendre part à cette histoire. »
```
Voir section 7 pour le détail fonctionnel de chacun de ces 4 blocs (ce sont les fonctionnalités interactives du site).

### Écran 8 — Pied de page
```
[Animation : l'arbre final apparaît près du cours d'eau, en boucle avec l'écran d'ouverture]

RACINES & PROMESSES
LUCIANA & BEN
« Ils seront comme des arbres plantés près d'un cours d'eau. » — Jérémie 17:8

Merci d'avoir pris le temps d'entrer dans notre histoire.
Nous avons hâte de partager cette nouvelle saison avec vous.
Avec amour ♡
```
Navigation du footer : Accueil · Notre histoire · Racines & Promesses · Participation · Confidentialité.
**Logo/monogramme "L&B"** affiché ici et dans le header (voir section 10 — identité visuelle).

---

## 6. Pages intérieures — Phase 1

| Page | Contenu | Statut |
|---|---|---|
| `/notre-histoire` | Récit chronologique détaillé, photos (séance photo en cours), cheminement spirituel | Texte en révision, photos à venir |
| `/racines-et-promesses` | Approfondissement du concept (développe l'écran 5) | À rédiger avec le couple |
| `/participation` | Détail des 4 blocs : présence, prière, semence, cadeau (formulaires) | Spécifié section 7 |
| `/nos-familles` | Présentation des familles | À préparer avec le couple, contenu non fourni à ce jour |

---

## 7. Fonctionnalités — décisions validées avec le client

### 7.1 RSVP (« Confirmer ma présence »)
- **Formulaire ouvert à tous les invités**, sans lien individuel ni token personnalisé (décision explicite du client — ne pas sur-ingénierer avec un système d'invitation nominative).
- Champs : nom complet, présence (oui/non), nombre d'accompagnants, message optionnel.
- Pas de compte, pas d'authentification invité.

### 7.2 Prière (« Déposer une prière »)
- **Strictement privé** : les messages ne sont jamais affichés publiquement sur le site.
- Envoyés uniquement à Luciana et Ben, avec **nom et prénom** de l'expéditeur (demande explicite du client).
- ⚠️ Donnée sensible RGPD (contenu à caractère religieux + identité). Nécessite un consentement explicite, non pré-coché (texte validé, voir section 9).
- Transmission : enregistrement en base + notification email au couple à chaque nouveau message (à confirmer : adresse email de réception).

### 7.3 Semence / Cadeau (« Je souhaite semer » / contribution)
- **Pas d'intégration de paiement en ligne.** Le client a choisi : un lien vers **Lydia** (paiement externe) + un **RIB affiché en texte**.
- Aucune donnée de paiement ne transite par le site — simplifie fortement le périmètre technique et la sécurité (pas de PCI-DSS, pas de webhook à gérer).
- Le RIB n'est pas une donnée personnelle de visiteur, donc aucune mention RGPD requise à cet endroit ; prévoir simplement la mention "vous quittez le site" avant redirection vers Lydia (texte validé, section 9).

### 7.4 Édition de contenu en autonomie
Le couple souhaite modifier lui-même certains contenus simples sans solliciter le développeur à chaque fois, mais laisse le développeur gérer tout ce qui nécessite une intervention technique. Il faut donc :
- Un espace d'administration minimal, protégé par mot de passe (pas besoin d'un système multi-utilisateur complexe).
- Un champ `editable_par_client` (booléen) sur chaque bloc de contenu pour distinguer ce qui est éditable en autonomie (textes courts, Save the Date, liens de participation) de ce qui reste géré par le développeur (structure, nouvelles pages, animations).

### 7.5 Autres fonctionnalités actives en Phase 1
- Site responsive, mobile-first (majorité du trafic attendu sur mobile via liens partagés).
- Partage du Save the Date (réseaux sociaux / lien direct).
- Animations au défilement, subtiles et lentes (cohérentes avec le ton du site).
- Pas de musique automatique, pas de lecteur audio.

### 7.6 Fonctionnalités hors Phase 1 (à ne pas développer maintenant)
- Compte à rebours précis (date non définitive).
- Carte / itinéraire (lieu non confirmé).
- Ajout au calendrier (dépend de la date définitive).
- Galerie photo/vidéo post-mariage.
- Livre d'or / bénédictions publiques.

---

## 8. Modèle de données

Base de données relationnelle (PostgreSQL via Supabase).

### `content_blocks`
| Champ | Type | Description |
|---|---|---|
| `id` | uuid, PK | |
| `page` | text | ex. `accueil`, `notre-histoire` |
| `section` | text | ex. `ecran_3`, `hero` |
| `contenu` | text | texte affiché |
| `editable_par_client` | boolean | détermine l'accès dans l'espace admin |
| `updated_at` | timestamp | |
| `updated_by` | text | trace de qui a modifié |

### `rsvp_responses`
| Champ | Type | Description |
|---|---|---|
| `id` | uuid, PK | |
| `nom_complet` | text | |
| `presence` | boolean | |
| `nb_accompagnants` | integer | |
| `message` | text, nullable | |
| `created_at` | timestamp | |

### `prayers`
| Champ | Type | Description |
|---|---|---|
| `id` | uuid, PK | |
| `nom` | text | |
| `prenom` | text | |
| `message` | text | |
| `consentement_rgpd` | boolean | doit être `true`, horodaté, avant tout enregistrement |
| `visible_publiquement` | boolean | **valeur par défaut `false`, non modifiable en Phase 1** |
| `created_at` | timestamp | |

### `participation_links`
| Champ | Type | Description |
|---|---|---|
| `id` | uuid, PK | |
| `type` | enum (`lydia`, `rib`) | |
| `valeur` | text | lien Lydia ou IBAN affiché |

### `gallery_media` *(hors Phase 1, prévoir la table mais pas l'UI)*
| Champ | Type |
|---|---|
| `id` | uuid, PK |
| `url` | text |
| `type` | enum (`photo`, `video`) |
| `phase` | enum |
| `created_at` | timestamp |

---

## 9. Textes RGPD validés (à intégrer tels quels)

**Formulaire de prière — mention d'information (au-dessus du formulaire) :**
> Les informations transmises via ce formulaire (nom, prénom, message) sont destinées uniquement à Luciana et Ben. Elles ne seront ni publiées sur le site, ni communiquées à des tiers, et seront conservées jusqu'à la fin de la période de préparation du mariage.

**Formulaire de prière — case à cocher obligatoire, non cochée par défaut :**
> J'accepte que ce message, ainsi que mon nom et prénom, soient transmis à Luciana et Ben dans le cadre de ce formulaire.

**Contrainte d'implémentation :** le bouton d'envoi doit rester désactivé tant que la case n'est pas cochée. Le champ `consentement_rgpd` doit être horodaté en base à l'envoi.

**Formulaire RSVP — mention discrète sous le bouton d'envoi :**
> En envoyant ce formulaire, j'accepte que ces informations soient utilisées pour l'organisation de l'événement.

**Lien Lydia — avant redirection :**
> En cliquant sur ce lien, vous serez redirigé vers Lydia, un service de paiement externe non géré par ce site. Racines & Promesses ne collecte ni ne conserve aucune information relative à votre contribution.

**Page `/confidentialite` (contenu complet à intégrer) :**
> **Qui gère ce site ?**
> Ce site est géré par Luciana et Ben dans le cadre de l'organisation de leur mariage. Il a été développé par [Nom / activité du développeur], responsable des aspects techniques.
>
> **Quelles informations sont collectées ?**
> Selon les formulaires que vous utilisez sur ce site, nous pouvons collecter : votre nom et prénom, votre réponse de présence (RSVP), le nombre de personnes vous accompagnant, ainsi que, si vous le souhaitez, un message de prière ou de bénédiction.
>
> **Pourquoi ces informations sont-elles collectées ?**
> Uniquement pour l'organisation du mariage : gérer la liste des invités, préparer le jour J, et transmettre vos messages à Luciana et Ben. Aucune information n'est utilisée à des fins commerciales, publicitaires ou revendue à des tiers.
>
> **Qui a accès à ces informations ?**
> Seuls Luciana et Ben ont accès aux réponses RSVP et aux messages de prière, qui restent strictement privés. Les messages de prière ne sont jamais publiés sur le site.
>
> **Combien de temps sont-elles conservées ?**
> Les informations sont conservées le temps de la préparation et de la tenue de l'événement, puis supprimées dans un délai raisonnable après le mariage.
>
> **Paiement et contribution**
> Ce site ne traite aucun paiement directement. Les liens de contribution redirigent vers des services externes (Lydia) qui appliquent leurs propres règles de confidentialité.
>
> **Vos droits**
> Conformément au Règlement Général sur la Protection des Données (RGPD), vous pouvez demander à tout moment l'accès, la correction ou la suppression des informations vous concernant, en écrivant à [adresse email de contact du couple].

Lien "Confidentialité" à placer dans le footer, présent sur toutes les pages. Pas de bandeau cookies nécessaire tant qu'aucun traceur publicitaire/analytics tiers n'est utilisé.

---

## 10. Identité visuelle

- **Palette :** blanc naturel, ivoire, beige, sable, caramel, vert sauge, vert profond, or mat, brun terre.
- **Style :** élégant, naturel, chaleureux, chrétien, intemporel.
- **Symbolique à respecter dans le design :** racines = passé, tronc = alliance, branches = avenir, feuilles = saisons, fruits = héritage, eau = Dieu/la Source.
- **Animations :** subtiles, lentes, élégantes — jamais rapides ni nombreuses.
- **Typographie :** carte blanche laissée au développeur/designer.
- **Logo / monogramme :** à concevoir — "L&B" (Luciana avant Ben), 2-3 propositions à soumettre au couple avant intégration finale.
- **Musique :** aucune, décision définitive.
- **Ordre des prénoms :** Luciana toujours avant Ben, sur l'ensemble du site, sans exception.

---

## 11. Architecture technique

```
Invité / Couple
      │
      ▼
Frontend — Next.js (hébergé Vercel)
  ├── Site public (écrans, formulaires RSVP / prière / participation)
  └── Espace admin (protégé par mot de passe, édition des content_blocks éditables)
      │
      ▼
API — NestJS
  (validation des formulaires, règles métier, sécurité de l'espace admin)
      │
      ▼
Supabase (PostgreSQL)
  content_blocks · rsvp_responses · prayers · participation_links · gallery_media
      │
      └──► Email transactionnel (notification au couple à chaque nouvelle prière)
```

### Stack retenue
- **Frontend :** Next.js (React), déploiement Vercel. Choisi pour la rapidité de chargement mobile (priorité identifiée), le rendu SEO/partage social correct, et la compatibilité avec de futures pages statiques.
- **Backend :** NestJS, exposant une API REST minimaliste (pas de paiement à intégrer réduit fortement la surface du backend).
- **Base de données :** Supabase (PostgreSQL managé), avec Row Level Security activée : accès public en écriture uniquement sur les formulaires (RSVP, prière), accès lecture/écriture complet réservé à l'espace admin authentifié.
- **Hébergement :** Vercel (frontend) + Render ou Railway (API NestJS) — à trancher selon le budget final.
- **Nom de domaine :** à acheter **au nom du couple** (propriété client), pas au nom du développeur.
- **Email transactionnel :** Resend ou équivalent, pour la notification des prières reçues.
- **Pas d'intégration de paiement** (Stripe/PSP) : décision validée, le paiement passe entièrement par Lydia (externe) et le RIB.

### Sécurité
- Espace admin : authentification simple par mot de passe (pas de gestion multi-comptes nécessaire pour deux utilisateurs).
- RLS Supabase configurée pour empêcher toute lecture publique des tables `prayers` et `rsvp_responses` — seule l'écriture (insertion) est ouverte publiquement via l'API, jamais la lecture.
- Rate-limiting sur les routes de formulaires publics (RSVP, prière) pour limiter le spam.

---

## 12. Points en attente côté client (ne bloquent pas le démarrage du développement)

| Élément | Statut | Bloque |
|---|---|---|
| Photos du couple (séance photo en cours) | À venir | Écran 3, `/notre-histoire` |
| Texte raccourci de l'écran 3 | En cours par Luciana | Écran 3 uniquement |
| Contenu page "Nos familles" | À préparer ensemble | `/nos-familles` uniquement |
| Vidéo Save the Date | En préparation par le couple | Emplacement à prévoir, non bloquant |
| Adresse email de réception des prières | À confirmer | Configuration email transactionnel |
| Lieu de mairie / soirée | Non confirmé | Phase 2 uniquement |
| Date exacte du mariage | Non confirmée (période sept-déc 2026) | Compte à rebours (Phase 2) |

Le développement de la Phase 1 peut démarrer immédiatement en parallèle de ces éléments : la structure, les formulaires, l'espace admin et 7 des 8 écrans ne dépendent d'aucun de ces points en attente.

---

## 13. Durée de vie et gouvernance

- Le site restera en ligne **1 à 2 ans** après le mariage (prévoir un hébergement avec facturation annuelle plutôt que ponctuelle).
- Le développeur reste responsable de toute évolution structurelle (nouvelles pages, Phase 2/3/4) ; le couple gère en autonomie les textes marqués `editable_par_client = true` dans l'espace admin.
- Validation éditoriale : l'un des deux membres du couple suffit pour valider un contenu avant mise en ligne (pas de double validation requise).

---

## 14. Définition de "terminé" pour la Phase 1

- [ ] Les 8 écrans de la page d'accueil sont fonctionnels et respectent l'ordre "Luciana & Ben"
- [ ] Animation d'ouverture goutte → racines → arbre implémentée, sans musique
- [ ] Pages `/notre-histoire`, `/racines-et-promesses`, `/participation`, `/nos-familles` en place (contenu provisoire accepté si texte final non livré)
- [ ] Formulaire RSVP fonctionnel, ouvert, sans authentification
- [ ] Formulaire de prière fonctionnel, privé, avec consentement RGPD bloquant et horodaté
- [ ] Bloc participation avec lien Lydia + RIB affiché, mention de redirection
- [ ] Espace admin accessible par mot de passe, permettant l'édition des `content_blocks` marqués éditables
- [ ] Page `/confidentialite` en ligne, lien présent dans le footer de toutes les pages
- [ ] Site responsive et testé sur mobile
- [ ] Nom de domaine acheté au nom du couple, hébergement en place, SSL actif
- [ ] Logo/monogramme "L&B" intégré (header + footer) après validation du couple

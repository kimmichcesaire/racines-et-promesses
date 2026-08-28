-- Racines & Promesses — schéma initial Phase 1
-- Réf. Cahier des charges technique, section 8

create extension if not exists "pgcrypto";

-- ============================================================
-- content_blocks : textes éditables par le couple ou le développeur
-- ============================================================
create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section text not null,
  contenu text not null default '',
  editable_par_client boolean not null default false,
  date_evenement date,
  updated_at timestamptz not null default now(),
  updated_by text,
  unique (page, section)
);

-- ============================================================
-- rsvp_responses : formulaire ouvert, sans authentification
-- ============================================================
create table if not exists rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  nom_complet text not null,
  presence boolean not null,
  nb_accompagnants integer not null default 0,
  message text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- prayers : strictement privé, jamais affiché publiquement
-- ============================================================
create table if not exists prayers (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenom text not null,
  message text not null,
  consentement_rgpd boolean not null default false,
  consentement_horodatage timestamptz,
  visible_publiquement boolean not null default false,
  created_at timestamptz not null default now(),
  constraint consentement_rgpd_requis check (consentement_rgpd = true)
);

-- ============================================================
-- participation_links : Lydia + RIB (aucun paiement ne transite ici)
-- ============================================================
create type participation_link_type as enum ('lydia', 'rib');

create table if not exists participation_links (
  id uuid primary key default gen_random_uuid(),
  type participation_link_type not null,
  valeur text not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- gallery_media : table prévue, UI hors Phase 1
-- ============================================================
create type gallery_media_type as enum ('photo', 'video');
create type gallery_media_phase as enum ('phase_1', 'phase_2', 'phase_3', 'phase_4');

create table if not exists gallery_media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  type gallery_media_type not null,
  phase gallery_media_phase not null default 'phase_4',
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- écriture publique uniquement sur les formulaires, jamais de lecture publique
-- sur les données personnelles (prayers, rsvp_responses).
-- L'accès admin (lecture/écriture complète) passe par la clé service_role
-- côté API NestJS, jamais par une politique "public".
-- ============================================================
alter table content_blocks enable row level security;
alter table rsvp_responses enable row level security;
alter table prayers enable row level security;
alter table participation_links enable row level security;
alter table gallery_media enable row level security;

-- content_blocks : lecture publique (contenu du site), écriture réservée à l'API admin
create policy "content_blocks lecture publique"
  on content_blocks for select
  using (true);

-- rsvp_responses : insertion publique, aucune lecture publique
create policy "rsvp insertion publique"
  on rsvp_responses for insert
  with check (true);

-- prayers : insertion publique, aucune lecture publique
create policy "prayers insertion publique"
  on prayers for insert
  with check (
    consentement_rgpd = true
  );

-- participation_links : lecture publique (lien Lydia / RIB affichés sur le site)
create policy "participation_links lecture publique"
  on participation_links for select
  using (true);

-- gallery_media : pas de politique publique en Phase 1 (table prête, UI non exposée)

-- ============================================================
-- Horodatage automatique du consentement RGPD à l'insertion
-- ============================================================
create or replace function set_consentement_horodatage()
returns trigger as $$
begin
  if new.consentement_rgpd = true and new.consentement_horodatage is null then
    new.consentement_horodatage := now();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_prayers_consentement
  before insert on prayers
  for each row execute function set_consentement_horodatage();

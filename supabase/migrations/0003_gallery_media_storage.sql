-- Racines & Promesses — stockage des photos/vidéos de la galerie
-- La table gallery_media existe depuis 0001_init.sql (UI hors Phase 1 à
-- l'origine) ; le couple souhaite désormais pouvoir gérer ses médias en
-- autonomie depuis l'espace admin.

-- Bucket Supabase Storage dédié : lecture publique (médias affichés sur le
-- site), écriture réservée au service_role (utilisé exclusivement par l'API
-- NestJS admin, jamais exposé côté client).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery',
  'gallery',
  true,
  52428800, -- 50 Mo par fichier
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime']
)
on conflict (id) do nothing;

create policy "gallery lecture publique"
  on storage.objects for select
  using (bucket_id = 'gallery');

-- Chemin de l'objet dans le bucket : nécessaire pour appeler la suppression
-- côté Storage (l'URL publique seule ne permet pas de reconstruire l'appel).
alter table gallery_media add column if not exists storage_path text not null default '';
alter table gallery_media alter column storage_path drop default;

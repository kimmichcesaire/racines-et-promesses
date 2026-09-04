-- Section "Comment s'habiller ?" sur la page Participation : une photo et un
-- court texte, éditables depuis l'admin comme les autres blocs de contenu.
insert into content_blocks (page, section, contenu, editable_par_client)
values
  ('participation', 'tenue_photo_url', '', true),
  ('participation', 'tenue_texte', 'Voici un aperçu du code vestimentaire pour notre mariage.', true)
on conflict (page, section) do nothing;

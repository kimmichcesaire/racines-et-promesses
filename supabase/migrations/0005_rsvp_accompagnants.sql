-- Racines & Promesses — genre des accompagnants sur le RSVP
-- Le couple veut connaître la répartition Hommes/Femmes de chaque groupe
-- d'invités (plan de table), pas leurs noms individuels. `nb_accompagnants`
-- reste le décompte ; `accompagnants` est un tableau JSON de "H"/"F", un par
-- accompagnant déclaré (ex. ["H", "F"]).
alter table rsvp_responses
  add column if not exists accompagnants jsonb not null default '[]'::jsonb;

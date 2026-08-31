-- Racines & Promesses — un seul champ "nom complet" pour les prières
-- Aligne le formulaire de prière sur le formulaire RSVP (un seul champ nom
-- complet plutôt que prénom/nom séparés). Les éventuelles prières déjà
-- reçues sont converties avant de retirer les anciennes colonnes.
alter table prayers add column if not exists nom_complet text;

update prayers
set nom_complet = trim(prenom || ' ' || nom)
where nom_complet is null;

alter table prayers alter column nom_complet set not null;
alter table prayers drop column if exists prenom;
alter table prayers drop column if exists nom;

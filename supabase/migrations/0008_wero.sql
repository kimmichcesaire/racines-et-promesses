-- Ajoute Wero comme second moyen de paiement, à côté de Lydia et du RIB.
-- Note : si l'exécution de tout le script d'un coup renvoie une erreur liée
-- à l'énumération, exécuter d'abord la ligne "alter type" seule, valider,
-- puis exécuter le reste (limitation Postgres sur les nouvelles valeurs
-- d'enum utilisées dans la même transaction que leur création).
alter type participation_link_type add value if not exists 'wero';

-- Pas de contrainte unique sur `type` dans ce schéma : on protège l'idempotence
-- de la migration avec un simple "where not exists" plutôt qu'un ON CONFLICT.
insert into participation_links (type, valeur)
select 'wero', ''
where not exists (select 1 from participation_links where type = 'wero');

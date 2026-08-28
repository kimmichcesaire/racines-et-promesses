-- Racines & Promesses — contenu initial de la page d'accueil (8 écrans)
-- Textes tels que validés dans le cahier des charges, section 5.
-- editable_par_client = true sur tout ce que le couple doit pouvoir modifier
-- seul depuis l'espace admin, sans repasser par le développeur.

insert into content_blocks (page, section, contenu, editable_par_client) values
('accueil', 'ecran_1', $$RACINES & PROMESSES
Luciana & Ben
« Ils seront comme des arbres plantés près d'un cours d'eau. » Jérémie 17:8

Une nouvelle saison commence.
Bienvenue dans notre histoire.$$, false),

('accueil', 'ecran_2', $$Accroche : « Une histoire qui prend racine. Une alliance qui porte une promesse. »

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

DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.$$, true),

('accueil', 'ecran_3', $$[Texte en cours de révision par Luciana — placeholder provisoire]

Structure à conserver : rencontre à Lille, Covid et premiers échanges, distance Nice-Reims,
rôle de Dieu dans leur histoire, naissance de la soif spirituelle de Ben, décision du
mariage, vision du foyer (Psaume 127:1), fruit et héritage, ce qu'ils admirent l'un chez
l'autre.

Verset : « Si l'Éternel ne bâtit la maison… » — Psaume 127:1$$, true),

('accueil', 'ecran_4', $$Verset central : « Ils seront comme des arbres plantés près d'un cours d'eau, qui étend ses
racines vers le courant. » — Jérémie 17:8

Nous ne voulons pas seulement construire une vie ensemble. Nous voulons que l'Éternel
bâtisse notre maison. Nous voulons que notre foyer soit enraciné dans Sa Parole, conduit
par Sa présence et orienté vers Son œuvre.

UN FOYER POUR SA GLOIRE : notre mariage doit être plus qu'une union entre deux personnes :
un témoignage vivant de la grâce de Dieu sur la terre.

PORTER DU FRUIT : relation avec Dieu, amour, service, vies touchées et transmission aux
générations.

NOTRE SOURCE, C'EST CHRIST.$$, true),

('accueil', 'ecran_5', $$RACINES — D'où nous venons : foi, familles, parcours et personnes qui ont semé dans nos vies.
« HONORER NOS RACINES, C'EST RECONNAÎTRE CE QUI NOUS A FAÇONNÉS. »

ALLIANCE — Ce que nous construisons : deux histoires qui se rencontrent, deux personnes qui
choisissent de marcher ensemble et une nouvelle maison qui prend forme.
« DEUX VIES. UNE ALLIANCE. UNE MÊME SOURCE. »

PROMESSES — Ce vers quoi nous avançons : avenir, foyer, fruit, transmission et héritage.
« NOUS NE VOULONS PAS SEULEMENT BÂTIR UNE MAISON. NOUS VOULONS BÂTIR UN HÉRITAGE. »

Verset complémentaire : « Celui qui demeure en moi et en qui je demeure porte beaucoup de
fruit. » — Jean 15:5

DE NOS RACINES NAÎTRA NOTRE HÉRITAGE.$$, true),

('accueil', 'ecran_6', $$SAVE THE DATE
SEPTEMBRE – DÉCEMBRE 2026
UNE NOUVELLE SAISON COMMENCE.

Nous vous invitons à garder cette période libre afin de célébrer avec nous une nouvelle
étape de notre histoire. La date exacte vous sera communiquée prochainement.$$, true),

('accueil', 'ecran_7', $$VOUS FAITES PARTIE DE NOTRE HISTOIRE

Une alliance ne se construit jamais seule. Derrière notre histoire se trouvent des personnes
qui ont prié, aimé, encouragé, conseillé et semé dans nos vies. Aujourd'hui, nous souhaitons
vous donner la possibilité de prendre part à cette nouvelle saison.

CHACUN PEUT SEMER À SA MANIÈRE.

MERCI DE SEMER AVEC NOUS.
« Que chacun puisse trouver sa manière de prendre part à cette histoire. »$$, true),

('accueil', 'ecran_8', $$RACINES & PROMESSES
LUCIANA & BEN
« Ils seront comme des arbres plantés près d'un cours d'eau. » — Jérémie 17:8

Merci d'avoir pris le temps d'entrer dans notre histoire.
Nous avons hâte de partager cette nouvelle saison avec vous.
Avec amour ♡$$, false)

on conflict (page, section) do nothing;

-- date_evenement reste NULL tant que la date exacte n'est pas connue (Phase 2)
update content_blocks set date_evenement = null where page = 'accueil' and section = 'ecran_6';

-- Pages intérieures : sections vides à compléter avec le couple
insert into content_blocks (page, section, contenu, editable_par_client) values
('notre-histoire', 'recit', '[Récit chronologique détaillé — à rédiger avec le couple]', true),
('racines-et-promesses', 'contenu', '[Approfondissement du concept — à rédiger avec le couple]', true),
('nos-familles', 'contenu', '[Présentation des familles — contenu non fourni à ce jour]', true),
('participation', 'intro', $$VOUS FAITES PARTIE DE NOTRE HISTOIRE

Une alliance ne se construit jamais seule. Derrière notre histoire se trouvent des personnes
qui ont prié, aimé, encouragé, conseillé et semé dans nos vies. Aujourd'hui, nous souhaitons
vous donner la possibilité de prendre part à cette nouvelle saison.

CHACUN PEUT SEMER À SA MANIÈRE.$$, true)
on conflict (page, section) do nothing;

-- Liens de participation : placeholders à remplacer par le couple
insert into participation_links (type, valeur) values
('lydia', 'https://lydia-app.com/collect/REMPLACER'),
('rib', 'REMPLACER — IBAN à afficher')
on conflict do nothing;

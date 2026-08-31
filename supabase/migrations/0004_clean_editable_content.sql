-- Racines & Promesses — nettoyage des content_blocks éditables
-- Les textes seedés en 0002 reprenaient tels quels les blocs du cahier des
-- charges (section 5), qui mélangent le texte réellement affiché avec des
-- annotations de rédaction ("Accroche :", "Verset :", placeholders entre
-- crochets). Ces annotations ne sont pas censées apparaître sur le site.
--
-- Cette migration ne garde, dans `contenu`, que le texte qui doit
-- effectivement s'afficher pour chaque bloc marqué `editable_par_client`.
-- Les versets, intitulés fixes et refrains répétés (ex. "DE NOS RACINES
-- NAÎTRA NOTRE HÉRITAGE.") restent gérés par le code (structure, cahier des
-- charges section 7.4) plutôt que par ces blocs.

update content_blocks set contenu = $$Notre histoire ne commence pas simplement avec le jour où nous nous sommes rencontrés. Elle est faite de tout ce qui nous a précédés, de tout ce que nous avons traversé et de tout ce que Dieu nous a permis de devenir. Aujourd'hui, deux histoires se rejoignent pour commencer à en écrire une nouvelle.

NOS RACINES : notre foi, nos familles, notre histoire, les personnes qui ont semé dans nos vies et les valeurs que nous voulons porter dans notre foyer.

NOTRE ALLIANCE : le choix de marcher ensemble, de bâtir ensemble et de demeurer attachés à la même source.

NOS PROMESSES : le foyer que nous voulons construire, les générations à venir et le fruit que nous désirons porter.$$
where page = 'accueil' and section = 'ecran_2';

update content_blocks set contenu = $$Rencontre à Lille, les premiers échanges pendant le Covid, la distance entre Nice et Reims, le rôle de Dieu dans leur histoire, la naissance de la soif spirituelle de Ben, la décision du mariage, la vision de leur foyer, le fruit et l'héritage qu'ils désirent porter, et ce qu'ils admirent l'un chez l'autre.$$
where page = 'accueil' and section = 'ecran_3';

update content_blocks set contenu = $$Nous ne voulons pas seulement construire une vie ensemble. Nous voulons que l'Éternel bâtisse notre maison. Nous voulons que notre foyer soit enraciné dans Sa Parole, conduit par Sa présence et orienté vers Son œuvre.

UN FOYER POUR SA GLOIRE : notre mariage doit être plus qu'une union entre deux personnes — un témoignage vivant de la grâce de Dieu sur la terre.

PORTER DU FRUIT : relation avec Dieu, amour, service, vies touchées et transmission aux générations.$$
where page = 'accueil' and section = 'ecran_4';

update content_blocks set contenu = $$Nous vous invitons à garder cette période libre afin de célébrer avec nous une nouvelle étape de notre histoire. La date exacte vous sera communiquée prochainement.$$
where page = 'accueil' and section = 'ecran_6';

update content_blocks set contenu = $$Une alliance ne se construit jamais seule. Derrière notre histoire se trouvent des personnes qui ont prié, aimé, encouragé, conseillé et semé dans nos vies. Aujourd'hui, nous souhaitons vous donner la possibilité de prendre part à cette nouvelle saison.$$
where page = 'accueil' and section = 'ecran_7';

update content_blocks set contenu = $$Le récit chronologique détaillé de Luciana & Ben prendra place ici : leur rencontre à Lille, la période du Covid et leurs premiers échanges, la distance entre Nice et Reims, le rôle de Dieu dans leur histoire, la naissance de la soif spirituelle de Ben, leur décision de se marier, leur vision du foyer, et le cheminement spirituel qui les a menés jusqu'ici.$$
where page = 'notre-histoire' and section = 'recit';

update content_blocks set contenu = $$Cette page présentera les familles de Luciana & Ben — un contenu qui reste à définir ensemble avant sa publication.$$
where page = 'nos-familles' and section = 'contenu';

update content_blocks set contenu = $$Une alliance ne se construit jamais seule. Aujourd'hui, nous souhaitons vous donner la possibilité de prendre part à cette nouvelle saison.$$
where page = 'participation' and section = 'intro';

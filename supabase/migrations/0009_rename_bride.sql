-- Le couple a changé le prénom de la mariée : Luciana -> Adèle (demande du
-- couple, accompagne le changement de logo A&B). Ne touche que le contenu
-- éditorial du site (content_blocks) — jamais les données saisies par les
-- invités (rsvp, prayers), qui peuvent légitimement contenir n'importe quel
-- prénom, y compris "Luciana" comme nom d'invité.
update content_blocks
set contenu = replace(contenu, 'Luciana', 'Adèle')
where contenu like '%Luciana%';

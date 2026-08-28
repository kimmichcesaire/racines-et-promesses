import { Equals, IsOptional, IsString, Length } from 'class-validator';

export class CreatePrayerDto {
  @IsString()
  @Length(1, 80)
  nom!: string;

  @IsString()
  @Length(1, 80)
  prenom!: string;

  @IsString()
  @Length(1, 3000)
  message!: string;

  // Consentement RGPD obligatoire, non pré-coché (cahier des charges, section 9).
  // Le bouton d'envoi reste désactivé côté client tant qu'il n'est pas coché ;
  // côté serveur on refuse toute insertion si la valeur n'est pas strictement true.
  @Equals(true, { message: 'Le consentement RGPD est requis.' })
  consentementRgpd!: boolean;

  // Piège à robots (honeypot) : champ invisible, laissé vide.
  @IsOptional()
  @IsString()
  siteWeb?: string;
}

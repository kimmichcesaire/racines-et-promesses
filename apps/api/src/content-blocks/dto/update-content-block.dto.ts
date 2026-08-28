import { IsISO8601, IsOptional, IsString, Length } from 'class-validator';

export class UpdateContentBlockDto {
  @IsString()
  @Length(0, 10000)
  contenu!: string;

  // Renseigné uniquement pour accueil/ecran_6, une fois la date du mariage
  // fixée (Phase 2) — voir cahier des charges, écran 6.
  @IsOptional()
  @IsISO8601()
  dateEvenement?: string;
}

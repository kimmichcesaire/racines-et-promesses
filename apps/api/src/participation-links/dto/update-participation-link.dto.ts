import { IsString, Length } from 'class-validator';

export class UpdateParticipationLinkDto {
  @IsString()
  @Length(1, 500)
  valeur!: string;
}

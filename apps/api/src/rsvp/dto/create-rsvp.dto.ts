import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreateRsvpDto {
  @IsString()
  @Length(2, 120)
  nomComplet!: string;

  @IsBoolean()
  presence!: boolean;

  @IsInt()
  @Min(0)
  @Max(20)
  nbAccompagnants!: number;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  message?: string;
}

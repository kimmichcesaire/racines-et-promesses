import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
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

  // Genre de chaque accompagnant ("H" ou "F"), un par accompagnant déclaré —
  // le couple veut connaître la répartition, pas les noms individuels.
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsIn(['H', 'F'], { each: true })
  accompagnants?: ('H' | 'F')[];

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  message?: string;
}

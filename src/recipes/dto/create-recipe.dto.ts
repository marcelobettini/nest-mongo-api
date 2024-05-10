import {
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
  ValidateNested,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class IngredientDto {
  @IsString()
  quantity: string;

  @IsString()
  ingredient: string;
}

export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  instructions: string[];

  @IsInt()
  @Min(0)
  time: number; // Duración en minutos
}

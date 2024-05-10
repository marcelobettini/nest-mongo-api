import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

export interface Ingredient {
  quantity: string;
  ingredient: string;
}

@Schema()
export class Recipe {
  @Prop({ required: true, index: true }) //index to speed up search, it has a cost
  name: string;

  @Prop({ required: true })
  ingredients: Ingredient[];

  @Prop({ required: true })
  instructions: string[];

  @Prop({ required: true })
  time: number; // Duración en minutos
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

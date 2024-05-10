import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

export interface Ingredient {
  quantity: string;
  ingredient: string;
}

@Schema()
export class Recipe {
  //{index: true} to speed up search, although it comes with a cost,
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ required: true })
  ingredients: Ingredient[];

  @Prop({ required: true })
  instructions: string[];

  @Prop({ required: true })
  time: number; // Duración en minutos
}

//dont want to see versionKey and _id must print as id
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
RecipeSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toHexString(); //*note...
    delete ret._id;
    delete ret.__v;
  },
});

/*note:
 when you access the _id field directly, it's represented as an instance of ObjectId, which has a toHexString() method for converting it to a hexadecimal string. However, when you assign _id to another field (such as id), Mongoose automatically converts it to a string representation, including the hexadecimal format, without the need to call toHexString() explicitly.

*/

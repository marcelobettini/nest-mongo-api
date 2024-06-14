import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './schemas/recipe.schema';
import idValidate from 'src/utils/idValidate';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    try {
      const createdRecipe = new this.recipeModel(createRecipeDto);
      return await createdRecipe.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().exec();
    if (!recipes.length) throw new NotFoundException('No recipes found');
    return recipes;
  }

  async findOne(id: string): Promise<Recipe> {
    // Validate ID format
    idValidate(id);
    const recipe = await this.recipeModel.findById(id).exec();
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }
  async findByName(name: string): Promise<Recipe[]> {
    let query = this.recipeModel.find();
    query = query.find({ name: { $regex: new RegExp(name, 'i') } });
    const result = await query.exec();
    if (!result) throw new NotFoundException('No recipes match that criteria');
    return result;
  }
  async findByMaxTime(time: number): Promise<Recipe[]> {
    let query = this.recipeModel.find();
    query = query.find({ time: { $lte: time } });
    const result = await query.exec();
    if (!result) throw new NotFoundException('No recipes match that criteria');
    return result;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    idValidate(id);
    return await this.recipeModel
      .findByIdAndUpdate(id, updateRecipeDto, { new: true })
      .exec();
  }
  /* 
  1. findByIdAndUpdate() is a Mongoose method that finds a document by its _id and updates it with the specified properties.
  2. id: The _id of the document you want to update.
  3. updateRecipeDto: The data you want to update. It should match the structure of your Mongoose schema.
  4. { new: true }: This option ensures that the updated document is returned after the update operation. */

  async remove(id: string) {
    idValidate(id);
    const deleted = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Cannot delete. No Recipe with id ${id}.`);
    }
  }
}

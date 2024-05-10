import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './schemas/recipe.schema';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    try {
      const createdRecipe = new this.recipeModel(createRecipeDto);
      return createdRecipe.save();
    } catch (error) {
      console.error('Error while creating recipe:', error);
      throw new InternalServerErrorException('Failed to create recipe');
    }
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().exec();
    if (!recipes.length) throw new NotFoundException('No recipes found');
    return recipes;
  }

  async findOne(id: string): Promise<Recipe> {
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
    const recipe = await this.recipeModel.findById(id).exec();
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }
  async findByName(name: string, time?: number): Promise<Recipe[]> {
    let query = this.recipeModel.find();
    if (name) {
      query = query.find({ name: { $regex: new RegExp(name, 'i') } });
    }

    if (time) {
      query = query.find({ time: { $lte: time } });
    }
    const result = await query.exec();
    console.log(result);
    if (!result) throw new NotFoundException('No recipes match that criteria');
    return result;
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeModel
      .findByIdAndUpdate(id, UpdateRecipeDto, { new: true })
      .exec();
  }
  /* 
  1. findByIdAndUpdate() is a Mongoose method that finds a document by its _id and updates it with the specified properties.
  2. id: The _id of the document you want to update.
  3. updateRecipeDto: The data you want to update. It should match the structure of your Mongoose schema.
  4. { new: true }: This option ensures that the updated document is returned after the update operation. */

  async remove(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deleted = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Cannot delete. No Recipe with id ${id}.`);
    }
  }
}

import { MongoClient } from "mongodb";
import 'dotenv/config'

const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri);

export async function getRecipes(ingredients){
  const database =  client.db('projectDB');
  const recipes =  database.collection('recipes');
  const query = { ingredients: { $in: ingredients } };
  const recipe = await recipes.find(query).toArray();
  return recipe;
}

export async function getIngredients(){
  const database =  client.db('projectDB');
  const ingredients =  database.collection('ingredients');
  const ingredient = await ingredients.find().toArray();
  return ingredient;
}
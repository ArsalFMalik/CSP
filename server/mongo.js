import { MongoClient } from "mongodb";
import 'dotenv/config'

// Replace the uri string with your connection string.
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

async function run() {
  try {
    const ingredientIds = ["003265a9-85eb-43f9-b38e-5e2127858575","d6d87815-82dd-4d82-b465-5d3f159b5574"]; 
    await getRecipes(ingredientIds)
    console.log(await getIngredients())
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
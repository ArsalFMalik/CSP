const { MongoClient } = require("mongodb");
const dotenv = require('dotenv')

dotenv.config()

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('projectDB');
    const recipes = database.collection('recipes');

    // Query for a movie that has the title 'Back to the Future'
    const query = {ingredients:{$in:["003265a9-85eb-43f9-b38e-5e2127858575","d6d87815-82dd-4d82-b465-5d3f159b5574"]}};
    const recipe = await reci.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
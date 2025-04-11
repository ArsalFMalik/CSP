import express from 'express';
import { getIngredients, getRecipes } from "./mongo.js";
// const mongoClient = require('mongodb');

const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// console.log(mongoClient)

app.get("/ingredients", async (req, res) => {

    try{
       const result = await getIngredients();
       console.log(result)

    //    if(!result){
    //     console.log("welosing")
    //     throw new Error()
    //    }

       console.log("bruh")
       res.status(200).json(result);

      
    }
    catch{
        res.status(404).json("Failed to fetch ingredients");
    }
})

app.get("/recipes", async (req, res) => {

    const ingredients = req.body;

    try{
       const result = await getRecipes(ingredients);

       if(!result){
        throw new Error()
       }

       res.status(200).json(result);
    }
    catch{
        res.status(404).json("Failed to fetch recipes");
    }
  
})


app.listen(3000)
console.log("Server started on port 3000")
import express from 'express';
import { getIngredients, getRecipes } from "./mongo.js";
import cors from "cors";

const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true , limit: '50mb'}))
app.use(cors({
   origin: "http://localhost:5173", 
}))

app.get("/ingredients", async (req, res) => {

    try{
       const result = await getIngredients();
    
       if(!result){
        throw new Error()
       }
    
       res.status(200).json(result);
      
    }
    catch{
        res.status(404).json("Failed to fetch ingredients");
    }
})

app.post("/recipes", async (req, res) => {

    const ingredients = req.body.ingredients;

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


app.listen(process.env.PORT || 8000, () => {
    console.log("Server started on port 8000")
})
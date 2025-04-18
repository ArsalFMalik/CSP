import { MultiSelect } from "@/components/ui/MultiSelect"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { getIngredients, getRecipes, Recipe } from "./api/queries"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { RecipeList } from "./components/recipe-list"

type Items = {
  label: string;
  value: string;
}

function App() {
  const [ ingredients, setIngredients ] = useState<Items[]>([]);
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ selectedIngredients, setSelectedIngredients ] = useState<string[]>([]);


  const mapIngredients = (ingredients: any) => {
    return ingredients.map((ingredient: any) => {
      return {
        value: ingredient.id,
        label: ingredient.name,
      }
    }
  )
  }

   function sortRecipesByMatchCount(recipes: Recipe[], selectedIngredients: string[]): Recipe[] {
    const selectedSet = new Set(selectedIngredients);
  
    return recipes
      .map((recipe) => {
        const matchCount = recipe.ingredients.filter((id) => selectedSet.has(id)).length;
        return { recipe, matchCount };
      })
      .sort((a, b) => b.matchCount - a.matchCount)
      .map(({ recipe }) => recipe);
  }

  const fetchRecipes = async () => {
    try {
      console.log("Selected Ingredients:", selectedIngredients);
      const response = await getRecipes(selectedIngredients);
      const sortedRecipes = sortRecipesByMatchCount(response, selectedIngredients);
      setRecipes(sortedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }

    

    console.log(recipes)
  };

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["ingredients"],
  queryFn: getIngredients,
});

useEffect(() => {
  if (data) {
    const mapped = mapIngredients(data);
    setIngredients(mapped);
  }
}, [data]);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center">Smart Recipe Finder</h1>
        <ModeToggle />
        <MultiSelect items={ingredients} selected={selectedIngredients} setSelected={setSelectedIngredients}/>     
        <Button className="cursor-pointer" onClick={() => fetchRecipes()}>Search</Button>  
        {recipes.length > 0 && (
          <RecipeList recipes={recipes} ingredientsLookup={ingredients} />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App

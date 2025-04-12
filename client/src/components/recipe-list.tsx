import { useState, useMemo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "./ui/card";

type Recipe = {
  name: string;
  description: string;
  ingredients: string[];
  picture: string;
};

type Ingredient = {
  label: string;
  value: string;
};

type RecipeListProps = {
  recipes: Recipe[];
  ingredientsLookup: Ingredient[];
};

export function RecipeList({ recipes, ingredientsLookup }: RecipeListProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const ingredientMap = useMemo(() => {
    return new Map(ingredientsLookup.map((ing) => [ing.value, ing.label]));
  }, [ingredientsLookup]);

  const getIngredientNames = (ingredientIds: string[]) => {
    return ingredientIds.map((id) => ingredientMap.get(id) || "Unknown Ingredient");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Dialog key={recipe.name} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
          <DialogTrigger asChild>
            <Card
              onClick={() => setSelectedRecipe(recipe)}
              className="p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-muted transition rounded-lg"
            >
              <img
                src={recipe.picture}
                alt={recipe.name}
                className="w-72 h-72 object-cover rounded-md"
              />
              <p className="text-center text-lg font-semibold">{recipe.name}</p>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedRecipe?.name}</DialogTitle>
              <DialogDescription className="mt-2">
                {selectedRecipe?.description}
              </DialogDescription>
            </DialogHeader>

            {selectedRecipe && (
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-semibold mb-1">Ingredients:</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {getIngredientNames(selectedRecipe.ingredients).map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

import { MultiSelect } from "@/components/ui/MultiSelect"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { getIngredients } from "./api/queries"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

type Items = {
  label: string;
  value: string;
}

function App() {
  const [ ingredients, setIngredients ] = useState<Items[]>([]);
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

//   const items = [
//   { value: "react", label: "React" },
//   { value: "vue", label: "Vue" },
//   { value: "svelte", label: "Svelte" },
//   { value: "angular", label: "Angular" },
//   { value: "nextjs", label: "Next.js" },
//   { value: "nuxt", label: "Nuxt" },
//   { value: "solid", label: "SolidJS" },
//   { value: "ember", label: "Ember.js" },
//   // Add more as needed
// ]

// useEffect(() => {
//   const fetchIngredients = async () => {
//     try {
//       const response = await getIngredients();
//       const data = mapIngredients(response);
//       setIngredients(data);
//     } catch (error) {
//       console.error("Error fetching ingredients:", error);
//     }
//   };
//   fetchIngredients();
//   console.log(ingredients)
// })

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["ingredients"],
  queryFn: getIngredients,
});

useEffect(() => {
  if (data) {
    const mapped = mapIngredients(data);
    setIngredients(mapped);
  }
  console.log(ingredients)
}, [data]);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center p-4">
        <ModeToggle />
        <MultiSelect items={ingredients}  />
      </div>
    </ThemeProvider>
  )
}

export default App

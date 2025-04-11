import { useState } from "react"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

type Items = {
  value: string
  label: string
}

type Props = {
  items: Items[],
  selectedIngredients?: string[],
  setSelectedIngredients?: (ingredients: string[]) => void
}

// const items = [
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

export function MultiSelect( { items, selectedIngredients, setSelectedIngredients } : Props) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const removeItem = (value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value))
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      {/* Selected Badges */}
      <div className="flex flex-wrap gap-2">
            {selected.length === 0 ? (
                <span className="text-muted-foreground">No items selected</span>
            ) : (
                selected.map((value) => {
                    const item = items.find((i) => i.value === value)
                    return (
                        <Badge
                            key={value}
                            variant="secondary"
                            className="flex items-center gap-1 pr-1"
                        >
                        {item?.label}
                        <button
                            type="button"
                            onClick={(e) => {
                            e.stopPropagation()
                            removeItem(value)
                            }}
                            className="ml-1 rounded-sm hover:bg-muted p-0.5"
                        >
                        <X className="h-3 w-3" />
                        </button>
                        </Badge>
                    )
                })
            )}
        </div>


      {/* Searchable Command Grid */}
      <Command className="border rounded-md">
        <CommandInput placeholder="Search items..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2">
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleItem(item.value)}
                  className="cursor-pointer flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(item.value)}
                    readOnly
                    className="mr-2"
                  />
                  {item.label}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

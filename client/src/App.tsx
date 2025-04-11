import { MultiSelect } from "@/components/ui/MultiSelect"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center p-4">
        <ModeToggle />
        <MultiSelect />
      </div>
    </ThemeProvider>
  )
}

export default App

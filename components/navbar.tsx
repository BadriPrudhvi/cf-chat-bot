import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-5xl mx-auto flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold">WorkersAI Chat Assistant</h2>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

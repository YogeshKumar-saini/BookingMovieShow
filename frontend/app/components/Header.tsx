import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-semibold">My App</h1>
      <ThemeToggle />
    </header>
  )
}

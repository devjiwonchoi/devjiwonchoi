import Link from "next/link";
import { ThemeToggleDropdown } from "./theme-toggle-dropdown";
import { Button } from "./ui/button";
import { GithubIcon } from "./icons/github";

export function Header() {
  return (
    <header className="my-4 flex justify-between">
      <div className="flex w-fit flex-col">
        <Link href="/" title="home">
          <span className="text-2xl font-bold">Jiwon Choi</span>
        </Link>
      </div>
      <div className="flex items-center space-x-1">
        {/* GitHub */}
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Link
            href="https://github.com/devjiwonchoi"
            target="_blank"
            aria-label="Jiwon Choi's GitHub Profile"
          >
            <GithubIcon className="h-4 w-4" fill="currentColor" />
          </Link>
        </Button>
        <ThemeToggleDropdown />
      </div>
    </header>
  );
}

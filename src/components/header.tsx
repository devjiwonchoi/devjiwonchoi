import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="my-4 flex justify-between">
      <div className="flex w-fit flex-col">
        <Link href="/" title="home">
          <span className="text-2xl font-bold">Jiwon Choi</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {/* GitHub */}
        <Link
          href="https://github.com/devjiwonchoi"
          target="_blank"
          aria-label="Jiwon Choi's GitHub Profile"
          className="inline-block"
        >
          <Image
            src="/github.svg"
            width={24}
            height={24}
            alt="GitHub Logo"
            className="invert-100 dark:invert-0"
          />
        </Link>
      </div>
    </header>
  );
}

import Link from 'next/link'

export function Header() {
  return (
    <header className="my-4 md:my-10">
      <Link href="/" className="flex w-fit flex-col" title="link back to home">
        <span className="text-2xl font-bold">Jiwon Choi</span>
        <span className="text-neutral-200">software engineer</span>
        <span className="text-black">{'// '}TODO: Uncomment below:</span>
        <span className="text-black">{'// '}engineer ▲ Vercel</span>
      </Link>
    </header>
  )
}

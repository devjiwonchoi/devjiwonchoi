import Link from 'next/link'

export default function NotFound() {
  return (
    <Link href="/" className="underline">
      404 Not Found: Return Home
    </Link>
  )
}

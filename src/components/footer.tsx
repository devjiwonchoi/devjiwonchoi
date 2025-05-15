export async function Footer() {
  'use cache'
  const thisYear = new Date().getUTCFullYear()
  return (
    <footer className="flex items-center justify-between">
      <div className="text-neutral-400 text-sm tracking-tight">
        © {thisYear} devjiwonchoi
      </div>
    </footer>
  )
}

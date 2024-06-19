export function Footer() {
  const thisYear = new Date().getUTCFullYear()
  return (
    <footer className="flex items-center justify-between">
      <div className="text-sm tracking-tight text-neutral-400">
        © {thisYear} devjiwonchoi
      </div>
    </footer>
  )
}

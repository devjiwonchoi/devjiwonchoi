export function Footer() {
  const thisYear = new Date().getUTCFullYear()
  return (
    <footer className="p-6">
      <div className="text-sm tracking-tight text-neutral-400 sm:text-sm">
        © {thisYear} devjiwonchoi
      </div>
    </footer>
  )
}

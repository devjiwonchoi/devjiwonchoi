export async function Footer() {
  "use cache";
  const thisYear = new Date().getUTCFullYear();
  return (
    <footer className="flex items-center justify-between">
      <div className="text-xs tracking-tight text-neutral-400">
        © {thisYear} devjiwonchoi
      </div>
    </footer>
  );
}

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-auto flex py-10">
      <main className="min-w-full">{children}</main>
    </div>
  )
}

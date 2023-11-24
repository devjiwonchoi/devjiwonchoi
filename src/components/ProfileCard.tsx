import Image from 'next/image'

export function ProfileCard() {
  return (
    <section className="flex flex-col items-center p-6">
      <Image
        src="/me-logo.svg"
        alt="devjiwonchoi Logo"
        width={0}
        height={0}
        className="h-20 w-20"
      />
      <h1 className="mb-4 text-4xl font-bold text-neutral-50 sm:text-4xl">
        Jiwon Choi
      </h1>
      <p className="uppercase tracking-widest text-neutral-50">
        DevOps / Software
      </p>
    </section>
  )
}

import Image from 'next/image'

export function ProfileCard() {
  return (
    <section className="p-6 flex flex-col items-center">
      <Image
        src="/me-logo.svg"
        alt="devjiwonchoi Logo"
        width={0}
        height={0}
        className="w-20 h-20"
      />
      <h1 className="text-neutral-50 text-4xl font-bold mb-4 sm:text-4xl">
        Jiwon Choi
      </h1>
      <p className="text-neutral-50 tracking-widest uppercase">
        DevOps Developer
      </p>
    </section>
  )
}

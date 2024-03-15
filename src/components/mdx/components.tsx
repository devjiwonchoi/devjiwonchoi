import Link from 'next/link'
import Image from 'next/image'
import { GeistMono } from 'geist/font/mono'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'

export const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-2 text-base text-neutral-100 sm:text-base">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-neutral-50">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 text-base text-neutral-100 sm:text-base">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <Link
      className="underline hover:text-neutral-50"
      href={href as string}
      target="_blank"
    >
      {children}
    </Link>
  ),
  code: ({ children }) => (
    <code
      className={`${GeistMono.variable} rounded bg-neutral-700 px-1 py-1 text-xs font-medium text-neutral-100`}
    >
      {children}
    </code>
  ),
  img: ({ src, alt }) => (
    // TODO: alter image, set width and height
    <Image src={src as string} alt={alt as string} width={600} height={400} />
  ),
}

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}

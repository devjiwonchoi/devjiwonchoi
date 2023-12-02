import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { GeistMono } from 'geist/font/mono'

export const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl">
      {props.children}
    </h3>
  ),
  p: (props) => (
    <p className="mb-2 text-base text-neutral-100 sm:text-base">
      {props.children}
    </p>
  ),
  strong: (props) => (
    <strong className="text-neutral-50">{props.children}</strong>
  ),
  blockquote: (props) => (
    <blockquote className="mb-4 text-base text-neutral-100 sm:text-base">
      {props.children}
    </blockquote>
  ),
  a: (props) => (
    <Link
      className="underline hover:text-neutral-50"
      href={props.href as string}
      target="_blank"
    >
      {props.children}
    </Link>
  ),
  code: (props) => (
    <code
      className={`${GeistMono.variable}   rounded bg-neutral-700 px-1 py-1 text-xs font-medium text-neutral-100`}
    >
      {props.children}
    </code>
  ),
}

import type { Route } from 'next'
import type { MDXComponents } from 'mdx/types'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GeistMono } from 'geist/font/mono'
import { MDXRemote } from 'remote-mdx/rsc'
import { highlight } from 'sugar-high'

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link {...props} href={href as Route}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: { alt: string; src: string }) {
  return <Image {...props} alt={props.alt} className="rounded-lg" />
}

function Callout(props: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  )
}

function Code({ children, ...props }: { children: string }) {
  const codeHTML = highlight(children)
  return (
    <code
      {...props}
      className={`${GeistMono.className}`}
      dangerouslySetInnerHTML={{ __html: codeHTML }}
    />
  )
}

function Pre({ children, ...props }: { children: React.ReactNode }) {
  return (
    <pre {...props} className={`${GeistMono.className}`}>
      {children}
    </pre>
  )
}

function slugify(str: string | number) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}` // Add display name to the component

  return Heading
}

const components = {
  // h1: createHeading(1),
  h1: () => {
    throw new Error('Use the frontmatter title instead.')
  },
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  code: Code,
  pre: Pre,
  Table,
} as MDXComponents

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}

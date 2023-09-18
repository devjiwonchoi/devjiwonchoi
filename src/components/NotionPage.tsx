'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
)
export default function NotionPage({ recordMap }: { recordMap: any }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{ Code, Collection, nextImage: Image, nextLink: Link }}
    />
  )
}

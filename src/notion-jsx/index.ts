import { createElement } from 'react'
import { type ReactNode, type ReactHTML } from 'react'

function parseBlockType(blockType: string) {
  switch (blockType) {
    case 'heading_1':
      return 'h1'
    case 'heading_2':
      return 'h2'
    case 'heading_3':
      return 'h3'
    case 'paragraph':
      return 'p'
  }
}

function parseBlockContent(blockContent: any) {
  // TODO: get text.content & text.link maybe? Or just plain_text and href
  const content = blockContent.rich_text[0]?.plain_text
  return content
}

function initResults(pageData: any) {
  const { results } = pageData
  const test = results.map((block: any) => {
    const blockType = parseBlockType(block.type)
    const blockContent = parseBlockContent(block[block.type])
    if (blockType && blockContent) {
      return {
        type: blockType,
        content: blockContent,
      }
    }
    return null
  })
  return test.filter(Boolean)
}

function renderElement({
  type,
  props,
  children,
}: {
  type: keyof ReactHTML
  props?: any
  children: ReactNode[]
}) {
  return createElement(type, props, children)
}

export function renderPage(pageData: any) {
  const results = initResults(pageData)
  const page = results.map((block: any) => {
    return renderElement({
      type: block.type,
      children: block.content,
    })
  })
  return page
}

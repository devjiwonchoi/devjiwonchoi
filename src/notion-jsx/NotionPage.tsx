import { renderPage } from '@/notion-jsx'

type NotionPageProps = {
  pageData: any
}

export default function NotionPage({ pageData }: NotionPageProps) {
  return renderPage(pageData)
}

import { Client } from '@notionhq/client'

export const NOTION_BLOG_PAGE_SIZE = 7

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN
})

export const getPostsInfo = (data: any) => {
  const postData = data.map((postData: any) => {
    const postProperties = postData.properties

    const id = postData.id
    const title = postProperties.Page.title[0].text.content
    const categories = postProperties.Category.multi_select
    const slug = postProperties.Slug.rich_text[0].text.content
    const updatedAt = new Date(postProperties.Date.last_edited_time).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return ({
      id: id,
      title: title,
      categories: categories,
      slug: slug,
      updatedAt: updatedAt
    })
  })
  return [
    { posts: postData },
    { nextCursor: postData[postData.length - 1].id },
  ]
}
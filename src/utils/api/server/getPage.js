import { join, parse } from "path"
import { serialize } from "next-mdx-remote/serialize"

import getPages from "./getPages"

export default async function getPage({
  slug = "",
  pageType = "best-practices",
  options = {},
}) {
  const allPages = await getPages({ pageType })

  const relevantSlug = join("/", pageType, parse(slug).name)
  const relevantPage = allPages.find((s) => s.slug === relevantSlug)
  const content = relevantPage?.content || ""

  if (!content) return {}

  const serialized = await serialize(content, {
    parseFrontmatter: true,
    ...options,
  })

  serialized.frontmatter = {
    ...serialized.frontmatter,
    related: relevantPage.frontmatter?.related || [],
    tags: relevantPage.frontmatter?.tags || [],
    type: relevantPage.frontmatter?.type || "",
    slug: relevantPage.slug || "",
  }

  return serialized
}

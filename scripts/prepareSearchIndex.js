import { readFile } from "fs/promises"
import { join } from "path"

import convertFromBuffer from "../src/utils/convertFromBuffer.js"

export default async function prepareSearchIndex() {
  const inputUrl = join(process.env.PWD, "content", "best-practices.txt")

  const data = await readFile(inputUrl, "utf8").then(
    (d) =>
      JSON.parse(convertFromBuffer(d.trim().split("").reverse().join(""))).pages
  )

  const searchIndexLite = data
    .filter((d) => d.frontmatter?.published)
    .map((d, i) => {
      return {
        id: i + 1,
        name: d.fileName || "",
        title: d.frontmatter?.title || "",
        slug: d.slug || "",
        description: d.frontmatter?.description || "",
      }
    })

  // str.replaceAll(/\<([A-Z]|\/[A-Z]).+?\>/g, "\n")

  const searchIndexFull = data
    .filter((d) => d.frontmatter?.published)
    .map((d, i) => {
      return {
        id: i + 1,
        name: d.fileName || "",
        title: d.frontmatter?.title || "",
        slug: d.slug || "",
        description: d.frontmatter?.description || "",
        content: d.content
          ?.split("---")
          .filter((d) => d)[1]
          .replaceAll(/\<([A-Z]|\/[A-Z]).+?\>/g, "\n")
          .split("\n")
          .map((d) => d.trim())
          .filter((d) => d && d !== "\n")
          .join("\n"),
      }
    })

  return [searchIndexLite, searchIndexFull]
}

// const searchIndex = await prepareSearchIndex()

// const outputUrl = join(process.env.PWD, "public", "search-index.json")

// await writeFile(outputUrl, JSON.stringify(searchIndex), "utf8")

// console.log("Done writing search index!")

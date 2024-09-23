import { readFile } from "fs/promises"
import { join } from "path"

import convertFromBuffer from "@/utils/convertFromBuffer"

export default async function getPages({
  pageType = "best-practices",
  fields = [],
}) {
  const content = await readFile(
    join(process.env.PWD, "content", pageType + ".txt"),
    "utf8"
  )

  const parsedContent = JSON.parse(
    convertFromBuffer(content.trim().split("").reverse().join(""))
  )

  const allPages = parsedContent.pages || []

  return !fields.length
    ? allPages
    : allPages.map((d) =>
        fields.reduce((acc, cur) => {
          acc[cur] = d[cur]
          return acc
        }, {})
      )
}

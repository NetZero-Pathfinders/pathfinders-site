import { readFile } from "fs/promises"
import { join } from "path"
import { csvParse } from "d3-dsv"

import convertFromBuffer from "@/utils/convertFromBuffer"

export default async function getContent(name, format = "csv") {
  const content = await readFile(join(process.env.PWD, "content", name), "utf8")
  const converted = convertFromBuffer(
    content.trim().split("").reverse().join("")
  )
  return format === "csv" ? csvParse(converted) : JSON.parse(converted)
}

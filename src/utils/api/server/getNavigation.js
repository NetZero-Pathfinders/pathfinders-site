import { readFile } from "fs/promises"
import { join } from "path"

import convertFromBuffer from "@/utils/convertFromBuffer"

export default async function getNavigation() {
  const content = await readFile(
    join(process.env.PWD, "content", "navigation.txt"),
    "utf8"
  )
  return JSON.parse(
    convertFromBuffer(content.trim().split("").reverse().join(""))
  )
}

import { csvParse } from "d3-dsv"

export async function readFiles({ files }) {
  return await Promise.all(
    Array.prototype.map.call(files, async (file) => {
      const content = await file.text()
      return { name: file.name, content: csvParse(content).map((d) => d) }
    })
  )
}

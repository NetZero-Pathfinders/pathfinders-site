/**
 * Prepare data to be processed before
 * building and deploying the app
 *
 */

import { readdir, readFile, writeFile, rm, mkdir } from "fs/promises"
import { join } from "path"
import _sortBy from "lodash/sortBy.js"

import prepareSearchIndex from "./prepareSearchIndex.js"
import prepareEmissions from "./prepareEmissions.js"
import convertFromBuffer from "../src/utils/convertFromBuffer.js"
import convertToBuffer from "../src/utils/convertToBuffer.js"

const allFiles = await readdir(join(process.env.PWD, "content")).then((files) =>
  files.filter((d) => ![".DS_Store", "legacy"].includes(d))
)

const allContent = await Promise.all(
  allFiles.map(async (filename) => {
    const content = await readFile(
      join(process.env.PWD, "content", filename),
      "utf8"
    )
    const converted = convertFromBuffer(
      content.trim().split("").reverse().join("")
    )
    return {
      filename: filename.split(".txt").join(".json"),
      content: JSON.parse(converted),
    }
  })
)

const actions = allContent.find((s) => s.filename === "actions.json")
const bestPractices = allContent.find(
  (s) => s.filename === "best-practices.json"
)
const countries = allContent.find((s) => s.filename === "countries.json")
const pillars = allContent.find((s) => s.filename === "pillars.json")
const regions = allContent.find((s) => s.filename === "regions.json")
const reports = allContent.find((s) => s.filename === "reports.json")
const sectors = allContent.find((s) => s.filename === "sectors.json")
const stakeholders = allContent.find((s) => s.filename === "stakeholders.json")

const rmOptions = { force: true, recursive: true }

const rootDir = process.env.PWD
const publicDir = join(rootDir, "public")
const dataDir = join(publicDir, "data")

await rm(join(dataDir, "actions"), rmOptions)
await rm(join(dataDir, "sectors"), rmOptions)
await rm(join(dataDir, "stakeholders"), rmOptions)
await rm(join(dataDir, "pillars"), rmOptions)

await mkdir(join(dataDir, "actions"))
await mkdir(join(dataDir, "sectors"))
await mkdir(join(dataDir, "stakeholders"))
await mkdir(join(dataDir, "pillars"))

await writeFile(
  join(dataDir, "countries.txt"),
  convertToBuffer(JSON.stringify(countries.content))
    .split("")
    .reverse()
    .join(""),
  "utf8"
)

/**
 * Temporary solutions.json file
 *
 */

const parsedActions = actions.content.pages.map((item) => {
  const allPillars = pillars.content.pages.map((d) => d.frontmatter)
  const allSectors = sectors.content.pages.map((d) => d.frontmatter)
  const allStakeholders = stakeholders.content.pages.map((d) => d.frontmatter)

  const relevantSectors = item.frontmatter.sectors
    .map((sector) => allSectors.find((s) => s.title === sector) || null)
    .filter((d) => d)
    .map((d) => ({ key: d.key, title: d.title }))
    .sort((a, b) => a.key - b.key)

  const relevantPillar =
    allPillars.find((s) => s.key === item.frontmatter.pillar) || null

  const relevantStakeholders =
    item.frontmatter.stakeholders
      ?.map(
        (stakeholder) =>
          allStakeholders.find((s) => s.title === stakeholder) || null
      )
      .filter((d) => d)
      .map((d) => ({ key: d.key, title: d.title }))
      .sort((a, b) => a.key - b.key) || []

  return {
    ...item.frontmatter,
    filename: item.fileName,
    slug: item.slug || "",
    pillar: relevantPillar
      ? {
          key: relevantPillar.key || "",
          title: relevantPillar.title || "",
        }
      : "",
    sectors: relevantSectors,
    stakeholders: relevantStakeholders,
  }
})

await writeFile(
  join(dataDir, "actions", "all.txt"),
  convertToBuffer(
    JSON.stringify(
      parsedActions.map((d) => {
        return {
          ...d,
          gridColumn: `${d.sectors[0].key || 1} / span ${
            d.sectors.length || 5
          }`,
        }
      })
    )
  )
    .split("")
    .reverse()
    .join(""),
  "utf8"
)

await Promise.all(
  parsedActions.map((item) => {
    return writeFile(
      join(dataDir, "actions", item.filename.split("--")[0] + ".txt"),
      convertToBuffer(JSON.stringify(item)).split("").reverse().join(""),
      "utf8"
    )
  })
)

// await writeFile(
//   join(publicDir, "recommendations.json"),
//   JSON.stringify(
//     parsedActions.map((item) => {
//       return {
//         id: item.filename.split("--")[0].split("-").join("_"),
//         name: item.title,
//         sectors: item.sectors,
//         stakeholders: item.stakeholders,
//         description: item.description || "",
//         gridColumn: `${item.sectors[0].key || 1} / span ${
//           item.sectors.length || 5
//         }`,
//       }
//     })
//   ),
//   "utf8"
// )

// await writeFile(
//   join(dataDir, "solutions.json"),
//   JSON.stringify(
//     parsedActions.map((item) => {
//       return {
//         name: item.title,
//         slug: item.filename.split(".")[0],
//         pillar: item.pillar?.key,
//         sector: item.sectors.map((d) => d.key),
//         id: item.filename.split("--")[0].split("-").join("_"),
//       }
//     })
//   ),
//   "utf8"
// )

/**
 * Pillars
 *
 */

const parsedPillars = pillars.content.pages.map(({ frontmatter }) => ({
  key: frontmatter.key,
  slug: `/pillars/pillar-${frontmatter.key}`,
  title: frontmatter.title,
  description: frontmatter.description || "",
  dataFiles: frontmatter.dataFiles,
  keywords: frontmatter.keywords,
}))

await writeFile(
  join(dataDir, "pillars", "all.txt"),
  convertToBuffer(JSON.stringify(parsedPillars)).split("").reverse().join(""),
  "utf8"
)

/**
 * Sectors
 *
 */

// {
//   "key": 5,
//   "title": "Agriculture",
//   "description": "As developing countries grow, demand for food overall and for food with higher protein levels rises. This creates a pressing need for sustainable agriculture solutions that address the emissions challenge while not hampering economic growth.",
//   "type": "sector",
//   "dataFiles": [],
//   "keywords": []
// },

const parsedSectors = _sortBy(
  sectors.content.pages.map(({ frontmatter }) => ({
    key: frontmatter.key,
    slug: `/sectors/${frontmatter.title.toLowerCase().split(" ").join("-")}`,
    title: frontmatter.title,
    description: frontmatter.description || "",
    dataFiles: frontmatter.dataFiles,
    keywords: frontmatter.keywords,
  })),
  (o) => parseInt(o.key)
)

await writeFile(
  join(dataDir, "sectors", "all.txt"),
  convertToBuffer(JSON.stringify(parsedSectors)).split("").reverse().join(""),
  "utf8"
)

/**
 * Stakeholders
 *
 */

// {
//   "key": 1,
//   "title": "Companies",
//   "description": "",
//   "type": "stakeholder",
//   "dataFiles": [],
//   "keywords": []
// },

const parsedStakeholders = stakeholders.content.pages.map(
  ({ frontmatter }) => ({
    key: frontmatter.key,
    slug: `/stakeholders/${frontmatter.title
      .toLowerCase()
      .split(" ")
      .join("-")}`,
    title: frontmatter.title,
    description: frontmatter.description || "",
    dataFiles: frontmatter.dataFiles,
    keywords: frontmatter.keywords,
  })
)

await writeFile(
  join(dataDir, "stakeholders", "all.txt"),
  convertToBuffer(JSON.stringify(parsedStakeholders))
    .split("")
    .reverse()
    .join(""),
  "utf8"
)

/**
 * Search index
 *
 */
const [searchIndexLite, searchIndexFull] = await prepareSearchIndex()

// await writeFile(
//   join(publicDir, "search-index.json"),
//   JSON.stringify(searchIndex),
//   "utf8"
// )

await writeFile(
  join(dataDir, "search-index-lite.txt"),
  convertToBuffer(JSON.stringify(searchIndexLite)).split("").reverse().join(""),
  "utf8"
)

await writeFile(
  join(dataDir, "search-index-full.txt"),
  convertToBuffer(JSON.stringify(searchIndexFull)).split("").reverse().join(""),
  "utf8"
)

/**
 * Emissions data
 *
 */
const [emissions, worldEmissions, totalEmissionsByCountry] =
  await prepareEmissions()

await rm(join(dataDir, "emissions"), {
  force: true,
  recursive: true,
})

await mkdir(join(dataDir, "emissions"))

await writeFile(
  join(dataDir, "emissions", "all.txt"),
  convertToBuffer(JSON.stringify(emissions)).split("").reverse().join(""),
  "utf8"
)

await writeFile(
  join(dataDir, "emissions", "world.txt"),
  convertToBuffer(JSON.stringify(worldEmissions)).split("").reverse().join(""),
  "utf8"
)

await writeFile(
  join(dataDir, "emissions", "total-emissions-by-country.txt"),
  convertToBuffer(JSON.stringify(totalEmissionsByCountry))
    .split("")
    .reverse()
    .join(""),
  "utf8"
)

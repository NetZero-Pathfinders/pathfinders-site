import { readFile } from "fs/promises"
import { join } from "path"
import _groupBy from "lodash/groupBy.js"
import _sortBy from "lodash/sortBy.js"
import _sumBy from "lodash/sumBy.js"
import { extent as d3Extent } from "d3-array"

import convertFromBuffer from "../src/utils/convertFromBuffer.js"

const emissionsPath = join(process.env.PWD, "data", "emissions.txt")
const countriesPath = join(process.env.PWD, "content", "countries.txt")

const combineData = (d, fields) => {
  const combinedValues = fields.reduce((acc, cur) => acc + (d[cur] || 0), 0)
  return {
    total: combinedValues,
    allValues: fields.map((name) => ({ name, value: d[name] })),
  }
}

const getSectorValues = (data, sector, fields) => {
  const d = combineData(data, fields) || {}
  return { name: sector, ...d }
}

// Industrial processes => Industry and Materials
// Agriculture => Agriculture
// Waste => Other
// Land-Use Change and Forestry => Other
// Bunker Fuels => Transportation
// Electricity/Heat => Power and grids + Buildings
// Building => Power and grids + Buildings
// Manufacturing/Construction => Industry and Materials
// Transportation => Transportation
// Other Fuel Combustion => Agriculture
// Fugitive Emissions => Other

function getWorldEmissions(emissions) {
  // 1. Gas: "All GHG"
  // 2. Country: "WORLD"
  // 3. Sector: "Total excluding LUCF"

  const allGHGEmissions = emissions.filter((d) => d.Gas === "All GHG")

  const allGHGEmissionsByCountry = Object.entries(
    _groupBy(allGHGEmissions, (o) => o.Country.trim())
  )

  const allExcludingLUCF = allGHGEmissionsByCountry.map(([id, items]) => {
    const withoutLUCF =
      items.find((s) => s.Sector.trim() === "Total excluding LUCF") || {}
    const withLUCF =
      items.find((s) => s.Sector.trim() === "Total including LUCF") || {}

    const allYears = _sortBy(
      Object.keys(withoutLUCF).filter((d) => parseInt(d)),
      (o) => parseInt(o) || 0
    )
    const latestYear = allYears.slice(-1)[0]

    const cumulative_withoutLUCF =
      _sumBy(
        allYears.map((year) => withoutLUCF[year]),
        (o) => parseFloat(o) || 0
      ) || 0
    const latest_withoutLUCF = parseFloat(withoutLUCF[latestYear]) || 0

    const cumulative_withLUCF =
      _sumBy(
        allYears.map((year) => withLUCF[year]),
        (o) => parseFloat(o) || 0
      ) || 0
    const latest_withLUCF = parseFloat(withLUCF[latestYear]) || 0

    return {
      id,
      cumulative: Math.round(cumulative_withoutLUCF * 1000) / 1000,
      latest: Math.round(latest_withoutLUCF * 1000) / 1000,
      extent: [parseInt(allYears[0]), parseInt(latestYear)],
      cumulative_withLUCF: Math.round(cumulative_withLUCF * 1000) / 1000,
      latest_withLUCF: Math.round(latest_withLUCF * 1000) / 1000,
      extent_withLUCF: [parseInt(allYears[0]), parseInt(latestYear)],
    }
  })

  const worldEmissions = allGHGEmissionsByCountry
    .find((s) => s[0] === "WORLD")[1]
    .find((s) => s.Sector === "Total excluding LUCF")

  const worldEmissions_withLUCF = allGHGEmissionsByCountry
    .find((s) => s[0] === "WORLD")[1]
    .find((s) => s.Sector === "Total including LUCF")

  const parsedWorldEmissions = {
    name: worldEmissions.Country,
    source: worldEmissions.Source,
    gas: worldEmissions.Gas,
    sector: worldEmissions.Sector,
    data: _sortBy(
      Object.entries(worldEmissions)
        .filter((d) => parseInt(d[0]))
        .map((d) => ({ year: parseInt(d[0]), value: parseFloat(d[1]) || 0 })),
      (o) => o.year
    ),
    data_withLUCF: _sortBy(
      Object.entries(worldEmissions_withLUCF)
        .filter((d) => parseInt(d[0]))
        .map((d) => ({ year: parseInt(d[0]), value: parseFloat(d[1]) || 0 })),
      (o) => o.year
    ),
  }

  const yearExtent = d3Extent(parsedWorldEmissions.data, (o) => o.year)
  const valueExtent = d3Extent(parsedWorldEmissions.data, (o) => o.value)

  parsedWorldEmissions.yearExtent = yearExtent
  parsedWorldEmissions.valueExtent = valueExtent

  return [parsedWorldEmissions, allExcludingLUCF]
}

export default async function processEmissions() {
  const emissions = await readFile(emissionsPath, "utf8").then((d) =>
    JSON.parse(convertFromBuffer(d.trim().split("").reverse().join("")))
  )

  const countries = await readFile(countriesPath, "utf8").then((d) =>
    JSON.parse(convertFromBuffer(d.trim().split("").reverse().join("")))
  )

  const [parsedWorldEmissions, allExcludingLUCF] = getWorldEmissions(emissions)

  const totalEmissionsByCountry = allExcludingLUCF.map((d) => {
    const relevantCountry = countries.find((s) => s.id === d.id) || {}
    return { ...d, ...relevantCountry }
  })

  const data = Object.entries(
    _groupBy(
      emissions.filter((d) => d.Gas === "All GHG"),
      (o) => o.Country
    )
  ).map(([name, data]) => {
    const preppedData = data.map(
      ({ Country, Source, Sector, Gas, ...restProps }) => {
        const years = _sortBy(
          Object.entries(restProps)
            .filter((d) => parseInt(d[0]))
            .map((d) => ({
              year: parseInt(d[0]),
              value: parseFloat(d[1]) || 0,
            })),
          (o) => o.year
        )
        const cumulative = _sumBy(years, (o) => parseFloat(o.value) || 0)
        const latest = years.slice(-1)[0]
        return { Country, Source, Sector, Gas, cumulative, latest, years }
      }
    )

    const year = 2020

    const relevantData = preppedData.reduce((acc, cur) => {
      acc[cur.Sector.trim()] =
        parseFloat(
          cur.years.find((s) => parseInt(s.year) === parseInt(year))?.value
        ) || 0
      return acc
    }, {})

    // const relevantDataLatest = preppedData.reduce((acc, cur) => {
    //   acc[cur.Sector.trim()] = cur.latest.value || 0
    //   return acc
    // }, {})

    const relevantDataCumulative = preppedData.reduce((acc, cur) => {
      acc[cur.Sector.trim()] = cur.cumulative || 0
      return acc
    }, {})

    // console.log(name)
    // console.log("Relevant Data: ", relevantData)
    // console.log("Relevant Data Latest: ", relevantDataLatest)
    // console.log("Relevant Data Cumulative: ", relevantDataCumulative)

    const sectors = [
      getSectorValues(relevantData, "Power and grids + Buildings", [
        "Electricity/Heat",
        "Building",
      ]),
      getSectorValues(relevantData, "Industry and Materials", [
        "Industrial Processes",
        "Manufacturing/Construction",
      ]),
      getSectorValues(relevantData, "Transport", [
        "Bunker Fuels",
        "Transportation",
      ]),
      getSectorValues(relevantData, "Agriculture", [
        "Agriculture",
        "Other Fuel Combustion",
      ]),
      // getSectorValues(relevantData, "Waste", ["Waste", "Fugitive Emissions"]),
      getSectorValues(relevantData, "Other", ["Waste", "Fugitive Emissions"]),
    ]

    const sectors_withLUCF = [
      ...sectors.slice(0, -1),
      getSectorValues(relevantData, "Other", [
        "Waste",
        "Fugitive Emissions",
        "Land-Use Change and Forestry",
      ]),
    ]

    const sectorsCumulative = [
      getSectorValues(relevantDataCumulative, "Power and grids + Buildings", [
        "Electricity/Heat",
        "Building",
      ]),
      getSectorValues(relevantDataCumulative, "Industry and Materials", [
        "Industrial Processes",
        "Manufacturing/Construction",
      ]),
      getSectorValues(relevantDataCumulative, "Transport", [
        "Bunker Fuels",
        "Transportation",
      ]),
      getSectorValues(relevantDataCumulative, "Agriculture", [
        "Agriculture",
        "Other Fuel Combustion",
      ]),
      getSectorValues(relevantDataCumulative, "Other", [
        "Waste",
        "Fugitive Emissions",
      ]),
    ]

    const sectorsCumulative_withLUCF = [
      ...sectorsCumulative.slice(0, -1),
      getSectorValues(relevantDataCumulative, "Other", [
        "Waste",
        "Fugitive Emissions",
        "Land-Use Change and Forestry",
      ]),
    ]

    const total = _sumBy(sectors, (o) => o.total || 0)
    const cumulative = _sumBy(sectorsCumulative, (o) => o.total || 0)

    const total_withLUCF = _sumBy(sectors_withLUCF, (o) => o.total || 0)
    const cumulative_withLUCF = _sumBy(
      sectorsCumulative_withLUCF,
      (o) => o.total || 0
    )

    const relevantCountry = countries.find((s) => s.id === name)

    return {
      name,
      full_name: relevantCountry?.name || "",
      region: relevantCountry?.region || "",
      year,
      total,
      cumulative,
      sectors,
      total_withLUCF,
      cumulative_withLUCF,
      sectors_withLUCF,
    }
  })

  return [data, parsedWorldEmissions, totalEmissionsByCountry]
}

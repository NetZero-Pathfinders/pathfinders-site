import { scaleSqrt, scaleLinear } from "d3-scale"
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
import { pack, hierarchy } from "d3-hierarchy"
import _sortBy from "lodash/sortBy"
import { max as _max, min as _min } from "d3-array"

import colors from "@/utils/theme/colors"

export function getPack(data, width, height, mode = "withoutLUCF") {
  // const items = data.sectors || []

  const items =
    mode === "withoutLUCF" ? data.sectors || [] : data.sectors_withLUCF || []

  const root = {
    name: "Root",
    children: items.map((d) => ({
      name: d.name,
      value: d.total,
      Icon: d.Icon,
    })),
  }

  return pack().size([width, height]).padding(3)(
    hierarchy(root)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  )
}

export function getDistribution(
  data,
  width,
  height,
  sumField = "cumulative",
  highlight = [],
  slice = [],
  filter = []
) {
  const totals = data[0].sums

  const sizeScale = scaleSqrt()
    // .domain([0.0001, totals[0].total])
    .domain([0.0001, totals[0][sumField]])
    .range([1, Math.min(width, height) / 2.55])

  const minValue = _min(data, (o) => o[sumField])
  const maxValue = _max(data, (o) => o[sumField])

  const labelThreshold = maxValue / 20

  // console.log("T: ", minValue, labelThreshold, maxValue)

  const circleFillScale = scaleLinear()
    .domain([minValue, labelThreshold, maxValue])
    .range([colors.blue[100], colors.blue[500], colors.blue[800]])

  // const textFillScale = scaleSqrt()
  //   .domain([0.0001, maxValue / 4, maxValue])
  //   .range([colors.blue[800], colors.blue[100], "#FFF"])

  const nodes = data
    .map((d) => ({
      r: sizeScale(d[sumField]),
      circleFill: circleFillScale(d[sumField]),
      textFill: "#FFF",
      name: d.name,
      full_name: d.full_name,
      region: d.region || "",
      // value: d.total,
      value: d[sumField],
      sums: d.sums,
      showLabel: d[sumField] >= labelThreshold,
      isHighlighted: !highlight.length ? true : highlight.includes(d.name),
    }))
    .slice(...slice)
    .filter((d) => (!filter.length ? true : filter.includes(d.name)))

  const collision = forceCollide()
    .radius((d) => {
      // d.r can be negative
      return d.r > 0 ? d.r + 0.5 : 0
    })
    .iterations(2)

  const simulation = forceSimulation(nodes)
    .force("x", forceX().strength(0.1))
    .force("y", forceY().strength(0.1))
    .force("collide", collision)
    .tick(500)

  simulation.stop()

  return nodes
}

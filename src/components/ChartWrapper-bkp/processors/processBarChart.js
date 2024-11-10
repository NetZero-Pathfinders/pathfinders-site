import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"
import _uniqBy from "lodash/uniqBy"
import { max, extent as _extent } from "d3-array"

import getGroupColors from "./getGroupColors"

/**
 * 1. Processing for a regular bar chart (not used...)
 *
 */
export function processSimpleBarChart(parsed, chartColors) {
  const data = parsed.map((d, key) => ({
    key,
    name: d.name || d.x_val,
    x_val: d.x_val,
    value: parseFloat(d.value || d.y_val) || "",
    y_val: parseFloat(d.y_val) || "",
    unit: d.unit || d.y_unit || "",
    color: chartColors[100] || "#000000",
  }))

  const groupedByName = _groupBy(data, (o) => o.name)
  const yMax = max(data, (o) => o.value)

  const domain = {
    x: Object.keys(groupedByName),
    y: [0, yMax],
  }

  return { data, domain }
}

/**
 * 2. Processing for a stacked bar chart
 *
 */
export function processStackedBarChart(parsed, colors) {
  // const chartColors = Object.entries(colors).map((d) => d[1])
  // const groupColors = Object.entries(_groupBy(parsed, (o) => o.group)).reduce(
  //   (acc, cur, i) => {
  //     acc[cur[0]] =
  //       chartColors.groupColors[cur[0]] || chartColors[i] || "#EEEEEE"
  //     return acc
  //   },
  //   {}
  // )

  const grouped = Object.entries(_groupBy(parsed, (o) => o.group))
  const groupColors = getGroupColors(grouped, colors)

  const data = Object.entries(_groupBy(parsed, (o) => o.x_val))
    .filter((d) => !!d[0])
    .map(([name, data], key) => {
      const sum = _sumBy(data, (o) => parseFloat(o.y_val) || 0)
      const dataWithColors = data.map((d) => ({
        ...d,
        y_val: parseFloat(d.y_val) || 0,
        color: groupColors[d.group],
      }))
      return { key, name, sum, data: dataWithColors }
    })

  const y_max = max(data, (o) => o.sum)

  const domain = {
    x: data.map((d) => d.name),
    y: [0, y_max],
  }

  return { data, domain }
}

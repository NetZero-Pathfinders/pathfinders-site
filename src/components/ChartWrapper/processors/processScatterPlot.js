import getGroupColors from "./getGroupColors"
import { extent as _extent } from "d3-array"
import _groupBy from "lodash/groupBy"

export function processScatterPlot(data, colors) {
  const domainX = _extent(data, (o) => parseFloat(o.x_val))
  const domainY = _extent(data, (o) => parseFloat(o.y_val))

  const grouped = Object.entries(
    _groupBy(
      data.map((d, key) => {
        const x_val = d.x_val ? parseFloat(d.x_val) : ""
        const y_val = d.y_val ? parseFloat(d.y_val) : ""
        return { ...d, key, x_val, y_val }
      }),
      (o) => o.group
    )
  )

  const groupColors = getGroupColors(grouped, colors)

  const finalData = grouped.map(([groupName, data], key) => {
    const group =
      groupName === "undefined" ? "no-group" : groupName || "no-group"
    const color = groupColors[groupName] || "#000000"
    const unit = data.map((d) => d.unit).filter((d) => d)[0]
    return { key, group, color, unit, data: data.map((d) => ({ ...d, color })) }
  })

  console.groupCollapsed("Scatter plot processor")
  console.log("Original data: ", data)
  console.log("Colors: ", colors)
  console.log("Domain: ", domainX, domainY)
  console.log("Processed data: ", finalData)
  console.groupEnd()

  return {
    data: finalData,
    domain: {
      x: domainX,
      y: domainY,
    },
  }
}

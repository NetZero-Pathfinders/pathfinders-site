import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"
import _uniqBy from "lodash/uniqBy"
import { extent as _extent } from "d3-array"

import getGroupColors from "./getGroupColors"

function getLineDataValueType(fixedXVal) {
  return ["", "year", "month", "day"][fixedXVal.split("-").length] || ""
}

function getLineDataValue(key, d) {
  const fixedXVal = `${d.x_val}`.trim()
  const isYear = fixedXVal.length === 4
  const valueType = getLineDataValueType(fixedXVal)
  const x_val = isYear ? `${fixedXVal}-01-01` : fixedXVal
  const y_val = parseFloat(d.y_val) || (isNaN(parseFloat(d.y_val)) ? "" : 0)
  return { key, x_val, y_val, unit: d.unit || "", valueType }
}

export function processLineChart(data, colors) {
  const grouped = Object.entries(_groupBy(data, (o) => o.group))
  const groupColors = getGroupColors(grouped, colors)

  const groupedByGroup = grouped.map(([groupName, groupValues], key) => {
    let unit = ""
    const data = _sortBy(
      groupValues
        .map((d, key) => {
          if (!unit) unit = d.unit?.trim()
          return getLineDataValue(key, d)
        })
        .filter((d) => !!d.x_val),
      (o) => parseFloat(o.x_val.split("-").join(""))
    )
    const group =
      groupName === "undefined" ? "no-group" : groupName || "no-group"
    const color = groupColors[groupName]
    return { key, group, color, unit: unit || "", data }
  })

  const allDomainValues = groupedByGroup.flatMap((d) => d.data)
  const allXValues = _sortBy(
    _uniqBy(allDomainValues.map((d) => d.x_val)),
    (o) => parseFloat(o.split("-").join(""))
  )
  const allYValues = _uniqBy(allDomainValues.map((d) => d.y_val)).filter(
    (d) => typeof d !== "string"
  )
  const xDomain = _extent(allXValues, (o) => o)
  const yDomain = _extent(allYValues, (o) => o)

  const xValueType = allDomainValues.map((d) => d.valueType).filter((d) => d)[0]

  const finalData = {
    data: groupedByGroup,
    groups: groupedByGroup.map((d) => d.group),
    domain: {
      allXValues,
      allYValues,
      xValueType,
      x: xDomain.map((dx, i) => dx.split("-")[0] + (!i ? "-01-01" : "-12-31")),
      y: [Math.min(yDomain[0]), Math.max(yDomain[1])],
    },
  }

  console.groupCollapsed("Line chart processor")
  console.log("Original data: ", data)
  console.log("Processed data: ", finalData)
  console.groupEnd()

  return finalData
}

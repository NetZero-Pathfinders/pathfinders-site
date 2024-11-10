import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"
import _uniqBy from "lodash/uniqBy"
import { extent as _extent } from "d3-array"

export default function getGroupColors(data, colors) {
  // const chartColors = Object.entries(colors).map((d) => d[1])
  const chartColors = colors.map(d => d)

  const groupColors = data.reduce((acc, cur, i) => {
    acc[cur[0]] = colors?.groupColors[cur[0]] || chartColors[i] || "#EEEEEE"
    return acc
  }, {})

  // console.groupCollapsed("Group colors: ")
  // console.log(chartColors)
  // console.log(groupColors)
  // console.groupEnd()

  return groupColors
}

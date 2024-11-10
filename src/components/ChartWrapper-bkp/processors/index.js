import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"
import _uniqBy from "lodash/uniqBy"
import { extent as _extent } from "d3-array"
// import dayjs from "dayjs"

import { processStackedBarChart } from "./processBarChart"
import { processScatterPlot } from "./processScatterPlot"
import { processLineChart } from "./processLineChart"

export function getProcessor(chartType) {
  switch (chartType) {
    case "bar":
      return processStackedBarChart
    case "line":
      return processLineChart
    case "scatter":
      return processScatterPlot
    default:
      return () => ({ data: [], domain: { x: [0, 0], y: [0, 0], r: [0, 0] } })
  }
}

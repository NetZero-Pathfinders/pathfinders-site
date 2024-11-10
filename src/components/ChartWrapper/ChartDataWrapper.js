import { useEffect } from "react"

import BarChart from "./BarChart"
import LineChart from "./LineChart"
import ScatterPlot from "./ScatterPlot"
import { useChartStore } from "./store"
import ChartFallback from "./ChartFallback"
import Legend from "./Legend"
import fetchDataset from "@/utils/api/client/fetchDataset"

/**
 * Chart Data Wrapper
 *
 * This is the data wrapper around each chart.
 * It is responsible for loading and setting the relevant
 * data for the chart... It should only render on the client
 * and should have access to a `width` and `height` from the
 * dimension calculator in the `ChartWrapper`.
 *
 */
export default function ChartDataWrapper({
  chartType,
  src,
  defaultData,
  colors,
  orientation,
  chartPadding,
}) {
  const data = useChartStore((state) => state.data)
  const setInitialData = useChartStore((state) => state.setInitialData)

  useEffect(() => {
    if (!src) {
      setInitialData(chartType, defaultData, colors)
      return
    }
    const url = `/data/charts/${src.split(".").slice(0, -1).join(".")}.txt`
    fetchDataset(url, "json").then((dataset) => {
      if (dataset.length) setInitialData(chartType, dataset, colors)
    })
  }, [
    chartType,
    src,
    setInitialData,
    JSON.stringify(colors),
    JSON.stringify(colors.groupColors),
    JSON.stringify(defaultData),
  ])

  if (!data.length) return <ChartFallback />

  switch (chartType) {
    case "bar":
      return (
        <div>
          <BarChart orientation={orientation} chartPadding={chartPadding} />
          <Legend />
        </div>
      )
    case "line":
      return (
        <div>
          <LineChart chartPadding={chartPadding} />
          <Legend />
        </div>
      )
    case "scatter":
      return (
        <div>
          <ScatterPlot orientation={orientation} chartPadding={chartPadding} />
          <Legend />
        </div>
      )
    default:
      return <ChartFallback />
  }
}

import { useEffect } from "react"

import BarChart from "./BarChart"
import LineChart from "./LineChart"
import ScatterPlot from "./ScatterPlot"
import { useChartStore } from "./store"
import ChartFallback from "./ChartFallback"
import Legend from "./Legend"

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
      console.log("THIS")
      setInitialData(chartType, defaultData, colors)
      return
    }
    const fileName = src.split(".").slice(0, -1).join(".")
    const isCSV = src.split(".").slice(-1)[0].toLowerCase() === "csv"
    const fetchData = async (src) => {
      const url = `/data/charts/${src}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const dataset = await response.json()
        setInitialData(chartType, dataset, colors)
      } catch (error) {
        console.log("Error while fetching data: ", error)
      }
    }
    fetchData(isCSV ? `${fileName}.json` : src)
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

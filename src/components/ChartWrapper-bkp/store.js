import { createStore, useStore } from "zustand"
import { createContext, useContext, useRef } from "react"
import uniqBy from "lodash/uniqBy"

import { getProcessor } from "./processors"

/**
 * Chart store setup
 *
 * This stuff creates a new store instance
 * for every chart in order to avoid tooltip
 * overlap and unnecessarily preserved state...
 *
 */
const StoreContext = createContext(null)

const storeCreator = (set) => ({
  chartType: "",
  width: 0,
  height: 0,

  tooltip: null,
  setTooltip: (tooltip) => {
    set({ tooltip })
  },

  unit: "",
  y_unit: "",
  x_unit: "",

  data: [],
  setInitialData: (chartType, dataset, colors) => {
    if (!dataset) return
    const unit = dataset.map((d) => d.unit || "").filter((d) => d)[0]
    const y_unit = dataset.map((d) => d.y_unit || "").filter((d) => d)[0]
    const x_unit = dataset.map((d) => d.x_unit || "").filter((d) => d)[0]
    const { data, domain } = getProcessor(chartType)(dataset, colors)
    const legend = uniqBy(
      data.flatMap((d) => {
        return d.group
          ? [{ name: d.group, color: d.color }]
          : d.data.map((d) => ({ name: d.group, color: d.color }))
      }),
      (o) => o.name
    )
    const allGroupNames = legend.map((d) => d.name)
    set({
      domain,
      data,
      unit,
      y_unit,
      x_unit,
      chartType,
      legend:
        allGroupNames.length === 1 &&
        (allGroupNames[0]?.name === "no-group" || !allGroupNames[0]?.name)
          ? []
          : legend,
    })
  },

  legend: [],

  domain: { x: [0, 0], y: [0, 0], r: [0, 0] },
})

export const ChartStoreProvider = ({ children }) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = createStore(storeCreator)
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useChartStore(selector) {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("Missing StoreProvider")
  }
  return useStore(store, selector)
}

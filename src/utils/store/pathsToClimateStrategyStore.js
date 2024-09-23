import { create } from "zustand"
import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
import { scaleSqrt } from "d3-scale"
import _sortBy from "lodash/sortBy"

export function getStep01Distribution(
  data,
  totals,
  highlight = [],
  slice = [],
  filter = []
) {
  const sizeScale = scaleSqrt()
    .domain([0.0001, totals[0].total])
    .range([1, 210])

  const nodes = data
    .map((d) => ({
      r: sizeScale(d.total),
      name: d.name,
      value: d.total,
      sums: d.sums,
      isHighlighted: !highlight.length ? true : highlight.includes(d.name),
    }))
    .slice(...slice)
    .filter((d) => (!filter.length ? true : filter.includes(d.name)))

  const collision = forceCollide()
    .radius((d) => d.r + 0.5)
    .iterations(2)

  const simulation = forceSimulation(nodes)
    .force("x", forceX().strength(0.1))
    .force("y", forceY().strength(0.1))
    .force("collide", collision)
    .tick(500)

  simulation.stop()

  return nodes
}

export function getStep02Distribution(data, totals) {
  const sizeScale = scaleSqrt()
    .domain([0.0001, totals[0].total])
    .range([1, 210])

  const nodes = data
    .map((d) => ({
      r: sizeScale(d.total),
      name: d.name,
      value: d.total,
      sums: d.sums,
    }))
    .slice(0, 4)

  const collision = forceCollide()
    .radius((d) => d.r + 0.5)
    .iterations(2)

  const simulation = forceSimulation(nodes)
    .force("x", forceX().strength(0.1))
    .force("y", forceY().strength(0.1))
    .force("collide", collision)
    .tick(500)

  simulation.stop()

  return nodes
}

export function getDistribution(step = "step-01", data) {
  if (!data.length) return []
  const totals = data[0].sums
  switch (step) {
    case "step-03":
      return getStep01Distribution(data, totals)
    case "step-04":
      return getStep01Distribution(data, totals, ["USA", "CHN", "IND"])
    case "step-05":
      const selection = getStep01Distribution(
        data,
        totals,
        [],
        [0],
        ["CHN", "USA", "IND", "BRA"]
      )

      const subTotal = selection.reduce((acc, cur) => acc + cur.r, 0)

      return selection.map((d, i, a) => {
        const prevRad = a
          .slice(0, i)
          .reduce(
            (acc, cur) => acc + (1000 / 100) * ((100 / subTotal) * cur.r),
            0
          )

        return { ...d, x: prevRad + d.r + 10 - 500, y: 0 }
      })
    default:
      return []
  }
}

export const useStore = create((set, get) => ({
  currentStep: "step-01",
  setCurrentStep: (currentStep) => {
    // const nodes = ["step-03", "step-04", "step-05"].includes(currentStep)
    //   ? getDistribution(currentStep, get().data)
    //   : []
    set({ currentStep })
  },

  data: [],

  timeSeriesExtentX: [],
  timeSeriesExtentY: [],
  timeSeriesData: [],

  bubblesSizeExtent: [],
  bubblesData: [],

  setData: (data, worldEmissionsRaw) => {
    set({
      data,
      timeSeriesExtentX: worldEmissionsRaw.yearExtent,
      timeSeriesExtentY: worldEmissionsRaw.valueExtent,
      timeSeriesData: worldEmissionsRaw.data,
    })
  },

  setData2: (data, worldEmissionsRaw, nodes) => {
    set({
      data,
      timeSeriesExtentX: worldEmissionsRaw.yearExtent,
      timeSeriesExtentY: worldEmissionsRaw.valueExtent,
      timeSeriesData: worldEmissionsRaw.data,
      nodes,
    })
  },

  nodes: [],
  setNodes: (nodes) => set({ nodes }),

  width: 0,
  height: 0,
  setDimensions: (width, height) => set({ width, height }),
}))

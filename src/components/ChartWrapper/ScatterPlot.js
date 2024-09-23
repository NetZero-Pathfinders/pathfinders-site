import { useMemo, useRef } from "react"
import { scaleLinear } from "d3-scale"
import { voronoi as d3voronoi } from "d3-voronoi"
import { useResizeObserver } from "usehooks-ts"
// import { Text as SVGText } from "@visx/text"
import _uniq from "lodash/uniqBy"
// import dayjs from "dayjs"
// import { useTheme } from "@chakra-ui/system"

import { useChartStore } from "./store"
import Tooltip from "./Tooltip"

export default function ScatterPlot({ orientation, chartPadding }) {
  const data = useChartStore((state) => state.data)
  const domain = useChartStore((state) => state.domain)

  const padding = {
    top: 20,
    left: 56,
    right: 24,
    bottom: 96,
    ...chartPadding,
  }

  const containerRef = useRef(null)
  const { width = 0 } = useResizeObserver({
    ref: containerRef,
    box: "border-box",
  })

  const height = (width * 9) / 16

  const xDomain = domain.x
  const yDomain = domain.y

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain(xDomain)
      .range([padding.left, width - padding.right])
  }, [JSON.stringify(xDomain), width, padding.left, padding.right])

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain(yDomain)
      .range([height - padding.bottom, padding.top])
      .nice()
  }, [JSON.stringify(yDomain), height, padding.top, padding.bottom])

  // const allValues = data.flatMap((d) => d.data)

  // const tooltipPolygons = useMemo(() => {
  //   const voronoi = d3voronoi()
  //     .size([width, height])
  //     .x((d) => xScale(d.x_val))
  //     .y((d) => yScale(d.y_val))
  //   return voronoi(allValues).polygons()
  // }, [width, height, JSON.stringify(allValues), xScale, yScale])

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${Math.max(width, 0)} ${Math.max(height, 0)}`}>
        <ChartGrid
          width={width}
          height={height}
          xScale={xScale}
          yScale={yScale}
        />
        <TooltipPinPoint
          width={width}
          height={height}
          xScale={xScale}
          yScale={yScale}
        />

        {data.map((group) => {
          return (
            <g key={group.key} fill={group.color}>
              {group.data.map((d) => {
                return (
                  <circle
                    key={d.key}
                    cx={xScale(d.x_val)}
                    cy={yScale(d.y_val)}
                    r={8}
                    stroke="#FFF"
                    strokeWidth={3}
                    paintOrder="stroke fill"
                  />
                )
              })}
            </g>
          )
        })}

        {/* {tooltipPolygons.map((d, i) => {
          const dPath = "M" + d.map((dd) => dd.join(",")).join("L") + "Z"
          return <path key={i} d={dPath} />
        })} */}
        <TooltipPolygons
          data={data}
          width={width}
          height={height}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
      <Tooltip />
    </div>
  )
}

function ChartGrid({ width, height, xScale, yScale, fontSize = 12 }) {
  const xTicks = xScale.ticks(5)
  const yTicks = yScale.ticks(5)
  const unit = useChartStore((state) => state.unit)
  const y_unit = useChartStore((state) => state.y_unit)
  const x_unit = useChartStore((state) => state.x_unit)
  return (
    <g>
      {xTicks.map((tick, i) => {
        const x = xScale(tick)
        const isLast = i === xTicks.length - 1
        return (
          <g key={i} transform={`translate(${x} 0)`}>
            <line y1={0} y2={height - fontSize - 4} stroke="#DDD" />
            <text
              alignmentBaseline="hanging"
              textAnchor="middle"
              y={height - fontSize}
              fontWeight={600}
              fontSize={fontSize}
              letterSpacing={-(fontSize * 0.02)}
            >
              {`${tick}${isLast ? ` ${x_unit || ""}` : ""}`}
            </text>
          </g>
        )
      })}
      {yTicks.map((tick, i) => {
        const y = yScale(tick)
        const isLast = i === yTicks.length - 1
        return (
          <g key={i} transform={`translate(0 ${y})`}>
            <line x1={0} x2={width} stroke="#DDD" />
            <text
              alignmentBaseline="baseline"
              y={-5}
              fontWeight={600}
              fontSize={fontSize}
              letterSpacing={-(fontSize * 0.02)}
              stroke="#FFF"
              strokeWidth={4}
              paintOrder="stroke fill"
              strokeLinejoin="round"
            >
              {`${tick}${isLast ? ` ${unit || y_unit || ""}` : ""}`}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function TooltipPinPoint({ width, height, xScale, yScale }) {
  const tooltip = useChartStore((state) => state.tooltip)

  if (!tooltip) return null

  const x = xScale(tooltip.data[0].x_val)
  const y = yScale(tooltip.data[0].y_val)
  const dPath = `M${x},0L${x},${height}M0,${y}L${width},${y}`

  return <path d={dPath} stroke="#000" opacity={0.3} />
}

function TooltipPolygons({ data, width, height, domain, xScale, yScale }) {
  // const { colors } = useTheme()

  // const tooltip = useChartStore((state) => state.tooltip)
  const setTooltip = useChartStore((state) => state.setTooltip)

  const allValues = data.flatMap((d) => d.data)

  const tooltipPolygons = useMemo(() => {
    const voronoi = d3voronoi()
      .size([width, height])
      .x((d) => xScale(d.x_val))
      .y((d) => yScale(d.y_val))
    return voronoi(allValues).polygons()
  }, [width, height, JSON.stringify(allValues), xScale, yScale])

  return (
    <g>
      {tooltipPolygons.map((tooltipPolygon, i) => {
        return (
          <path
            key={i}
            d={"M" + tooltipPolygon.map((d) => d.join(",")).join("L") + "Z"}
            fill="transparent"
            onMouseEnter={() => {
              const { data } = tooltipPolygon
              setTooltip({
                name: data.x_val,
                data: [
                  {
                    group: data.group,
                    x_val: data.x_val,
                    y_val: data.y_val,
                    unit: data.unit,
                    color: data.color,
                  },
                ],
              })
            }}
            onMouseLeave={() => {
              setTooltip(null)
            }}
          />
        )
      })}
    </g>
  )
}

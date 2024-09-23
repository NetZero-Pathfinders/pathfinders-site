import { useMemo, useRef } from "react"
import { scaleLinear, scaleBand, scaleTime, scaleUtc } from "d3-scale"
import { voronoi as d3voronoi } from "d3-voronoi"
import { useResizeObserver } from "usehooks-ts"
import { Text as SVGText } from "@visx/text"
import _uniq from "lodash/uniqBy"
import dayjs from "dayjs"
import { useTheme } from "@chakra-ui/react"

import { useChartStore } from "./store"
import Tooltip from "./Tooltip"

export default function LineChart({ chartPadding = {} }) {
  const data = useChartStore((state) => state.data)
  const domain = useChartStore((state) => state.domain)

  const padding = {
    top: 20,
    left: 56,
    right: 24,
    bottom: 96 - 2, // subtract 2 to align it with the bar chart...
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
    return scaleUtc()
      .domain([new Date(xDomain[0]), new Date(xDomain[1])])
      .range([padding.left, width - padding.right])
  }, [JSON.stringify(xDomain), width, padding.left, padding.right])

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain(yDomain)
      .range([height - padding.bottom, padding.top])
      .nice()
  }, [JSON.stringify(yDomain), height, padding.top, padding.bottom])

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${Math.max(width, 0)} ${Math.max(height, 0)}`}>
        <YAxis2 width={width} xScale={xScale} yScale={yScale} fontSize={12} />
        <XAxis2 xScale={xScale} yScale={yScale} fontSize={12} domain={domain} />
        <Lines data={data} xScale={xScale} yScale={yScale} />
        <TooltipPolygons
          data={data}
          width={width}
          height={height}
          xScale={xScale}
          yScale={yScale}
          domain={domain}
        />
      </svg>
      <Tooltip />
    </div>
  )
}

function XAxis2({ yScale, xScale, fontSize, domain }) {
  const ticks = xScale.ticks(8)

  // const [startYear, endYear] = xScale.domain().map((d) => d.getFullYear())
  // const [startMonth, endMonth] = xScale.domain().map((d) => d.getMonth())

  const valueType = domain.xValueType

  const formatLabel = (label) => {
    switch (valueType) {
      case "year":
        return dayjs(label).format("YYYY")
      case "month":
        return dayjs(label).format("MMM YYYY")
      default:
        return dayjs(label).format("DD MMM YYYY")
    }
  }

  return (
    <g transform={`translate(0 ${yScale.range()[0]})`}>
      <line
        x1={xScale.range()[0]}
        x2={xScale.range()[1]}
        stroke="#000"
        strokeWidth={2}
      />
      {ticks.map((d, i) => {
        const label = formatLabel(d)
        return (
          <g key={i} transform={`translate(${xScale(d)} 0)`}>
            <line y1={3} y2={8} stroke="#000" strokeWidth={1} />
            <SVGText
              y={12}
              textAnchor={valueType === "year" ? "middle" : "end"}
              verticalAnchor="start"
              fontSize={fontSize}
              fontWeight={600}
              angle={valueType === "year" ? 0 : -45}
            >
              {label}
            </SVGText>
          </g>
        )
      })}
    </g>
  )
}

function YAxis2({ width, yScale, xScale, fontSize }) {
  const unit = useChartStore((state) => state.unit)
  const y_unit = useChartStore((state) => state.y_unit)
  const ticks = yScale.ticks(5)
  const yAxisLabel = unit || y_unit || ""
  return (
    <g>
      {ticks.map((tick, i) => {
        const is0 = !tick
        const isFirst = !i
        const isLast = i === ticks.length - 1
        const formattedTick = parseFloat(tick).toLocaleString("en-US", {
          useGrouping: true,
        })
        return (
          <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
            <line
              x1={0}
              x2={width}
              stroke={is0 ? "#000" : "#DDD"}
              strokeWidth={is0 ? 2 : 1}
            />
            {(isFirst || isLast || is0) && (
              <SVGText
                y={-5}
                alignmentBaseline="baseline"
                fontSize={fontSize}
                lineHeight={fontSize * 1.2}
                capHeight={fontSize * 0.75}
                fontWeight={600}
                letterSpacing={-(fontSize * 0.02)}
              >
                {isLast ? `${formattedTick} ${yAxisLabel}` : formattedTick}
              </SVGText>
            )}
          </g>
        )
      })}
    </g>
  )
}

function Lines({ data, xScale, yScale }) {
  return (
    <g>
      {data.map((d) => (
        <Line
          key={d.key}
          data={d}
          color={d.color}
          xScale={xScale}
          yScale={yScale}
        />
      ))}
    </g>
  )
}

function Line({ data, color, xScale, yScale }) {
  const dPath = data.data
    .map(({ x_val, y_val }, i, a) => {
      const prev = a[i - 1]
      const prefix = !i || typeof prev.y_val === "string" ? "M" : "L"
      const x = xScale(new Date(x_val))
      const y_missing = typeof y_val === "string"
      const y = yScale(y_val)
      return y_missing ? "" : `${prefix}${x},${y}`
    })
    .join("")

  return (
    <>
      <path
        d={dPath}
        stroke={color}
        strokeWidth={3}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* {data.data.map((d, i) => {
        return (
          <circle
            key={i}
            cx={xScale(new Date(d.x_val))}
            cy={yScale(d.y_val)}
            r={3}
            fill="#000"
          />
        )
      })} */}
    </>
  )
}

function TooltipPolygons({ data, width, height, domain, xScale, yScale }) {
  const { colors } = useTheme()
  const tooltip = useChartStore((state) => state.tooltip)
  const setTooltip = useChartStore((state) => state.setTooltip)
  const tooltipPolygons = useMemo(() => {
    const voronoi = d3voronoi()
      .size([width, height])
      .x((d) => xScale(new Date(d)))
      .y(() => height / 2)
    return voronoi(domain?.allXValues || []).polygons()
  }, [width, height, JSON.stringify(domain.allXValues), xScale, yScale])
  return (
    <g>
      {tooltip && (
        <g>
          <line
            x1={xScale(new Date(tooltip.name))}
            x2={xScale(new Date(tooltip.name))}
            y1={0}
            y2={height}
            strokeWidth={3}
            stroke="#FFF"
          />
          <line
            x1={xScale(new Date(tooltip.name))}
            x2={xScale(new Date(tooltip.name))}
            y1={0}
            y2={height}
            stroke={colors.gray[300]}
          />
        </g>
      )}
      {tooltipPolygons.map((tooltipPolygon, i) => {
        return (
          <path
            key={i}
            d={"M" + tooltipPolygon.map((d) => d.join(",")).join("L") + "Z"}
            fill="transparent"
            onMouseEnter={() => {
              const relevantData = data.map((dd) => {
                const relevantPoints = dd.data.find(
                  (s) => s.x_val === tooltipPolygon.data
                )
                return {
                  x_val:
                    dd.group === "no-group"
                      ? relevantPoints?.x_val
                      : dd.group || "",
                  y_val: relevantPoints?.y_val,
                  unit: relevantPoints?.unit,
                  color: dd.color || "",
                }
              })

              const xType = domain.xValueType
              const dateFormats = {
                "year": "YYYY",
                "month": "MMM YYYY",
                "day": "DD MMM YYYY",
              }

              setTooltip({
                name: xType
                  ? dayjs(tooltipPolygon.data).format(dateFormats[xType])
                  : tooltipPolygon.data,
                data: relevantData,
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

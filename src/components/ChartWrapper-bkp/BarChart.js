import { useMemo, useState, useRef } from "react"
import { scaleLinear, scaleBand } from "d3-scale"
import { useResizeObserver } from "usehooks-ts"
import { Text as SVGText } from "@visx/text"

import { useChartStore } from "./store"
import Tooltip from "./Tooltip"

function Bar({ d, xScale, yScale, orientation }) {
  const offset =
    orientation === "horizontal" ? [xScale(d.name), 0] : [0, xScale(d.name)]

  return (
    <g key={d.key} transform={`translate(${offset[0]} ${offset[1]})`}>
      {/* <line
        x1={xScale.bandwidth() / 2}
        x2={xScale.bandwidth() / 2}
        y1={yScale.range()[1]}
        y2={yScale.range()[0]}
        stroke="#EEE"
        strokeWidth={xScale.bandwidth()}
      /> */}
      {d.data.map((dd, i, a) => {
        const sum = a.slice(0, i).reduce((acc, cur) => acc + cur.y_val, 0)

        const x1 = xScale.bandwidth() / 2
        const x2 = x1
        const y1 = yScale(sum)
        const y2 = yScale(sum + dd.y_val)
        const w = xScale.bandwidth() * 0.8

        return (
          <line
            key={`${dd.x_val}-${i}`}
            x1={orientation === "horizontal" ? x1 : y1}
            x2={orientation === "horizontal" ? x2 : y2}
            y1={orientation === "horizontal" ? y1 : x1}
            y2={orientation === "horizontal" ? y2 : x2}
            stroke={dd.color}
            strokeWidth={w}
          />
        )
      })}
    </g>
  )
}

export default function BarChart({ orientation, chartPadding = {} }) {
  const data = useChartStore((state) => state.data)
  const domain = useChartStore((state) => state.domain)

  const padding = {
    top: orientation === "horizontal" ? 20 : 20,
    left: orientation === "horizontal" ? 24 : 120,
    right: orientation === "horizontal" ? 0 : 8,
    bottom: orientation === "horizontal" ? 96 : 0,
    ...chartPadding,
  }

  const containerRef = useRef(null)

  const { width = 0 } = useResizeObserver({
    ref: containerRef,
    box: "border-box",
  })

  const barWidth = (width - padding.left - padding.right) / data.length

  const height =
    orientation === "horizontal"
      ? (width * 9) / 16
      : padding.top + padding.bottom + data.length * barWidth

  const xDomain = domain.x
  const yDomain = domain.y

  const xScale = useMemo(() => {
    const ranges = {
      "horizontal": [padding.left, width - padding.right],
      "vertical": [padding.top, height - padding.bottom],
    }
    return scaleBand()
      .domain(xDomain)
      .range(ranges[orientation] || ranges.horizontal)
      .padding(0)
  }, [
    JSON.stringify(xDomain),
    width,
    height,
    padding.top,
    padding.bottom,
    padding.left,
    padding.right,
    orientation,
  ])

  const yScale = useMemo(() => {
    const ranges = {
      "horizontal": [height - padding.bottom, padding.top],
      "vertical": [padding.left, width - padding.right],
    }
    return scaleLinear().domain(yDomain).range(ranges[orientation]).nice()
  }, [
    JSON.stringify(yDomain),
    width,
    height,
    padding.top,
    padding.bottom,
    padding.left,
    padding.right,
    orientation,
  ])

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${Math.max(width, 0)} ${Math.max(height, 0)}`}>
        <YAxis
          orientation={orientation}
          width={width}
          xScale={xScale}
          yScale={yScale}
          fontSize={12}
        />

        {data.map((d) => {
          return (
            <Bar
              key={d.key}
              d={d}
              xScale={xScale}
              yScale={yScale}
              orientation={orientation}
            />
          )
        })}

        <XAxis
          orientation={orientation}
          xScale={xScale}
          yScale={yScale}
          data={data}
          padding={padding}
          strokeWidth={2}
          gap={2}
          stroke="#000"
          fontSize={12}
        />

        <Tooltips
          data={data}
          xScale={xScale}
          yScale={yScale}
          width={width}
          height={height}
          orientation={orientation}
        />
      </svg>
      <Tooltip />
    </div>
  )
}

function YAxis({ orientation, width, xScale, yScale, fontSize = 12 }) {
  const unit = useChartStore((state) => state.unit)
  const y_unit = useChartStore((state) => state.y_unit)
  const ticks = yScale.ticks(5)
  const yAxisLabel = unit || y_unit || ""
  return (
    <g>
      {orientation !== "horizontal" && (
        <SVGText
          x={yScale.range()[0] + (yScale.range()[1] - yScale.range()[0]) / 2}
          y={xScale.range()[0] - 5}
          textAnchor="middle"
          alignmentBaseline="hanging"
          fontSize={fontSize}
          lineHeight={fontSize * 1.2}
          capHeight={fontSize * 0.75}
          fontWeight={600}
          letterSpacing={-(fontSize * 0.02)}
        >
          {yAxisLabel}
        </SVGText>
      )}

      {ticks.map((tick, i) => {
        const isFirst = !i
        const isLast = i === ticks.length - 1
        const isHorizontal = orientation === "horizontal"

        const gap = 1
        const strokeWidth = isFirst ? 2 : 1
        const offset = isFirst ? strokeWidth / 2 + gap : 0

        const x = isHorizontal
          ? [0, width]
          : [yScale(tick) - offset, yScale(tick) - offset]

        const y = isHorizontal
          ? [yScale(tick) + offset, yScale(tick) + offset]
          : xScale.range()

        return (
          <g key={tick}>
            <line
              x1={x[0]}
              x2={x[1]}
              y1={y[0]}
              y2={y[1]}
              stroke={isFirst ? "#000" : "#DDD"}
              strokeWidth={strokeWidth}
            />
            {(isFirst || isLast) && (
              <SVGText
                x={isHorizontal ? x[0] : isFirst ? x[0] : x[0] + fontSize / 4}
                y={y[0] - 5}
                alignmentBaseline="baseline"
                textAnchor={isHorizontal ? "start" : isFirst ? "middle" : "end"}
                fontSize={fontSize}
                lineHeight={fontSize * 1.2}
                capHeight={fontSize * 0.75}
                fontWeight={600}
                letterSpacing={-(fontSize * 0.02)}
              >
                {isLast && isHorizontal
                  ? `${parseFloat(tick).toLocaleString("en-us")} ${yAxisLabel}`
                  : parseFloat(tick).toLocaleString("en-us")}
              </SVGText>
            )}
          </g>
        )
      })}
    </g>
  )
}

function XAxis({
  orientation,
  xScale,
  yScale,
  strokeWidth = 2,
  gap = 2,
  stroke = "#000",
  padding,
  data,
  fontSize = 12,
}) {
  const offset = strokeWidth / 2 + gap

  const paths = {
    "horizontal": [
      [xScale.range()[0], yScale.range()[0] + offset],
      [xScale.range().slice(-1)[0], yScale.range()[0] + offset],
    ],
    "vertical": [
      [yScale.range()[0] - offset, xScale.range()[0]],
      [yScale.range()[0] - offset, xScale.range().slice(-1)[0]],
    ],
  }

  // const coordinates = paths[orientation] || paths.horizontal

  return (
    <g>
      {/* <line
        x1={coordinates[0][0]}
        x2={coordinates[1][0]}
        y1={coordinates[0][1]}
        y2={coordinates[1][1]}
        strokeWidth={strokeWidth}
        stroke={stroke}
      /> */}

      {data.map((d, i) => {
        const offset = 8
        const x =
          orientation === "horizontal"
            ? xScale(d.name) + xScale.bandwidth() / 2
            : yScale(0) - offset
        const y =
          orientation === "horizontal"
            ? yScale(0) + offset
            : xScale(d.name) + xScale.bandwidth() / 2

        const isHorizontal = orientation === "horizontal"

        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <SVGText
              x={0}
              y={isHorizontal ? 4 : 0}
              width={isHorizontal ? xScale.bandwidth() * 0.95 : padding.left}
              textAnchor={isHorizontal ? "middle" : "end"}
              verticalAnchor={isHorizontal ? "start" : "middle"}
              fontSize={fontSize}
              lineHeight={fontSize * 1.2}
              capHeight={fontSize * 0.75}
              fontWeight={600}
              letterSpacing={-(fontSize * 0.02)}
            >
              {d.name}
            </SVGText>
          </g>
        )
      })}
    </g>
  )
}

function Tooltips({ data, xScale, yScale, width, height, orientation }) {
  return (
    <g>
      {data.map((d) => {
        const coordinates = {
          "horizontal": [xScale(d.name), 0],
          "vertical": [0, xScale(d.name)],
        }[orientation]

        const dimensions = {
          "horizontal": [xScale.bandwidth(), height],
          "vertical": [width, xScale.bandwidth()],
        }[orientation]

        return (
          <TooltipRect
            key={d.key}
            data={d}
            x={coordinates[0]}
            y={coordinates[1]}
            width={dimensions[0]}
            height={dimensions[1]}
          />
        )
      })}
    </g>
  )
}

function TooltipRect({ data, ...restProps }) {
  const setTooltip = useChartStore((state) => state.setTooltip)
  const [isActive, setIsActive] = useState(false)

  const handleMouseEnter = () => {
    setIsActive(true)
    setTooltip(data)
  }

  const handleMouseLeave = () => {
    setIsActive(false)
    setTooltip(null)
  }

  return (
    <rect
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      fill={isActive ? "rgba(0,0,0,0.05)" : "transparent"}
      style={{ outline: "none" }}
      {...restProps}
    />
  )
}

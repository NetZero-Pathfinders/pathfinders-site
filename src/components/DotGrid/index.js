import { range } from "d3-array"
import { useIsClient } from "usehooks-ts"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function DotGridWrapper(props) {
  const isClient = useIsClient()
  if (!isClient) return null
  return <DotGrid {...props} />
}

function DotGrid({
  dotSize = 1.5,
  accentSize,
  xTiles = 1,
  yTiles = 1,
  tileSize = 160,
  dotCount = 11,
  dotFill = "currentcolor",
  accentFill,
  padding = "seamless",
  ...props
}) {
  const { ref, inView } = useInView({ threshold: 0 })

  const accentSizeFixed = accentSize || dotSize * 2.5
  const paddingFixed =
    {
      seamless: {
        x: tileSize / dotCount / 2,
        y: tileSize / dotCount / 2,
      },
      minimal: {
        x: accentSizeFixed,
        y: accentSizeFixed,
      },
    }[padding] || padding

  const colCount = xTiles * (dotCount - 1) + 1
  const rowCount = yTiles * (dotCount - 1) + 1

  const columns = range(colCount)
  const rows = range(rowCount)

  const w =
    xTiles * tileSize - (tileSize / dotCount) * xTiles + paddingFixed.x * 2
  const h =
    yTiles * tileSize - (tileSize / dotCount) * yTiles + paddingFixed.y * 2

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} {...props}>
        {inView
          ? rows?.map((row) => {
              const rowHasAccents = !row || !(row % (dotCount - 1))
              return (
                <motion.g
                  key={row}
                  transform={`translate(${paddingFixed.x} ${
                    paddingFixed.y + (row * tileSize) / dotCount
                  })`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, bounce: 0, delay: 0.2 }}
                >
                  {columns?.map((column, i) => {
                    const colHasAccents = !column || !(column % (dotCount - 1))
                    const isAccent = rowHasAccents && colHasAccents
                    const x = (column * tileSize) / dotCount
                    const isEven = i % 2
                    return isAccent ? (
                      <path
                        key={column}
                        d={`M${x - accentSizeFixed},0L${
                          x + accentSizeFixed
                        },0M${x},${-accentSizeFixed}L${x},${accentSizeFixed}`}
                        stroke={accentFill || dotFill}
                        strokeWidth={accentSizeFixed / 2}
                      />
                    ) : isEven ? (
                      <motion.circle
                        key={column}
                        cx={x}
                        animate={{ opacity: [0.3, 1] }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 0.5,
                          repeatDelay:
                            Math.round(Math.random() * 10) / 10 + 0.5,
                        }}
                        r={
                          rowHasAccents && colHasAccents
                            ? accentSizeFixed
                            : dotSize
                        }
                        fill={
                          rowHasAccents && colHasAccents ? accentFill : dotFill
                        }
                        fillOpacity={Math.max(
                          0.4,
                          Math.round(Math.random() * 10) / 10
                        )}
                      />
                    ) : (
                      <circle
                        key={column}
                        cx={x}
                        r={
                          rowHasAccents && colHasAccents
                            ? accentSizeFixed
                            : dotSize
                        }
                        fill={
                          rowHasAccents && colHasAccents ? accentFill : dotFill
                        }
                        fillOpacity={Math.max(
                          0.4,
                          Math.round(Math.random() * 10) / 10
                        )}
                      />
                    )
                  })}
                </motion.g>
              )
            })
          : null}
      </svg>
    </div>
  )
}

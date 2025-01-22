import { useRef } from "react"
import { useEventListener } from "usehooks-ts"
import dayjs from "dayjs"

import { useChartStore } from "./store"

function isDate(val) {
  const parts = val.split("-")
  return (
    parts.length === 3 &&
    parts[0].length === 4 &&
    parts[1].length === 2 &&
    parts[2].length === 2
  )
}

export default function Tooltip() {
  const tooltipRef = useRef(null)
  const tooltip = useChartStore((state) => state.tooltip)

  const handleMove = (e) => {
    const $el = tooltipRef.current
    const $parent = $el?.parentElement?.getBoundingClientRect() || {}
    const $tooltip = $el?.getBoundingClientRect() || {}

    const xBorder = $parent.left + $parent.width / 2
    const yBorder = $parent.top + $parent.height / 2

    const xOffset = e.clientX
    const yOffset = e.clientY

    tooltipRef.current.style.top =
      yOffset > yBorder ? yOffset - $tooltip.height + "px" : yOffset + "px"
    tooltipRef.current.style.left =
      xOffset > xBorder ? xOffset - $tooltip.width + "px" : xOffset + "px"
  }

  useEventListener(
    "mousemove",
    handleMove,
    tooltipRef.current?.parentElement
      ? {
          current: tooltipRef.current?.parentElement,
        }
      : null
  )

  // TODO: Check that the .reverse call works proeprly...

  return (
    <div
      ref={tooltipRef}
      style={{
        position: "fixed",
        zIndex: 999,
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      {tooltip && (
        <div
          style={{
            padding: "1rem",
            background: "#000",
            color: "#FFF",
            margin: "0.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "24rem",
          }}
        >
          <table>
            <tbody>
              {tooltip.name && (
                <tr
                  style={{
                    fontSize: "1em",
                    lineHeight: "calc(1em + 0.25rem)",
                    fontWeight: 600,
                  }}
                >
                  <td colSpan={2} style={{ paddingBottom: "0.5rem" }}>
                    <div
                      style={{
                        paddingBottom: "0.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <span>{tooltip.name || ""}</span>
                      <span>
                        {tooltip.data[0].unit || tooltip.data[0].y_unit
                          ? `${tooltip.data[0].unit || tooltip.data[0].y_unit}`
                          : ""}
                      </span>
                    </div>
                    <hr />
                  </td>
                </tr>
              )}

              {tooltip.data
                ?.slice()
                .reverse()
                .map((d, i) => {
                  return (
                    <tr
                      key={i}
                      style={{
                        fontSize: "1em",
                        lineHeight: "calc(1em + 0.25rem)",
                      }}
                    >
                      <td
                        style={{
                          fontWeight: 600,
                          verticalAlign: "top",
                          padding: "0.25rem 0.75rem 0.25rem 0",
                          textTransform: "capitalize",
                        }}
                      >
                        {d.color && tooltip.data.length > 1 && (
                          <div
                            style={{
                              width: "0.875rem",
                              height: "0.875rem",
                              background: "#FFF",
                              display: "inline-block",
                              verticalAlign: "middle",
                              transform: "translateY(-0.125rem)",
                              marginRight: "0.5rem",
                              background: d.color,
                            }}
                          />
                        )}

                        {d.group ||
                          (isDate(d.x_val || "")
                            ? dayjs(d.x_val).format("DD MMM YYYY")
                            : d.x_val) ||
                          "N/A"}
                      </td>
                      <td
                        style={{
                          verticalAlign: "top",
                          padding: "0.25rem 0 0.25rem 0.75rem",
                          textAlign: "end",
                        }}
                      >
                        {d.y_val.toLocaleString("en-us")}
                        {` ${
                          tooltip.data.length === 1
                            ? d.unit || d.y_unit || ""
                            : ""
                        }`}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

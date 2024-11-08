import { useRef } from "react"
import { useEventListener } from "usehooks-ts"

import { useChartStore } from "./store"

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
                    <div style={{ paddingBottom: "0.5rem" }}>
                      {tooltip.name || ""}
                    </div>
                    <hr />
                  </td>
                </tr>
              )}

              {/* {tooltip.data?.length > 1 && (
                <tr
                  style={{
                    fontSize: "1em",
                    lineHeight: "calc(1em + 0.25rem)",
                    fontWeight: 600,
                  }}
                >
                  <td colSpan={2} style={{ paddingBottom: "0.5rem" }}>
                    <div style={{ paddingBottom: "0.5rem" }}>
                      {tooltip.name || ""}
                    </div>
                    <hr />
                  </td>
                </tr>
              )} */}
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
                        }}
                      >
                        {d.color && (
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

                        {d.group || d.x_val || "N/A"}
                      </td>
                      <td
                        style={{
                          verticalAlign: "top",
                          padding: "0.25rem 0 0.25rem 0.75rem",
                        }}
                      >{`${d.y_val} ${d.unit || ""}`}</td>
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

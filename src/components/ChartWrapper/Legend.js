import { useChartStore } from "./store"

export default function Legend() {
  const legend = useChartStore((state) => state.legend)

  if (!legend.length) return null

  console.log("LEGEND: ", legend)

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {legend.map(({ name, color }) => {
        return (
          <div
            key={name}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "0.5rem",
              overflow: "hidden",
            }}
          >
            <div style={{ width: "1rem", height: "1rem", background: color }} />
            <div
              style={{
                "whiteSpace": "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

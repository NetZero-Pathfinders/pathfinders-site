import CombinedDiagram from "./CombinedDiagram"

export { default as ActionsByStakeholder } from "./ActionsByStakeholder"
export { default as CombinedDiagram } from "./CombinedDiagram"

export const ActionsByPillar = (props) => {
  return <CombinedDiagram selectedView={0} {...props} />
}

export const ActionsBySector = (props) => {
  return <CombinedDiagram selectedView={1} {...props} />
}

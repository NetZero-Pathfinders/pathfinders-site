import StakeholdersDiagramPillars from "@/components/StakeholdersDiagram/StakeholdersDiagramPillars"
import StakeholdersDiagramStakeholders from "@/components/StakeholdersDiagram/StakeholdersDiagramStakeholders"
import StakeholdersDiagramSectors from "@/components/StakeholdersDiagram/StakeholdersDiagramSectors"

export default function FallbackView({ pillars, stakeholders, sectors }) {
  const filteredSectors = sectors.filter((d) => d.type === "sector")
  return (
    <>
      <StakeholdersDiagramPillars pillars={pillars} />
      <StakeholdersDiagramStakeholders stakeholders={stakeholders} />
      <StakeholdersDiagramSectors sectors={filteredSectors} />
    </>
  )
}

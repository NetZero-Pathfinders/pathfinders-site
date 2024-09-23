import { Box, Stack, Container } from "@chakra-ui/react"

import StakeholdersDiagramPillars from "@/components/StakeholdersDiagram/StakeholdersDiagramPillars"
import StakeholdersDiagramStakeholders from "@/components/StakeholdersDiagram/StakeholdersDiagramStakeholders"
import StakeholdersDiagramSectors from "@/components/StakeholdersDiagram/StakeholdersDiagramSectors"
import StakeholdersDiagramBackground from "@/components/StakeholdersDiagram/StakeholdersDiagramBackground"
import FallbackView from "@/components/StakeholdersDiagram/FallbackView"

export { default as GroupHeading } from "@/components/StakeholdersDiagram/GroupHeading"
export { default as ArrowBox } from "@/components/StakeholdersDiagram/ArrowBox"

export default function StakeholdersDiagram({
  pillars,
  sectors,
  children,
  hideBackground,
  stakeholders,
}) {
  return (
    <Box w="100vw" left="50%" transform="translateX(-50%)" position="relative">
      {!hideBackground && <StakeholdersDiagramBackground />}
      <Container>
        <Stack spacing={6} px={5} zIndex={1}>
          {children || (
            <FallbackView
              pillars={pillars}
              stakeholders={stakeholders}
              sectors={sectors}
            />
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export {
  StakeholdersDiagramPillars,
  StakeholdersDiagramStakeholders,
  StakeholdersDiagramSectors,
  StakeholdersDiagramBackground,
  FallbackView,
}

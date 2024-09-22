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
  // stakeholders = [
  //   {
  //     key: 1,
  //     title: "Financials",
  //     description:
  //       "Replicating proven private investment models in more mature markets is fundamental to accelerate deployment of today’s net-zero technologies.",
  //   },
  //   {
  //     key: 2,
  //     title: "Policy makers",
  //     description:
  //       "The scope of the climate crisis is forcing policymakers to take a multi-decadal view of the problem but policies are only as good as the frameworks that exist to implement and enforce them.",
  //   },
  //   {
  //     key: 3,
  //     title: "Consumers",
  //     description:
  //       "Public acceptance and understanding of clean alternatives is fundamental to ensuring fast deployment of green technologies and solutions.",
  //   },
  //   {
  //     key: 4,
  //     title: "Companies",
  //     description:
  //       "The private sector can help unlock new low carbon markets. In addition to providing asset financing. The private sector can also communicate guidelines for factors that make projects more appealing to investors.",
  //   },
  // ],
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

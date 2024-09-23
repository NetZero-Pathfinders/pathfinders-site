import { Box } from "@chakra-ui/react"

import DotGrid from "@/components/DotGrid"

export { default as GroupHeading } from "@/components/StakeholdersDiagram/GroupHeading"
export { default as ArrowBox } from "@/components/StakeholdersDiagram/ArrowBox"

export default function StakeholdersDiagramBackground() {
  return (
    <>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, white, gray.100 25%, gray.100 75%, white)"
      />
      <DotGrid
        xTiles={3}
        yTiles={3}
        dotFill="#D9D9D9"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}

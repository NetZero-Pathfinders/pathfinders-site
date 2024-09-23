import { Box } from "@chakra-ui/react"

import baseComponents from "@/components/MDXComponents/baseComponents"
import { ActionsBySector } from "@/components/ActionsDiagram"

export default {
  ...baseComponents,
  SolutionsBySector: (props) => {
    return (
      <Box gridColumn="1 / -1">
        <ActionsBySector sector={props.sector || 1} />
      </Box>
    )
  },
}

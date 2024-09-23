import { SimpleGrid, Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"

export default function BannerBody(props) {
  return (
    <Box
      gridColumn={["1 / -1", null, null, "1 / -3"]}
      gridRow="2"
      alignSelf="start"
    >
      <SimpleGrid columns={6} spacing={6}>
        <Box gridColumn={["1 / -1", null, null, "1 / -3"]} {...props} />
      </SimpleGrid>
    </Box>
  )
}

import { Stack, Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"

export default function BannerHeader(props) {
  return (
    <Stack
      gridColumn={["1 / -1", null, null, "1 / -3"]}
      gridRow="1"
      alignSelf="end"
      pt={12}
      spacing={3}
    >
      <Box
        borderTop="0.0625rem solid"
        borderColor="gray.200"
        pt={12}
        {...props}
      />
    </Stack>
  )
}

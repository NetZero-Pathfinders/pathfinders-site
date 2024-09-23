import { Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"

import DotGrid from "@/components/DotGrid"

export default function BannerGrid({ color = "gray.400", ...restProps }) {
  return (
    <Box
      gridColumn="-3 / -1"
      gridRow="1"
      color={color}
      overflow="visible"
      alignSelf="start"
    >
      <DotGrid xTiles={3} yTiles={2} {...restProps} />
    </Box>
  )
}
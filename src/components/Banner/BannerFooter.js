import { Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"

export default function BannerFooter(props) {
  return <Box gridColumn="-3 / -1" gridRow="2" alignSelf="end" {...props} />
}

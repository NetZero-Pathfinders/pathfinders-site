import _groupBy from "lodash/groupBy"
import { Stack } from "@chakra-ui/react"

import {
  BestPracticeListingItem,
  useStore,
} from "@/components/BestPracticeListing"

export default function FilteredItems() {
  const filteredItems = useStore((state) => state.filteredItems)
  return (
    <Stack spacing={0} gridColumn="3 / -1" minH="100vh" py={5}>
      {filteredItems.map((item, i) => (
        <BestPracticeListingItem key={i} {...item} />
      ))}
    </Stack>
  )
}

import { Text } from "@chakra-ui/react"

import { useStore } from "@/components/BestPracticeListing/useStore"

export default function ItemCount() {
  const filteredItems = useStore((state) => state.filteredItems)
  return (
    <Text fontSize="lg" fontWeight={600} color="gray.400">
      {`${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"}`}
    </Text>
  )
}

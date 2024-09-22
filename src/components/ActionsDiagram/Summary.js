import { Text } from "@chakra-ui/layout"
import _groupBy from "lodash/groupBy"
import { create } from "zustand"

export const useSummaryStore = create((set) => ({
  category: "",
  actions: "",
  words: ["to", "5 sectors"],
  setCurrentSummary: (summary, sectors, pillars) => {
    const category = summary.currentPillar
      ? pillars.find((s) => s.key === summary.currentPillar)?.title || ""
      : sectors.find((s) => s.key === summary.currentSector)?.title || ""

    const words = summary.currentPillar
      ? ["to", "5 sectors"]
      : ["for", "4 pillars"]
    set({
      actions: `${summary?.actions?.length || 0}`,
      category,
      words,
    })
  },
}))

export function Summary() {
  const actionCount = useSummaryStore((state) => state.actions)
  const category = useSummaryStore((state) => state.category)
  const words = useSummaryStore((state) => state.words)
  return (
    <Text fontSize="2xl" lineHeight="short" color="gray.500" maxW="40rem">
      <Text as="span" color="blue.500" fontWeight={600} lineHeight="short">
        {`${actionCount} action${actionCount === 1 ? "" : "s"}`}
      </Text>
      {` ${words[0]} `}
      <Text as="span" color="blue.500" fontWeight={600} lineHeight="short">
        {category}
      </Text>
      {" across "}
      <Text as="span" color="blue.500" fontWeight={600} lineHeight="short">
        {words[1]}
      </Text>
      {"."}
    </Text>
  )
}

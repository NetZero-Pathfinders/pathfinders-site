import _groupBy from "lodash/groupBy"
import { Box, HStack, Button, Select } from "@chakra-ui/react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

import { CloseIcon } from "@/components/Icon"
import { useStore } from "@/components/BestPracticeListing"

export default function SelectedFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchTerms = useStore((state) => state.searchTerms)
  // const filteredItems = useStore((state) => state.filteredItems)
  const removeSearchTerm = useStore((state) => state.removeSearchTerm)

  // const count = filteredItems.length

  const handleRemove = (searchTerm) => (e) => {
    const $prevSiblingButton =
      e.target?.parentElement?.previousSibling?.children[1]
    const $nextSiblingButton = e.target?.parentElement?.nextSibling?.children[1]
    if ($prevSiblingButton) $prevSiblingButton.focus()
    else if ($nextSiblingButton) $nextSiblingButton.focus()
    else document.querySelector("#best-practice-filter-search")?.focus()
    removeSearchTerm(searchTerm, router, pathname, searchParams)
  }

  return (
    <HStack gap={6} borderBottom="0.0625rem solid" borderColor="gray.200" h={16}>
      <Box flex={1} position="relative" h={16}>
        <HStack gap={3} h={16} position="absolute" top={0} left={0} right={0}>
          {searchTerms.map((searchTerm) => {
            return (
              <HStack
                key={searchTerm}
                gap={1}
                bg="gray.100"
                h="2.5rem"
                pl={3}
                minW="5.25rem"
                flex="0 1 auto"
              >
                <Box
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontWeight={600}
                >
                  {searchTerm}
                </Box>
                <Button
                  px={0}
                  borderRadius={0}
                  onClick={handleRemove(searchTerm)}
                  _focusVisible={{ outlineColor: "gray.800", bg: "gray.200" }}
                >
                  <CloseIcon />
                </Button>
              </HStack>
            )
          })}
        </HStack>
      </Box>
      <Box flex="none">
        <BestPracticeSorting />
      </Box>
    </HStack>
  )
}

function BestPracticeSorting() {
  const searchTerms = useStore((state) => state.searchTerms)
  const sorting = useStore((state) => state.sorting)
  const updateSorting = useStore((state) => state.updateSorting)
  return (
    <Select
      fontSize="lg"
      fontWeight={600}
      variant="filled"
      borderRadius="none"
      _focusVisible={{
        outline: "0.125rem solid",
        outlineColor: "black",
        outlineOffset: "0.125rem",
      }}
      value={sorting}
      isDisabled={!searchTerms.length}
      onChange={(e) => updateSorting(e.target.value)}
    >
      <option value="latest">{"Latest"}</option>
      <option value="relevance">{"Relevance"}</option>
    </Select>
  )
}

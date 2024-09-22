import _groupBy from "lodash/groupBy"
import {
  Box,
  Stack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Tag,
  Checkbox,
} from "@chakra-ui/react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

import { useStore } from "@/components/BestPracticeListing"

export default function SidebarFilters({ filters }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchTerms = useStore((state) => state.searchTerms)
  const addSearchTerm = useStore((state) => state.addSearchTerm)
  const removeSearchTerm = useStore((state) => state.removeSearchTerm)
  const sidebarVisible = useStore((state) => state.sidebarVisible)

  const handleFilterChange = (s) => (e) => {
    const isChecked = e.target.checked
    if (isChecked) addSearchTerm(s, router, pathname, searchParams)
    if (!isChecked) removeSearchTerm(s, router, pathname, searchParams)
  }

  return (
    <Box style={{ display: sidebarVisible ? "block" : "none" }}>
      <Accordion defaultIndex={[0]} allowMultiple>
        {filters.map((filterGroup) => {
          const lcSearchTerms = searchTerms.map((d) => d.toLowerCase())
          const count = filterGroup.items.filter((d) =>
            lcSearchTerms.includes(d.toLowerCase())
          ).length

          return (
            <AccordionItem
              key={filterGroup.name}
              borderTop={0}
              borderBottom="0.0625rem solid"
              borderBottomColor="gray.200"
            >
              <AccordionButton textAlign="left" px={3} h="3.75rem">
                <Heading as="h3" fontSize="lg" flex="1">
                  {filterGroup.name}
                  {count ? (
                    <Tag ml={2} colorScheme="blue">
                      {count}
                    </Tag>
                  ) : (
                    ""
                  )}
                </Heading>
                <AccordionIcon w="1.5rem" h="1.5rem" />
              </AccordionButton>
              <AccordionPanel px={3} pt={4} pb={8}>
                <Stack gap={3}>
                  {filterGroup.items.map((filterItem) => {
                    return (
                      <Checkbox
                        key={filterItem}
                        isChecked={lcSearchTerms.includes(
                          filterItem.toLowerCase()
                        )}
                        onChange={handleFilterChange(filterItem)}
                        fontWeight={500}
                        lineHeight="shorter"
                        alignItems="flex-start"
                        sx={{
                          "span:first-of-type": {
                            w: "1.25rem",
                            h: "1.25rem",
                            borderRadius: 0,
                            _checked: {
                              bg: "blue.400",
                              borderColor: "blue.400",
                            },
                            _focusVisible: {
                              outline: "0.125rem solid",
                              outlineOffset: "0.125rem",
                              outlineColor: "blue.400",
                              boxShadow: "none",
                              borderColor: "blue.400",
                            },
                          },
                        }}
                      >
                        {filterItem}
                      </Checkbox>
                    )
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </Box>
  )
}

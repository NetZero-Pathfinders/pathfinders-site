import { useEffect, useState } from "react"
import {
  Box,
  // Center,
  Heading,
  Container,
  Divider,
  Stack,
  SimpleGrid,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { matchSorter } from "match-sorter"

import getNavigation from "@/utils/api/server/getNavigation"
import fetchDataset from "@/utils/api/client/fetchDataset"
import groupResults from "@/components/QuickSearch/groupResults"
import { ButtonLink } from "@/components/Link"
import { ArrowRightIcon } from "@/components/Icon"

function updateSearchParams(searchTerms, router, pathname, searchParams) {
  const params = new URLSearchParams(searchParams?.toString() || "")
  const searchTermsStr = searchTerms.join(",")
  const hasSearchTerms = searchTermsStr.length
  params.set("q", searchTermsStr)
  const finalUrl = hasSearchTerms
    ? `${pathname}?${params.toString()}`
    : pathname
  router.replace(finalUrl, {
    shallow: true,
    scroll: false,
  })
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("q")
  const pathname = usePathname()
  const router = useRouter()

  const [searchValue, setSearchValue] = useState(searchTerm)
  const [referenceItems, setReferenceItems] = useState([])
  const [inputItems, setInputItems] = useState([])

  useEffect(() => {
    if (typeof window === "undefined") return

    Promise.all([
      fetchDataset(`/data/search-index-full.txt`, "json"),
      fetchDataset(`/data/sectors/all.txt`, "json"),
      fetchDataset(`/data/stakeholders/all.txt`, "json"),
      fetchDataset(`/data/pillars/all.txt`, "json"),
      // fetch(`/data/search-index-full.json`).then((res) => res.json()),
      // fetch(`/data/sectors/all.json`).then((res) => res.json()),
      // fetch(`/data/stakeholders/all.json`).then((res) => res.json()),
      // fetch(`/data/pillars/all.json`).then((res) => res.json()),
    ]).then(
      ([bestPracticesIndex, sectorsIndex, stakeholdersIndex, pillarsIndex]) => {
        const correctedSearchIndex = [
          ...bestPracticesIndex.map((d) => ({
            label: d.title,
            href: `/best-practices/${d.name.split(".")[0]}`,
            type: "best-practice",
            content: d.content || "",
          })),
          ...sectorsIndex.map((d) => ({
            label: d.title,
            href: `/sectors/${d.title
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-")}`,
            type: "sector",
            content: d.content || "",
          })),
          ...stakeholdersIndex.map((d) => ({
            label: d.title,
            href: `/stakeholders/${d.title
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-")}`,
            type: "stakeholder",
            content: d.content || "",
          })),
          ...pillarsIndex.map((d) => ({
            label: d.title,
            href: `/pillars/pillar-${d.key}`,
            type: "pillar",
            content: d.content || "",
          })),
        ].map((d, i) => ({ key: i + 1, ...d }))

        setReferenceItems(correctedSearchIndex)
      }
    )
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!searchTerm) return
    setSearchValue(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!referenceItems.length) return
    if (!searchValue) return
    const results = matchSorter(referenceItems, searchValue, {
      keys: ["label", "type", "content"],
      threshold: matchSorter.rankings.CONTAINS,
    })
    const groupedItems = groupResults("", results)
    setInputItems(groupedItems.slice(0, -1))
  }, [searchValue, JSON.stringify(referenceItems)])

  useEffect(() => {
    if (typeof window === "undefined") return
    document.querySelector("input[type='search']")?.focus()
  }, [])

  return (
    <Box minH="100vh" pt={24} pb={24}>
      <Container>
        <Divider />

        <Heading fontSize="3xl" textAlign="center" py={10}>
          {searchValue ? `Search results for: "${searchValue}"` : "Search"}
        </Heading>

        <SimpleGrid columns={8} gap={6}>
          <HStack
            as="form"
            spacing={1}
            gridColumn="2 / -2"
            borderBottom="0.0625rem solid"
            borderColor="gray.200"
            pb={6}
            onSubmit={(e) => {
              e.preventDefault()
              const $input = e.target.querySelector("input")
              const value = $input.value
              $input.value = ""
              updateSearchParams([value], router, pathname, searchParams)
            }}
          >
            <Input placeholder="Search..." size="xl" type="Search" />
            <Button type="submit" colorScheme="blue" size="xl" flex="none">
              {"Search"}
            </Button>
          </HStack>
          {/* <Box gridColumn="2 / -2">
            {"Try searching for Japan, Brazil, or Energy"}
          </Box> */}
          <Stack gridColumn="2 / -2" spacing={3}>
            {inputItems.map((item) => {
              const isGroupStart = item.type === "group-start"
              return isGroupStart ? (
                <Box key={item.key} fontWeight={700} fontSize="2xl">
                  {`${item.label[0].toUpperCase()}${item.label
                    .slice(1)
                    .split("-")
                    .join(" ")}s`}
                </Box>
              ) : (
                <Box key={item.key} sx={{ "a": { w: "100%" } }}>
                  <ButtonLink
                    href={item.href}
                    size="lg-variable"
                    variant="defaultLink"
                    colorScheme="blue"
                    rightIcon={
                      <ArrowRightIcon size="2rem" isAnimated="right" />
                    }
                  >
                    {item.label}
                  </ButtonLink>
                </Box>
              )
            })}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  return { props: { navigation } }
}

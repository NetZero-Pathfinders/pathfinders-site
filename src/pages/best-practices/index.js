import { useEffect } from "react"
import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import {
  Box,
  Stack,
  HStack,
  Heading,
  Container,
  useMediaQuery,
} from "@chakra-ui/react"

import getNavigation from "@/utils/api/server/getNavigation"
import getContent from "@/utils/api/server/getContent"
import getPages from "@/utils/api/server/getPages"

import SEO from "@/components/SEO"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderSubtitle,
  PageHeaderLinks,
} from "@/components/PageHeader"
import { ButtonLink } from "@/components/Link"
import { ArrowRightIcon } from "@/components/Icon"
import {
  useStore,
  SidebarFilters,
  SelectedFilters,
  FilteredItems,
  KeywordSearch,
  ItemCount,
  SidebarClose,
} from "@/components/BestPracticeListing"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "Best practices",
  introduction:
    "Through trial and error, governments and others have been testing low-carbon policies for more than two decades. Pathfinders therefore highlights ‘best practices’ – that is, tried-and-true programs that have proved effective at driving decarbonization, as well as newer measures with high potential for future impact.",
  links: [
    { key: 1, label: "NetZero pillars", href: "/" },
    { key: 2, label: "Emitting sectors", href: "/" },
  ],
}

function Sidebar({ filters }) {
  const sidebarVisible = useStore((state) => state.sidebarVisible)
  const setSidebarVisible = useStore((state) => state.setSidebarVisible)

  const [isDesktop] = useMediaQuery("(min-width: 50rem)")

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    setSidebarVisible(isDesktop)
  }, [isDesktop])

  if (!sidebarVisible) return null

  return (
    <Box flex="none" w="calc((100% - 6 * 0.75rem) / 8 * 2)">
      <HStack
        h={16}
        spacing={3}
        pr={1}
        justifyContent="space-between"
        borderBottom="0.0625rem solid"
        borderColor="gray.200"
      >
        <Heading fontSize="2xl" fontWeight={600} color="gray.500">
          {"Filters"}
        </Heading>
        <Box zIndex={1}>
          <SidebarClose />
        </Box>
      </HStack>
      <HStack
        h={16}
        spacing={1}
        borderBottom="0.0625rem solid"
        borderColor="gray.200"
      >
        <ItemCount />
      </HStack>
      <SidebarFilters filters={filters} />
    </Box>
  )
}

export default function BestPracticesPage({ bestPractices, filters }) {
  const setSearchIndex = useStore((state) => state.setSearchIndex)

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    setSearchIndex(bestPractices)
  }, [])

  return (
    <Box>
      <SEO title="Best practices" />

      <Stack spacing={16} pb={24}>
        <PageHeader bg="white" color="black">
          <PageHeaderSubnavigation borderTopColor="gray.200">
            <PageHeaderBackLink href={content.backButton.href}>
              {content.backButton.label}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>
          <PageHeaderContent>
            <PageHeaderTitle>{content.title}</PageHeaderTitle>
            <PageHeaderSubtitle>{content.introduction}</PageHeaderSubtitle>
          </PageHeaderContent>
          <PageHeaderLinks>
            {content.links.map(({ key, href, label }, i) => {
              return (
                <ButtonLink
                  key={key}
                  href={href}
                  size="2xl"
                  variant="ghostLink"
                  rightIcon={
                    <ArrowRightIcon
                      size="2rem"
                      strokeWidth={2.5}
                      isAnimated="right"
                    />
                  }
                >
                  {label}
                </ButtonLink>
              )
            })}
          </PageHeaderLinks>
        </PageHeader>

        <Container>
          <HStack spacing={6} alignItems="flex-start" px={5}>
            <Sidebar filters={filters} />
            <Box flex="1">
              <KeywordSearch />
              <SelectedFilters />
              <FilteredItems />
            </Box>
          </HStack>
        </Container>
      </Stack>
    </Box>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const bestPracticesRaw = await getPages({ pageType: "best-practices" })
  const bestPractices = bestPracticesRaw
    .map((bp) => ({
      ...bp.frontmatter,
      slug: bp.slug,
    }))
    .filter((d) => d.published)

  const countries = await getContent("countries.txt", "json")

  const regions = Object.keys(_groupBy(countries, (o) => o.region))
    .filter((d) => d)
    .sort()
  const pillars = await getPages({
    pageType: "pillars",
    fields: ["frontmatter"],
  })
  const sectors = await getPages({
    pageType: "sectors",
    fields: ["frontmatter"],
  })
  const stakeholders = await getPages({
    pageType: "stakeholders",
    fields: ["frontmatter"],
  })

  const filters = [
    {
      name: "Pillars",
      items: _sortBy(
        pillars.map((d) => d.frontmatter),
        (o) => o.key
      ).map((pillar) => `${pillar.key}. ${pillar.title}`),
    },
    {
      name: "Regions",
      items: regions,
    },
    {
      name: "Sectors",
      items: _sortBy(
        sectors.map((d) => d.frontmatter),
        (o) => o.key
      ).map((sector) => sector.title),
    },
    {
      name: "Stakeholders",
      items: _sortBy(
        stakeholders.map((d) => d.frontmatter),
        (o) => o.key
      ).map((stakeholder) => stakeholder.title),
    },
    {
      name: "Policy level",
      items: ["International", "National", "Regional", "Cities", "Regulatory"],
    },
  ]

  return {
    props: {
      bestPractices,
      navigation,
      filters,
    },
  }
}

import { MDXRemote } from "next-mdx-remote"
import {
  Heading,
  Text,
  Box,
  Stack,
  SimpleGrid,
  Container,
} from "@chakra-ui/react"
import { basename } from "path"
import _shuffle from "lodash/shuffle"

import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"
import sectorComponents from "@/components/MDXComponents/sectorComponents"
import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"

import DotGrid from "@/components/DotGrid"

import SectorsCarousel from "@/components/SectorsCarousel"
import LatestBestPractices from "@/components/LatestBestPractices"
import { ActionsBySector } from "@/components/ActionsDiagram"

import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
  SectionHeaderLinks,
} from "@/components/SectionHeader"

import MethodologyReportBanner from "@/components/MethodologyReportBanner"

// Spacing
// 5 => 8 => 12 => 20 => 32
// 40 => 24 => 14 => 8 => 5

// Compromise: 5 => 8 => 12/14 => 24 => 40 ?

export default function SectorStakeholderPage({
  source,
  sectors,
  actionCount,
  bestPractices,
}) {
  const { frontmatter } = source
  const sectorName = frontmatter?.title?.toLowerCase().split(" ").join("-")
  return (
    <>
      <SEO title={frontmatter.title} />

      <Stack as="main" spacing={12} pb={24}>
        <PageHeader
          backgroundImage={`/images/${sectorName}.jpg`}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="0% 50%"
          color="black"
          pb={12}
          position="relative"
          backgroundOverlay
        >
          <PageHeaderSubnavigation
            borderTopColor="gray.200"
            borderBottomColor="transparent"
            bg="white"
            mx={-5}
            px={5}
          >
            <PageHeaderBackLink href="/sectors">
              {"All emitting sectors"}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>
          <Stack
            gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
            spacing={6}
          >
            <Heading
              as="h1"
              fontSize={["3xl", "4xl", "5xl", "6xl"]}
              lineHeight="shorter"
              color="white"
            >
              {frontmatter.title}
            </Heading>
            {frontmatter.description && (
              <Text fontSize="2xl" color="white">
                {frontmatter.description}
              </Text>
            )}
          </Stack>
          <Box
            gridColumn="-3 / -1"
            color="gray.400"
            display={["none", null, null, "block"]}
          >
            <DotGrid xTiles={3} yTiles={2} />
          </Box>
        </PageHeader>

        <Container>
          <SimpleGrid columns={8} spacing={6} px={5}>
            <SimpleGrid
              columns={[1, null, 3]}
              spacing={6}
              gridColumn={["1 / -1", null, null, null, "2 / -2"]}
            >
              <Box p={5} borderBottomWidth="0.25rem" borderBottomColor="black">
                <Text fontSize="5xl" fontWeight={700} color="blue.500">
                  {"7"}
                </Text>
                <Text fontSize="xl" lineHeight="short" fontWeight={600}>
                  {"Best practices"}
                </Text>
              </Box>
              <Box p={5} borderBottomWidth="0.25rem" borderBottomColor="black">
                <Text fontSize="5xl" fontWeight={700} color="blue.500">
                  {"12"}
                </Text>
                <Text fontSize="xl" lineHeight="short" fontWeight={600}>
                  {"Regions covered"}
                </Text>
              </Box>
              <Box p={5} borderBottomWidth="0.25rem" borderBottomColor="black">
                <Text fontSize="5xl" fontWeight={700} color="blue.500">
                  {actionCount}
                </Text>
                <Text fontSize="xl" lineHeight="short" fontWeight={600}>
                  {"Pathfinders actions"}
                </Text>
              </Box>
            </SimpleGrid>
          </SimpleGrid>
        </Container>

        <Stack spacing={24}>
          <Container>
            <SimpleGrid columns={8} spsacing={6} px={5}>
              <MDXRemote {...source} components={sectorComponents} />
            </SimpleGrid>
          </Container>
          <LatestBestPractices bestPractices={bestPractices} />
          <Container>
            <Stack px={5} spacing={6}>
              <SectionHeader>
                <SectionHeaderContent>
                  <SectionHeaderTitle>{"Actions"}</SectionHeaderTitle>
                  {/* <SectionHeaderSubtitle>{`This is a listing of recommended NetZero actions for ${frontmatter.title}.`}</SectionHeaderSubtitle> */}
                </SectionHeaderContent>
                <SectionHeaderLinks>
                  <ButtonLink
                    href="/"
                    variant="ghostLink"
                    size="2xl"
                    rightIcon={
                      <ArrowRightIcon
                        size="2rem"
                        strokeWidth={2.5}
                        isAnimated="right"
                      />
                    }
                  >
                    {"All actions"}
                  </ButtonLink>
                </SectionHeaderLinks>
              </SectionHeader>
              <ActionsBySector selectedSector={frontmatter.key} />
            </Stack>
          </Container>

          <MethodologyReportBanner />

          <Container>
            <Stack px={5} spacing={24}>
              <SectionHeader>
                <SectionHeaderContent>
                  <SectionHeaderTitle>
                    {"Explore other sectors"}
                  </SectionHeaderTitle>
                  {/* <SectionHeaderSubtitle>
                    {
                      "Explore more sectors, actions, and best practices on NetZero pathfinders."
                    }
                  </SectionHeaderSubtitle> */}
                </SectionHeaderContent>
                <SectionHeaderLinks>
                  <ButtonLink
                    href="/"
                    variant="ghostLink"
                    size="2xl"
                    rightIcon={
                      <ArrowRightIcon
                        size="2rem"
                        strokeWidth={2.5}
                        isAnimated="right"
                      />
                    }
                  >
                    {"All sectors"}
                  </ButtonLink>
                </SectionHeaderLinks>
              </SectionHeader>
              <SectorsCarousel
                sectors={sectors.map((d) => ({
                  ...d.frontmatter,
                  slug: d.slug,
                }))}
              />
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </>
  )
}

export async function getStaticProps({ params }) {
  const navigation = await getNavigation()
  const { slug } = params

  const sectors = await getPages({
    pageType: "sectors",
    fields: ["frontmatter", "slug"],
  })
  const source = await getPage({ slug, pageType: "sectors" })

  const allActions = await getPages({
    pageType: "actions",
    fields: ["frontmatter", "slug"],
  })

  const relevantActions = allActions
    .filter((d) => d.frontmatter.sectors.includes(source.frontmatter.title))
    .map((d) => d.frontmatter)

  const bestPractices = await getPages({
    pageType: "best-practices",
    fields: ["frontmatter", "slug"],
  }).then((d) => d.slice(0, 4).map((d) => ({ slug: d.slug, ...d.frontmatter })))

  return {
    props: {
      source,
      navigation,
      sectors: _shuffle(
        sectors.filter((d) => d.frontmatter.title !== source.frontmatter.title)
      ),
      actions: relevantActions,
      actionCount: relevantActions.length,
      bestPractices,
    },
  }
}

export async function getStaticPaths() {
  const pages = await getPages({ pageType: "sectors" })
  return {
    paths: pages.map(({ slug }) => ({ params: { slug: basename(slug) } })),
    fallback: false,
  }
}

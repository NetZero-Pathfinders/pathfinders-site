import { MDXRemote } from "next-mdx-remote"
import {
  Box,
  Stack,
  SimpleGrid,
  Heading,
  Text,
  Container,
  Divider,
} from "@chakra-ui/react"
import { basename } from "path"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"
import SEO from "@/components/SEO"
import pillarComponents from "@/components/MDXComponents/pillarComponents"
import MethodologyReportBanner from "@/components/MethodologyReportBanner"

import { pillarIcons, Pillar1Icon, ArrowRightIcon } from "@/components/Icon"
import DotGrid from "@/components/DotGrid"

import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
  SectionHeaderLinks,
} from "@/components/SectionHeader"

import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import PillarCard from "@/components/PillarCard"
import { ButtonLink } from "@/components/Link"
import { ActionsByPillar } from "@/components/ActionsDiagram"

export default function PillarPage({ source, otherPillars, sectors, counts }) {
  const { frontmatter } = source
  const PillarIcon = pillarIcons[`Pillar${frontmatter.key}Icon`] || Pillar1Icon
  return (
    <>
      <SEO title={frontmatter.title} />
      <Stack as="main" spacing={12} pb={24}>
        <PageHeader bg="blue.500" color="white" pb={12} position="relative">
          <PageHeaderSubnavigation
            borderTopColor="gray.200"
            borderBottomColor="transparent"
            bg="white"
            mx={-5}
            px={5}
          >
            <PageHeaderBackLink href="/pillars">
              {"All NetZero pillars"}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>

          <Box
            display={["none", null, null, null, "block"]}
            gridColumn="1 / span 1"
            alignSelf="end"
          >
            <Box
              position="relative"
              left="100%"
              sx={{ "svg": { transform: "translateX(-100%)" } }}
            >
              <DotGrid xTiles={2} yTiles={2} color="white" />
            </Box>
          </Box>

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
              {`Pillar ${frontmatter.key}: ${frontmatter.title}`}
            </Heading>
            {frontmatter.description && (
              <Text fontSize="2xl" color="white" fontWeight={600}>
                {frontmatter.description}
              </Text>
            )}
          </Stack>
          <Box
            gridColumn="-3 / -1"
            opacity={0.5}
            display={["none", null, null, "block"]}
          >
            <PillarIcon size="22.5rem" strokeWidth={12} />
          </Box>
        </PageHeader>

        <Container>
          <SimpleGrid columns={8} spacing={6} px={5}>
            <SimpleGrid
              columns={[1, null, 2]}
              spacing={6}
              gridColumn={["1 / -1", null, null, null, "2 / -2"]}
            >
              <Box py={5} borderBottomWidth="0.25rem" borderBottomColor="black">
                <Text fontSize="5xl" fontWeight={700} color="blue.500">
                  {counts.actions}
                </Text>
                <Text fontSize="xl" lineHeight="short" fontWeight={600}>
                  {"Pathfinders actions"}
                </Text>
              </Box>
              <Box py={5} borderBottomWidth="0.25rem" borderBottomColor="black">
                <Text fontSize="5xl" fontWeight={700} color="blue.500">
                  {counts.bestPractices}
                </Text>
                <Text fontSize="xl" lineHeight="short" fontWeight={600}>
                  {"Best practices"}
                </Text>
              </Box>
              {/* <Box p={5} borderBottomWidth="0.25rem" borderBottomColor="black">
                <Text fontSize="5xl" fontWeight={700} color="blue.500">
                  {"12"}
                </Text>
                <Text fontSize="xl" lineHeight="short" fontWeight={600}>
                  {"Regions covered"}
                </Text>
              </Box> */}
            </SimpleGrid>
          </SimpleGrid>
        </Container>

        <Container>
          <Stack spacing={12}>
            <SimpleGrid columns={8} spacing={6} px={5}>
              <MDXRemote {...source} components={pillarComponents} />
            </SimpleGrid>
          </Stack>
        </Container>
        <MethodologyReportBanner />
        <Container>
          <Stack spacing={6} px={5}>
            <SectionHeader>
              <SectionHeaderContent>
                <SectionHeaderTitle>{"NetZero actions"}</SectionHeaderTitle>
                {/* <SectionHeaderSubtitle>
                  {"Showing "}
                  <Text
                    as="span"
                    color="blue.500"
                    fontWeight={600}
                    textDecoration="underline"
                  >
                    {"X actions"}
                  </Text>
                  {" to "}
                  <Text
                    as="span"
                    color="blue.500"
                    fontWeight={600}
                    textDecoration="underline"
                  >
                    {"Accelerate deployment of mature climate solutions"}
                  </Text>
                  {" across "}
                  <Text
                    as="span"
                    color="blue.500"
                    fontWeight={600}
                    textDecoration="underline"
                  >
                    {"5 sectors"}
                  </Text>
                </SectionHeaderSubtitle> */}
              </SectionHeaderContent>
              <SectionHeaderLinks>
                <ButtonLink
                  href="/actions"
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

            <ActionsByPillar
              sectors={sectors.map((d) => d.frontmatter)}
              selectedPillar={frontmatter.key}
            />
          </Stack>
        </Container>
        <Container>
          <Box px={5}>
            <Divider borderBottomWidth="0.25rem" borderColor="black" />
          </Box>
        </Container>
        <Container>
          <Stack px={5} spacing={12}>
            <SectionHeader>
              <SectionHeaderContent>
                <SectionHeaderTitle>
                  {"Explore other NetZero pillars"}
                </SectionHeaderTitle>
                <SectionHeaderSubtitle>
                  {
                    "In the race to reduce carbon emissions, local, regional and national governments don’t have a minute to lose."
                  }
                </SectionHeaderSubtitle>
              </SectionHeaderContent>
              <SectionHeaderLinks>
                <ButtonLink
                  href="/pillars"
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
                  {"All pillars"}
                </ButtonLink>
              </SectionHeaderLinks>
            </SectionHeader>
            <SimpleGrid
              columns={[1, null, 2, null, 3]}
              spacing={6}
              alignItems="stretch"
            >
              {otherPillars.map(({ frontmatter }) => {
                return <PillarCard key={frontmatter.key} pillar={frontmatter} />
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps({ params }) {
  const navigation = await getNavigation()
  const { slug } = params
  const source = await getPage({ slug, pageType: "pillars" })
  const sectors = await getPages({
    pageType: "sectors",
    fields: ["frontmatter", "slug"],
  })
  const pillars = await getPages({
    pageType: "pillars",
    fields: ["frontmatter", "slug"],
  })
  const otherPillars = pillars.filter(
    (d) => d.frontmatter.title !== source.frontmatter.title
  )
  const actions = await getPages({
    pageType: "actions",
    fields: ["frontmatter"],
  })
  const bestPractices = await getPages({
    pageType: "best-practices",
    fields: ["frontmatter"],
  })

  return {
    props: {
      source,
      navigation,
      otherPillars,
      sectors,
      counts: {
        actions: actions.filter((d) => {
          return parseInt(`${d.frontmatter.id}`[0]) === source.frontmatter.key
        }).length,
        bestPractices: bestPractices.filter((d) => {
          return d.frontmatter.actions
            .map((dd) => parseInt(`${dd}`[0]))
            .includes(source.frontmatter.key)
        }).length,
      },
    },
  }
}

export async function getStaticPaths() {
  const pages = await getPages({ pageType: "pillars" })
  return {
    paths: pages.map(({ slug }) => ({ params: { slug: basename(slug) } })),
    fallback: false,
  }
}

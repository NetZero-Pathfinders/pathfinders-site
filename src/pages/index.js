import { SimpleGrid, Heading, Stack, HStack } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"

import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"
import PageDivider from "@/components/PageDivider"
import {
  Banner,
  BannerHeader,
  BannerBody,
  BannerGrid,
} from "@/components/Banner"
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
  SectionHeaderLinks,
  Section,
  SectionBody,
} from "@/components/Section"
import Page from "@/components/Page"
import {
  HomeBanner,
  HomeBannerTitle,
  HomeBannerSubtitle,
} from "@/components/HomeBanner"
import {
  HomeOverview,
  HomeOverviewItem,
  HomeOverviewItemAccent,
  HomeOverviewItemTitle,
} from "@/components/HomeOverview"
import LatestBestPractices from "@/components/LatestBestPractices"
import { CombinedDiagram } from "@/components/ActionsDiagram"
import SectorsCarousel from "@/components/SectorsCarousel"
import MethodologyReportBanner from "@/components/MethodologyReportBanner"
import PillarCard from "@/components/PillarCard"
import { ReportCardSm } from "@/components/ReportCard"

const overviewItems = [
  {
    href: "/pillars",
    name: ["Discover", "NetZero pillars"],
    colorScheme: "gray",
    accentColor: "blue.500",
  },
  {
    href: "/sectors",
    name: ["Explore", "Emitting sectors"],
    colorScheme: "gray",
    accentColor: "blue.500",
  },
  {
    href: "/best-practices",
    name: ["Navigate", "Best practices"],
    colorScheme: "gray",
    accentColor: "blue.500",
  },
  {
    href: "/paths-to-netzero",
    name: ["Identify", "Climate priorities"],
    colorScheme: "blue",
    accentColor: "blue.200",
  },
]

export default function IndexPage({
  // bestPracticeCount,
  pillars,
  sectors,
  bestPractices,
  reports,
}) {
  return (
    <Page>
      <SEO />
      <HomeBanner>
        <HomeBannerTitle>
          {"Chart your journey to a low-carbon future"}
        </HomeBannerTitle>
        <HomeBannerSubtitle>
          {
            "A curated collection of best practices that illustrate effective policies to help solve critical climate challenges"
          }
        </HomeBannerSubtitle>
      </HomeBanner>

      <HomeOverview>
        {overviewItems.map((item) => (
          <HomeOverviewItem
            key={item.href}
            href={item.href}
            colorScheme={item.colorScheme}
          >
            <HomeOverviewItemAccent color={item.accentColor}>
              {item.name[0]}
            </HomeOverviewItemAccent>
            <HomeOverviewItemTitle>{item.name[1]}</HomeOverviewItemTitle>
          </HomeOverviewItem>
        ))}
      </HomeOverview>

      <PageDivider variant="thick" />

      <Section>
        <SectionHeader>
          <SectionHeaderContent>
            <SectionHeaderTitle>{"NetZero actions"}</SectionHeaderTitle>
          </SectionHeaderContent>
        </SectionHeader>
        <SectionBody>
          <CombinedDiagram pt={0} />
        </SectionBody>
      </Section>

      <MethodologyReportBanner />

      <LatestBestPractices bestPractices={bestPractices} />

      <Banner bg="black" color="white" py={0} borderColor="transparent">
        <BannerHeader borderColor="transparent">
          <Heading fontSize={["3xl", null, "4xl", "5xl"]} fontWeight={600}>
            {
              "NetZero Pathfinders is a public resource for policymakers to simplify their search for decarbonization solutions."
            }
          </Heading>
        </BannerHeader>
        <BannerGrid />
        <BannerBody gridColumn="1 / -1">
          <Stack spacing={24} alignItems="flex-start">
            <ButtonLink
              href="/about"
              size="2xl"
              variant="defaultLink"
              colorScheme="blue"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"About Pathfinders"}
            </ButtonLink>
            <HStack spacing={12}>
              <img src="bloomberg-logo.svg" />
            </HStack>
          </Stack>
        </BannerBody>
      </Banner>

      <Section spacing={16}>
        <SectionHeader>
          <SectionHeaderContent>
            <SectionHeaderTitle>{"NetZero pillars"}</SectionHeaderTitle>
            <SectionHeaderSubtitle>
              {
                "The Pathfinders framework identifies four pillars that are central to designing good net-zero policy"
              }
            </SectionHeaderSubtitle>
          </SectionHeaderContent>
          <SectionHeaderLinks>
            <ButtonLink
              href="/pillars"
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
              {"All pillars"}
            </ButtonLink>
          </SectionHeaderLinks>
        </SectionHeader>
        <SectionBody>
          <SimpleGrid columns={[1, null, 2]} spacing={6} gridAutoRows="1fr">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.key} pillar={pillar} />
            ))}
          </SimpleGrid>
        </SectionBody>
      </Section>

      <Section spacing={16}>
        <SectionHeader>
          <SectionHeaderContent>
            <SectionHeaderTitle>{"Emitting sectors"}</SectionHeaderTitle>
            <SectionHeaderSubtitle>
              {
                "In the race to reduce carbon emissions, local, regional and national governments don't have a minute to lose."
              }
            </SectionHeaderSubtitle>
          </SectionHeaderContent>
          <SectionHeaderLinks>
            <ButtonLink
              href="/sectors"
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
              {"All sectors"}
            </ButtonLink>
          </SectionHeaderLinks>
        </SectionHeader>
        <SectionBody>
          <SectorsCarousel sectors={sectors} />
        </SectionBody>
      </Section>

      <Section spacing={16}>
        <SectionHeader>
          <SectionHeaderContent>
            <SectionHeaderTitle>{"Resources"}</SectionHeaderTitle>
            <SectionHeaderSubtitle>
              {"NetZero Pathfinders flagship reports"}
            </SectionHeaderSubtitle>
          </SectionHeaderContent>
          <SectionHeaderLinks>
            <ButtonLink
              href="/reports"
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
              {"All reports"}
            </ButtonLink>
          </SectionHeaderLinks>
        </SectionHeader>
        <SectionBody>
          <SimpleGrid columns={[1, null, 2, 3]} spacing={[6, null, null, 12]}>
            {reports.map((report) => {
              const { title, description, cover, slug, url } =
                report.frontmatter
              return (
                <ReportCardSm
                  key={slug}
                  title={title}
                  description={description}
                  cover={cover}
                  downloadUrl={url}
                />
              )
            })}
          </SimpleGrid>
        </SectionBody>
      </Section>
    </Page>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()

  const sectorsRaw = await getPages({ pageType: "sectors" })
  const bestPracticesRaw = await getPages({ pageType: "best-practices" })
  const bestPractices = _sortBy(
    bestPracticesRaw.map((d) => d.frontmatter).filter((d) => d.published),
    (o) => -(parseInt(o.date.split("-").join("")) || 0)
  )

  const sectors = _sortBy(
    sectorsRaw.map((d) => d.frontmatter),
    (o) => o.key
  )
  const bestPracticeCount = bestPractices.length

  const pillarsRaw = await getPages({ pageType: "pillars" })
  const pillars = _sortBy(
    pillarsRaw.map((d) => d.frontmatter),
    (o) => o.key
  )
  const reports = await getPages({
    pageType: "reports",
    fields: ["frontmatter"],
  })

  const latestReports = _sortBy(
    reports,
    (o) => -(parseInt(o.frontmatter.date.split("-").join("")) || 0)
  ).slice(0, 3)

  return {
    props: {
      pillars,
      sectors,
      bestPractices: bestPractices.slice(0, 4),
      bestPracticeCount,
      navigation,
      reports: latestReports,
    },
  }
}

import {
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  Container,
  Divider,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { basename } from "path"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"

import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink, Link } from "@/components/Link"
import pillarComponents from "@/components/MDXComponents/pillarComponents"

import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
  // PageHeaderContent,
  PageHeaderTitle,
  // PageHeaderSubtitle,
  // PageHeaderLinks,
} from "@/components/PageHeader"
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  // SectionHeaderSubtitle,
  SectionHeaderLinks,
} from "@/components/SectionHeader"
import { BestPracticeListingItem } from "@/components/BestPracticeListing"

const content = {
  backButton: { label: "All actions", href: "/actions" },
  // title: "Actions",
  // introduction:
  //   "Explore options for addressing climate challenges and learn more about the key challenges policy makers face.",
  links: [{ key: 1, label: "Best practices", href: "/best-practices" }],
}

export default function ActionPage({
  source,
  sectors,
  pillars,
  bestPractices,
}) {
  const { frontmatter } = source

  const actionSectors = frontmatter.sectors
  const actionStakeholders = frontmatter.stakeholders

  const actionId = `${frontmatter.id}`
  const pillarKey = parseInt(actionId[0])
  const relevantPillar = pillars.find((s) => s.key === pillarKey)

  return (
    <>
      <SEO title="Solutions" />
      <Stack as="main" spacing={12} pb={24}>
        <PageHeader bg="white" color="black" pb={6}>
          <PageHeaderSubnavigation borderTopColor="gray.200">
            <PageHeaderBackLink href={content.backButton.href}>
              {content.backButton.label}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>
          <Stack
            gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
            spacing={6}
          >
            <PageHeaderTitle>{frontmatter.title}</PageHeaderTitle>
            <Wrap spacing={1}>
              {actionSectors?.map((actionSector) => {
                return (
                  <WrapItem key={actionSector}>
                    <Link
                      href={`/sectors/${actionSector
                        .trim()
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`}
                      fontSize="md"
                      lineHeight="shorter"
                      fontWeight={600}
                      color="inherit"
                      bg="gray.100"
                      px={2}
                      py={0.5}
                      cursor="pointer"
                      _hover={{ color: "blue.500" }}
                      _active={{ bg: "gray.200" }}
                      _focusVisible={{
                        color: "blue.500",
                        outline: "0.125rem solid",
                        outlineColor: "blue.500",
                        outlineOffset: "0.125rem",
                      }}
                    >
                      {actionSector}
                    </Link>
                  </WrapItem>
                )
              })}
              {actionStakeholders?.map((actionStakeholder) => {
                return (
                  <WrapItem key={actionStakeholder}>
                    <Link
                      href={`/stakeholders/${actionStakeholder
                        .trim()
                        .toLowerCase()}`}
                      fontSize="md"
                      lineHeight="shorter"
                      fontWeight={600}
                      color="inherit"
                      bg="gray.100"
                      px={2}
                      py={0.5}
                      cursor="pointer"
                      _hover={{ color: "blue.500" }}
                      _active={{ bg: "gray.200" }}
                      _focusVisible={{
                        color: "blue.500",
                        outline: "0.125rem solid",
                        outlineColor: "blue.500",
                        outlineOffset: "0.125rem",
                      }}
                    >
                      {actionStakeholder}
                    </Link>
                  </WrapItem>
                )
              })}
              <WrapItem>
                <Link
                  href={`/pillars/pillar-${pillarKey}`}
                  fontSize="md"
                  lineHeight="shorter"
                  fontWeight={600}
                  color="inherit"
                  bg="gray.100"
                  px={2}
                  py={0.5}
                  cursor="pointer"
                  _hover={{ color: "blue.500" }}
                  _active={{ bg: "gray.200" }}
                  _focusVisible={{
                    color: "blue.500",
                    outline: "0.125rem solid",
                    outlineColor: "blue.500",
                    outlineOffset: "0.125rem",
                  }}
                >
                  {`${pillarKey}. ${relevantPillar.title}`}
                </Link>
              </WrapItem>
            </Wrap>
          </Stack>
          {/* <PageHeaderLinks>
            {content.links.map(({ key, href, label }, i) => {
              return (
                <ButtonLink
                  key={key}
                  href={href}
                  size="2xl-variable"
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
          </PageHeaderLinks> */}
        </PageHeader>

        <Container>
          <Stack spacing={12} px={5}>
            {/* <Divider variant="thick" /> */}
            <SimpleGrid columns={8} spacing={3}>
              <MDXRemote {...source} components={pillarComponents} />
            </SimpleGrid>
            <Divider />
            <SectionHeader>
              <SectionHeaderContent>
                <SectionHeaderTitle>
                  {"Related best practices"}
                </SectionHeaderTitle>
                {/* <SectionHeaderSubtitle>
                  {`Explore all best practices related to "${frontmatter.title}".`}
                </SectionHeaderSubtitle> */}
              </SectionHeaderContent>
              <SectionHeaderLinks>
                <ButtonLink
                  href="/best-practices"
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
                  {"All best practices"}
                </ButtonLink>
              </SectionHeaderLinks>
            </SectionHeader>
            {bestPractices.length && (
              <Stack spacing={0}>
                {bestPractices.map((bestPractice, i) => {
                  return (
                    <BestPracticeListingItem
                      key={i}
                      {...bestPractice.frontmatter}
                      slug={bestPractice.slug}
                    />
                  )
                })}
              </Stack>
            )}
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps({ params }) {
  const navigation = await getNavigation()
  const slug = params.slug || ""
  const source = await getPage({ slug, pageType: "actions" })

  const pillars = await getPages({
    pageType: "pillars",
    fields: ["frontmatter", "slug"],
  })

  const sectors = await getPages({
    pageType: "sectors",
    fields: ["frontmatter", "slug"],
  })

  const bestPractices = await getPages({
    pageType: "best-practices",
    fields: ["frontmatter", "slug"],
  })

  const relevantSectors =
    source.frontmatter.sectors
      ?.map((sector) => sectors.find((s) => s.frontmatter.title === sector))
      .filter((d) => d) || []

  const relevantId = source?.frontmatter?.id
  const relevantBestPractices = bestPractices.filter((d) => {
    return d.frontmatter.actions?.includes(relevantId)
  })

  return {
    props: {
      navigation,
      slug,
      source,
      pillars: pillars.map((d) => ({ slug: d.slug, ...d.frontmatter })),
      sectors: relevantSectors,
      bestPractices: relevantBestPractices,
    },
  }
}

export async function getStaticPaths() {
  const actions = await getPages({
    pageType: "actions",
    fields: ["frontmatter", "slug"],
  })
  return {
    paths: actions.map(({ slug }) => ({
      params: { slug: basename(slug) },
    })),
    fallback: false,
  }
}

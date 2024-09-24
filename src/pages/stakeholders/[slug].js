import { MDXRemote } from "next-mdx-remote"
import {
  Heading,
  Text,
  Box,
  Stack,
  Container,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react"
import { basename } from "path"
import _shuffle from "lodash/shuffle"

import SEO from "@/components/SEO"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"
import sectorComponents from "@/components/MDXComponents/sectorComponents"
import DotGrid from "@/components/DotGrid"

import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
} from "@/components/PageHeader"

import SectorsCarousel from "@/components/SectorsCarousel"

// import {
//   SectionHeader,
//   SectionHeaderContent,
//   SectionHeaderTitle,
//   SectionHeaderSubtitle,
//   SectionHeaderLinks,
// } from "@/components/SectionHeader"

export default function StakeholderPage({
  source,
  stakeholders,
  // sectors,
  // otherSectors,
}) {
  const { frontmatter } = source
  const stakeholderName = frontmatter.title.toLowerCase().split(" ").join("-")
  return (
    <>
      <SEO title={frontmatter.title} />

      <Stack as="main" spacing={12} pb={24}>
        <PageHeader
          backgroundImage={`/images/${stakeholderName}.jpg`}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="0% 20%"
          color="black"
          pb={12}
          position="relative"
          backgroundOverlay
        >
          <PageHeaderSubnavigation
            borderTopColor="gray.200"
            bg="white"
            mx={-5}
            px={5}
          >
            <PageHeaderBackLink href="/stakeholders">
              {"All stakeholders"}
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
              <Text fontSize="2xl" color="white" fontWeight={600}>
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
          <Stack spacing={12}>
            <SimpleGrid columns={8} spsacing={6} px={5}>
              <MDXRemote {...source} components={sectorComponents} />
            </SimpleGrid>
            <Divider px={5} />
            <Stack px={5} spacing={12}>
              <Heading as="h2" variant="sectionHeading">
                {"Explore other stakeholders"}
              </Heading>
              <SectorsCarousel
                sectors={stakeholders.map((d) => ({
                  ...d.frontmatter,
                  slug: d.slug,
                }))}
              />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps({ params }) {
  const navigation = await getNavigation()
  const { slug } = params

  const stakeholders = await getPages({
    pageType: "stakeholders",
    fields: ["frontmatter", "slug"],
  })
  const source = await getPage({ slug, pageType: "stakeholders" })

  const otherStakeholders = _shuffle(
    stakeholders.filter((d) => d.frontmatter.title !== source.frontmatter.title)
  ).slice(0, 2)

  return { props: { source, navigation, stakeholders, otherStakeholders } }
}

export async function getStaticPaths() {
  const pages = await getPages({ pageType: "stakeholders" })
  return {
    paths: pages.map(({ slug }) => ({ params: { slug: basename(slug) } })),
    fallback: false,
  }
}

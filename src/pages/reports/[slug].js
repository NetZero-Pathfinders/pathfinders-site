import { MDXRemote } from "next-mdx-remote"
import { Stack, Container, SimpleGrid } from "@chakra-ui/react"
import { basename } from "path"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"
import SEO from "@/components/SEO"
import baseComponents from "@/components/MDXComponents/baseComponents"
// import MethodologyReportBanner from "@/components/MethodologyReportBanner"

import { ArrowRightIcon } from "@/components/Icon"
// import DotGrid from "@components/DotGrid"

// import {
//   SectionHeader,
//   SectionHeaderContent,
//   SectionHeaderTitle,
//   SectionHeaderSubtitle,
//   SectionHeaderLinks,
// } from "@/components/SectionHeader"

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
// import PillarCard from "@/components/PillarCard"
import { ButtonLink } from "@/components/Link"
// import { ActionsByPillar } from "@/components/ActionsDiagram"

const content = {
  backButton: { label: "All reports", href: "/reports" },
  links: [{ key: 1, label: "Best practices", href: "/best-practices" }],
}

export default function ReportPage({ source }) {
  const { frontmatter } = source
  return (
    <>
      <SEO title="Solutions" />
      <Stack as="main" spacing={12} pb={24}>
        <PageHeader bg="white" color="black">
          <PageHeaderSubnavigation borderTopColor="gray.200">
            <PageHeaderBackLink href={content.backButton.href}>
              {content.backButton.label}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>
          <PageHeaderContent>
            <PageHeaderTitle>{frontmatter.title}</PageHeaderTitle>
            <PageHeaderSubtitle>{frontmatter.description}</PageHeaderSubtitle>
          </PageHeaderContent>
          <PageHeaderLinks>
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
          </PageHeaderLinks>
        </PageHeader>
        <Container>
          <Stack spacing={12} px={5}>
            <SimpleGrid columns={8} spacing={6}>
              <MDXRemote {...source} components={baseComponents} />
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
  const source = await getPage({ slug, pageType: "reports" })
  // const sectors = await getPages({
  //   pageType: "sectors",
  //   fields: ["frontmatter", "slug"],
  // })
  // const pillars = await getPages({
  //   pageType: "pillars",
  //   fields: ["frontmatter", "slug"],
  // })
  // const otherPillars = pillars.filter(
  //   (d) => d.frontmatter.title !== source.frontmatter.title
  // )
  return { props: { source, navigation } }
}

export async function getStaticPaths() {
  const pages = await getPages({ pageType: "reports" })
  return {
    paths: pages.map(({ slug }) => ({ params: { slug: basename(slug) } })),
    fallback: false,
  }
}

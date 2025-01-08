import { Stack } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"

import SEO from "@/components/SEO"
import NewsletterListingItem from "@/components/NewsletterListingItem"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderSubtitle,
  // PageHeaderLinks,
} from "@/components/PageHeader"
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  Section,
  SectionBody,
} from "@/components/Section"
import Newsletter from "@/components/Newsletter"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "NetZero Pathfinders Quarterly",
  // introduction:
  //   "The NetZero Pathfinders Quarterly is a publication highlighting the most effective policies and regulations in a particular sector. By showing what really works through success stories, Pathfinders equips decisionmakers to implement impactful solutions and mitigate climate change.",
  introduction:
    "The NetZero Pathfinders Quarterly is a publication highlighting the most effective policies and regulations in a particular sector.",
  // links: [{ key: 1, label: "Sign up to the newsletter", href: "/newsletter" }],
}

export default function NewsletterPage({ issues }) {
  return (
    <>
      <SEO title="Newsletter" />
      <Stack as="main" spacing={16} pb={24}>
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
            <Newsletter />
          </PageHeaderContent>
        </PageHeader>
        <Section spacing={16}>
          <SectionHeader>
            <SectionHeaderContent>
              <SectionHeaderTitle>{"Previous issues"}</SectionHeaderTitle>
            </SectionHeaderContent>
          </SectionHeader>
          <SectionBody>
            <Stack spacing={6}>
              {issues.map((issue) => {
                const { title, description, slug, date, pdf } =
                  issue.frontmatter
                return (
                  <NewsletterListingItem
                    key={slug}
                    slug={slug}
                    title={title}
                    pdf={pdf}
                    description={description}
                    visibleDate={date}
                  />
                )
              })}
            </Stack>
          </SectionBody>
        </Section>
        ƒ
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const issues = await getPages({
    pageType: "newsletters",
    fields: ["frontmatter"],
  })

  const sortedIssues = _sortBy(issues, (o, i) => {
    const parts = `${o.frontmatter.date}`.split("-")
    if (!parts.length) return 0
    return -parseInt([...parts, "01", "01"].slice(0, 3).join(""))
  })

  return { props: { navigation, issues: sortedIssues } }
}

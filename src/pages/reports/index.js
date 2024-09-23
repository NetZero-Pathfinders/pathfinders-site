import { Stack, Container, Divider, Box } from "@chakra-ui/react"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"

import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"
import { ReportCardLg } from "@/components/ReportCard"
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

const content = {
  backButton: { label: "Home", href: "/" },
  title: "Reports",
  introduction:
    "Explore our publications to learn more about the key decarbonization challenges facing policymakers today",
  links: [{ key: 1, label: "Sign up to the newsletter", href: "/newsletter" }],
}

export default function ReportsPage({ reports }) {
  return (
    <>
      <SEO title="NetZero Pathfinders Reports" />
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
          </PageHeaderContent>
          <PageHeaderLinks>
            {content.links.map(({ key, href, label }) => {
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
          <Box px={5}>
            <Divider />
          </Box>
        </Container>
        <Container>
          <Stack spacing={20} px={5}>
            {reports.map((report) => {
              const { title, description, slug, cover, url } =
                report.frontmatter
              return (
                <ReportCardLg
                  key={slug}
                  title={title}
                  description={description}
                  cover={cover}
                  downloadUrl={url}
                />
              )
            })}
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const reports = await getPages({
    pageType: "reports",
    fields: ["frontmatter"],
  })
  return { props: { navigation, reports } }
}

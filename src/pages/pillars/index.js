import { SimpleGrid, Stack, Container } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"
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
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderLinks,
} from "@/components/SectionHeader"
import PillarCard from "@/components/PillarCard"
import PageDivider from "@/components/PageDivider"
import { ActionsByPillar } from "@/components/ActionsDiagram"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "NetZero pillars",
  introduction:
    "Explore options for addressing climate challenges and learn more about the key challenges policy makers face.",
  links: [{ key: 1, label: "Emitting sectors", href: "/sectors" }],
}

export default function PillarsPage({ pillars, sectors }) {
  return (
    <>
      <SEO title="NetZero pillars" />
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
          <SimpleGrid
            columns={[1, null, 2]}
            spacing={6}
            px={5}
            gridAutoRows="1fr"
          >
            {pillars.map(({ frontmatter }) => {
              return <PillarCard key={frontmatter.key} pillar={frontmatter} />
            })}
          </SimpleGrid>
        </Container>
        <PageDivider variant="thick" />
        <Container>
          <Stack spacing={6} px={5}>
            <SectionHeader>
              <SectionHeaderContent>
                <SectionHeaderTitle>{"NetZero actions"}</SectionHeaderTitle>
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
            <ActionsByPillar sectors={sectors.map((d) => d.frontmatter)} />
          </Stack>
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const pillars = await getPages({ pageType: "pillars" })
  const sectors = await getPages({ pageType: "sectors" })
  return { props: { pillars, sectors, navigation } }
}

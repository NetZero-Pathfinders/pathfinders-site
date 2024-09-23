import { Text, Container, Stack, Box } from "@chakra-ui/react"
import { ButtonLink } from "@/components/Link"
import _sortBy from "lodash/sortBy"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import SEO from "@/components/SEO"
import { ArrowRightIcon, sectorIcons } from "@/components/Icon"
import StakeholdersDiagram from "@/components/StakeholdersDiagram"

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
  SectorCard,
  SectorCardImage,
  SectorCardIcon,
  SectorCardContent,
  SectorCardGrid,
  SectorCardHeading,
} from "@/components/SectorCard"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "Key stakeholders",
  introduction: "",
  links: [{ key: 1, label: "Emitting sectors", href: "/sectors" }],
}

export default function StakeholdersPage({ sectors, stakeholders, pillars }) {
  return (
    <>
      <SEO title="Key stakeholders" />
      <Stack as="main" spacing={12} pb={24}>
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
          <Box display={["none", null, null, "block"]}>
            <StakeholdersDiagram
              sectors={sectors}
              pillars={pillars}
              stakeholders={stakeholders}
            />
          </Box>
          <Stack spacing={24} px={5} pt={[0, null, null, 24]} pb={24}>
            {stakeholders.map((stakeholder, i) => {
              const src = stakeholder.slug.split("/")[2] + ".jpg"
              const SectorIcon =
                sectorIcons[stakeholder.title.split(" ").join("") + "Icon"]
              return (
                <SectorCard
                  key={stakeholder.key}
                  variant={i % 2 ? "rtl" : "ltr"}
                  href={stakeholder.slug}
                >
                  <SectorCardImage src={src} />
                  <SectorCardIcon>
                    {SectorIcon && (
                      <SectorIcon
                        size={["2.5rem", null, null, "4rem"]}
                        color="gray.300"
                      />
                    )}
                  </SectorCardIcon>
                  <SectorCardGrid />
                  <SectorCardContent>
                    <SectorCardHeading as="h2" fontSize={["3xl", null, "5xl"]}>
                      {stakeholder.title}
                    </SectorCardHeading>
                    <Text fontSize={["xl", null, "2xl"]} color="gray.500">
                      {stakeholder.description}
                    </Text>
                    <Box flex={1} flexWrap="wrap">
                      <ButtonLink
                        href={stakeholder.slug}
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
                        {"Continue reading"}
                      </ButtonLink>
                    </Box>
                  </SectorCardContent>
                </SectorCard>
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
  const stakeholdersRaw = await getPages({
    pageType: "stakeholders",
    fields: ["frontmatter"],
  })
  const sectorsRaw = await getPages({
    pageType: "sectors",
    fields: ["frontmatter"],
  })
  const pillars = await getPages({ pageType: "pillars" })
  const sectors = _sortBy(sectorsRaw, (o) => o.frontmatter.key).map(
    (d) => d.frontmatter
  )
  const stakeholders = stakeholdersRaw.map((d) => d.frontmatter)
  return { props: { stakeholders, sectors, pillars, navigation } }
}

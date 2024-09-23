import { Text, Container, Stack, Box, HStack, Divider } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import SEO from "@/components/SEO"
import { ButtonLink } from "@/components/Link"
import { ActionsBySector } from "@/components/ActionsDiagram"
import { ArrowRightIcon, sectorIcons } from "@/components/Icon"

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
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
  SectionHeaderLinks,
} from "@/components/SectionHeader"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "Emitting sectors",
  introduction:
    "Explore the key challenges of decarbonizing the five major emitting sectors responsible for the majority of global emissions.",
  links: [{ key: 1, label: "NetZero pillars", href: "/pillars" }],
}

export default function SectorsPage({ sectors }) {
  console.log(sectors)
  return (
    <>
      <SEO title="Emitting sectors" />
      <Stack as="main" spacing={24} pb={24}>
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
          <Stack spacing={24} px={5}>
            {sectors.map((sector, i) => {
              const src = sector.slug.split("/").slice(-1)[0] + ".jpg"
              const SectorIcon =
                sectorIcons[sector.title.split(" ").join("") + "Icon"]
              return (
                <SectorCard
                  key={sector.key}
                  variant={i % 2 ? "rtl" : "ltr"}
                  href={sector.slug}
                >
                  <SectorCardImage src={src} />
                  <SectorCardIcon>
                    <SectorIcon
                      size={["2.5rem", null, null, "4rem"]}
                      color="gray.300"
                    />
                  </SectorCardIcon>
                  <SectorCardGrid />
                  <SectorCardContent>
                    <SectorCardHeading as="h2" fontSize={["3xl", null, "5xl"]}>
                      {sector.title}
                    </SectorCardHeading>
                    <Text fontSize={["xl", null, "2xl"]} color="gray.500">
                      {sector.description}
                    </Text>
                    <HStack spacing={3} className="continue-reading">
                      <Text fontSize="2xl" lineHeight="short" fontWeight={600}>
                        {"Continue reading"}
                      </Text>
                      <ArrowRightIcon
                        size="2rem"
                        strokeWidth={2.5}
                        isAnimated="right"
                      />
                    </HStack>
                  </SectorCardContent>
                </SectorCard>
              )
            })}
          </Stack>
        </Container>
        <Container>
          <Box px={5}>
            <Divider borderBottomWidth="0.25rem" borderBottomColor="black" />
          </Box>
        </Container>
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
                  {" for the "}
                  <Text
                    as="span"
                    color="blue.500"
                    fontWeight={600}
                    textDecoration="underline"
                  >
                    {"Power and Grids"}
                  </Text>
                  {" sector across "}
                  <Text
                    as="span"
                    color="blue.500"
                    fontWeight={600}
                    textDecoration="underline"
                  >
                    {"4 pillars"}
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
          </Stack>
          <ActionsBySector sectors={sectors} />
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const data = await getPages({
    pageType: "sectors",
    fields: ["slug", "frontmatter"],
  })
  const sectors = _sortBy(
    data.filter((dd) => dd.frontmatter.type === "sector"),
    (o) => o.frontmatter.key
  ).map((d) => ({ ...d.frontmatter, slug: d.slug }))
  return { props: { sectors, navigation } }
}

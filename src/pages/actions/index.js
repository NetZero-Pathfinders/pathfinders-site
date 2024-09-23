import {
  Stack,
  HStack,
  Container,
  // Box,
  Heading,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"

import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink, LinkBox, LinkOverlay } from "@/components/Link"
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
import PageDivider from "@/components/PageDivider"
import ActionsListing from "@/components/ActionsListing"

/**
 * Content
 *
 */
const content = {
  backButton: { label: "Home", href: "/" },
  title: "Actions",
  introduction:
    "Explore options for addressing climate challenges and learn more about the key challenges policy makers face.",
  links: [
    { key: 1, label: "NetZero pillars", href: "/" },
    { key: 2, label: "Emitting sectors", href: "/" },
  ],
}

/**
 * Page
 *
 */
export default function ActionsPage({ actions }) {
  return (
    <>
      <SEO title="NetZero actions" />
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
        <PageDivider variant="thick" />
        <Container>
          <ActionsListing actions={actions} px={5} />
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const actions = await getPages({
    pageType: "actions",
    fields: ["frontmatter", "slug"],
  })
  return {
    props: {
      navigation,
      actions: actions.map(({ frontmatter, slug }) => ({
        ...frontmatter,
        slug,
      })),
    },
  }
}

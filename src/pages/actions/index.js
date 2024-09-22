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
      <SEO title="NetZero solutions" />
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
          <Stack px={5} spacing={3} fontSize="2xl">
            {actions.map((action) => {
              const actionSectors = action.sectors
              const actionStakeholders = action.stakeholders
              return (
                <LinkBox as="article" key={action.id}>
                  <Stack
                    position="relative"
                    py={[4, null, 6]}
                    borderBottom="0.0625rem solid"
                    borderColor="gray.200"
                    spacing={2}
                  >
                    <Heading
                      as="h3"
                      fontSize={["xl", null, "2xl", "2xl"]}
                      display="flex"
                    >
                      <LinkOverlay
                        href={action.slug}
                        flex={1}
                        pr={["0", null, "3rem", null, "15rem"]}
                        _hover={{
                          outline: "none",
                          color: "blue.500",
                          "+ *": {
                            color: "blue.500",
                            opacity: 1,
                            svg: { transform: "translateX(25%)" },
                          },
                        }}
                        _focusVisible={{
                          outline: "none",
                          color: "blue.500",
                          "+ *": {
                            color: "blue.500",
                            opacity: 1,
                            svg: { transform: "translateX(25%)" },
                          },
                        }}
                      >
                        {action.title}
                      </LinkOverlay>
                      <Center
                        opacity={0}
                        h={8}
                        display={["none", null, "block"]}
                        mt={1}
                        pr={5}
                        transition="opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                        sx={{
                          "svg": {
                            transition:
                              "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          },
                        }}
                      >
                        <ArrowRightIcon
                          size="2rem"
                          strokeWidth={2.5}
                          isAnimated="right"
                        />
                      </Center>
                    </Heading>
                    <HStack spacing={1}>
                      {actionSectors.map((actionSector) => {
                        return (
                          <Wrap spacing={1} key={actionSector}>
                            <WrapItem
                              py={0.5}
                              px={2}
                              bg="gray.100"
                              lineHeight="shorter"
                              fontWeight={600}
                              fontSize="md"
                            >
                              {actionSector}
                            </WrapItem>
                          </Wrap>
                        )
                      })}
                      {actionStakeholders?.map((actionStakeholder) => {
                        return (
                          <Wrap spacing={1} key={actionStakeholder}>
                            <WrapItem
                              py={0.5}
                              px={2}
                              bg="gray.100"
                              lineHeight="shorter"
                              fontWeight={600}
                              fontSize="md"
                            >
                              {actionStakeholder}
                            </WrapItem>
                          </Wrap>
                        )
                      })}
                    </HStack>
                  </Stack>
                </LinkBox>
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

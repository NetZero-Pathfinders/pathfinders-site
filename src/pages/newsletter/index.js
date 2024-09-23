import {
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Container,
  Box,
} from "@chakra-ui/react"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import SEO from "@/components/SEO"
import { ArrowRightIcon } from "@/components/Icon"
import DotGrid from "@/components/DotGrid"
import { ButtonLink } from "@/components/Link"
import NewsletterForm from "@/components/NewsletterForm"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from "@/components/PageHeader"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "Newsletter",
  introduction:
    "The Quarterly publication presents best practices to decarbonize major emitting sectors of the global economy. If you would like to be notified about new quarterly editions directly via email, please subscribe.",
  links: [
    { key: 1, label: "NetZero pillars", href: "/" },
    { key: 2, label: "Emitting sectors", href: "/" },
  ],
}

function PreviousIssue() {
  return (
    <Stack
      direction={["column", null, null, "row"]}
      bg="gray.100"
      py={12}
      px={6}
      spacing={5}
      w="100%"
      justifyContent="space-between"
    >
      <Stack>
        <Text fontWeight={600} fontSize="lg" color="gray.500">
          {"November 2023"}
        </Text>
        <Heading as="h3" fontSize={["2xl", null, "2xl"]}>
          {"NetZero Pathfinders Policy Monthly: Heavy Industry report launch"}
        </Heading>
      </Stack>
      <ButtonLink
        href="/pillars"
        justifyContent="space-between"
        size="xl"
        variant="ghost"
        px={5}
        color="blue.500"
        rightIcon={
          <ArrowRightIcon size="2rem" strokeWidth={2.5} isAnimated="right" />
        }
      >
        {"View"}
      </ButtonLink>
    </Stack>
  )
}

export default function NewsletterPage() {
  return (
    <>
      <SEO title="Newsletter" />
      <Stack spacing={16} pb={24}>
        <PageHeader bg="white" color="black">
          <PageHeaderSubnavigation borderTopColor="gray.200">
            <PageHeaderBackLink href={content.backButton.href}>
              {content.backButton.label}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>
          <Stack
            gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "1 / -4"]}
            spacing={6}
          >
            <PageHeaderContent>
              <PageHeaderTitle>{content.title}</PageHeaderTitle>
              <PageHeaderSubtitle>{content.introduction}</PageHeaderSubtitle>
              <Box gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "1 / -4"]}>
                <NewsletterForm />
              </Box>
            </PageHeaderContent>
          </Stack>
          <Box
            gridColumn="-3 / -1"
            color="gray.400"
            display={["none", null, null, "block"]}
          >
            <DotGrid xTiles={3} yTiles={2} />
          </Box>
        </PageHeader>
        {/* <Container>
          <Box px={5}>
            <Divider />
          </Box>
        </Container> */}
        <Container>
          <SimpleGrid columns={8} spacing={6} px={5}>
            <Stack
              spacing={6}
              gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "1 / -3"]}
            >
              <Heading variant="sectionHeading" maxW="40rem" as="h2">
                {"Previous issues"}
              </Heading>
              <PreviousIssue />
              <PreviousIssue />
              <PreviousIssue />
            </Stack>
          </SimpleGrid>
        </Container>
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const pillars = await getPages({ pageType: "pillars" })
  return { props: { pillars, navigation } }
}

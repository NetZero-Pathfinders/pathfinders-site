import {
  Stack,
  Box,
  Container,
  Divider,
  Heading,
  List,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import SEO from "@/components/SEO"
import DotGrid from "@/components/DotGrid"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderSubtitle,
} from "@/components/PageHeader"
import { Link } from "@/components/Link"
import MethodologyReportBanner from "@/components/MethodologyReportBanner"

const content = {
  backButton: { label: "Home", href: "/" },
  title: "About",
  introduction:
    "NetZero Pathfinders is a public resource that simplifies the search for policymakers to find, design and implement decarbonization strategies. It showcases the most effective policy solutions, known as best practices, that can be replicated in new markets to accelerate progress to net zero. Pathfinders’ best practices are powered by the expertise of hundreds of BNEF analysts, using metrics, to identify the most impactful climate solutions. By showing what really works, Pathfinders builds a community of decisionmakers to drive the implementation of solutions and mitigate climate change.",
  links: [
    { key: 1, label: "NetZero pillars", href: "/" },
    { key: 2, label: "Emitting sectors", href: "/" },
  ],
}

export default function NewsletterPage() {
  return (
    <>
      <SEO title="About" />
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
        {/* <Divider /> */}
        <Container>
          <Stack px={5} spacing={5}>
            <Heading as="h2" variant="sectionHeading">
              {"NetZero Pathfinder team:"}
            </Heading>
            <UnorderedList styleType="none" mx={0}>
              <ListItem>
                <Text variant="body">{"Brynne Mary Merkley"}</Text>
              </ListItem>
              <ListItem>
                <Text variant="body">{"Emma Champion"}</Text>
              </ListItem>
              <ListItem>
                <Text variant="body">{"Victoria Cuming"}</Text>
              </ListItem>
              <ListItem>
                <Text variant="body">{"Luiza Demoro"}</Text>
              </ListItem>
            </UnorderedList>
            <Text variant="body">
              {"Please get in touch with us at "}
              <Link href="mailto:pathfinders@bloomberg.net" variant="text">
                {"pathfinders@bloomberg.net"}
              </Link>
            </Text>
          </Stack>
        </Container>
        <MethodologyReportBanner />
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const pillars = await getPages({ pageType: "pillars" })
  return { props: { pillars, navigation } }
}

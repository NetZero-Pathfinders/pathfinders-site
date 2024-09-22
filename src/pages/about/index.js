import { Stack, Box } from "@chakra-ui/react"

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

const content = {
  backButton: { label: "Home", href: "/" },
  title: "About",
  introduction:
    "NetZero Pathfinders is a public resource that provides concrete, actionable policy ideas for achieving a decarbonized economy. Pathfinders leverages the capabilities of Bloomberg L.P., Bloomberg Philanthropies and numerous partner organizations to make these policy solutions available via this web portal. The initiative aims to serve municipal, regional, national and international policy makers, financiers, business leaders and others.",
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
        {/* <Container>
          <Box px={5}>
            <Divider />
          </Box>
        </Container> */}
      </Stack>
    </>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const pillars = await getPages({ pageType: "pillars" })
  return { props: { pillars, navigation } }
}

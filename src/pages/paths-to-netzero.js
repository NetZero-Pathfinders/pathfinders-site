import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  // HStack,
  // Center,
} from "@chakra-ui/react"
// import { Button } from "@chakra-ui/button"
// import { motion } from "framer-motion"
import { InView } from "react-intersection-observer"
import _sortBy from "lodash/sortBy"

import SEO from "@/components/SEO"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderShareButton,
  PageHeaderBackLink,
} from "@/components/PageHeader"
import DotGrid from "@/components/DotGrid"
import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import { CombinedDiagram } from "@/components/ActionsDiagram"
// import StoryVisual from "@components/PathsToClimateStrategyStory"
// import { useStore } from "@utils/store/pathsToClimateStrategyStore"

import HistoricalEmissionsSection from "@/components/PathsToClimateStrategyStory/HistoricalEmissionsSection"
import EmissionsByCountrySection from "@/components/PathsToClimateStrategyStory/EmissionsByCountrySection"
import EmissionsBySectorSection from "@/components/PathsToClimateStrategyStory/EmissionsBySectorSection"
import FrameworkSection from "@/components/PathsToClimateStrategyStory/FrameworkSection"

export default function PathsToClimateStrategiesPage({ pillars, sectors }) {
  return (
    <>
      <SEO title="Paths to NetZero" />
      <Box pb={24}>
        <PageHeader bg="white" color="black" pb={12} position="relative">
          <PageHeaderSubnavigation borderTopColor="gray.200">
            <PageHeaderBackLink href="/">{"Home"}</PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>

          <Stack
            gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
            spacing={20}
          >
            <Stack spacing={6}>
              <Heading
                as="h1"
                fontSize={["4xl", "5xl", "6xl", "7xl"]}
                lineHeight="shorter"
              >
                {"Paths to "}
                {/* <br /> */}
                <Text
                  as="span"
                  fontSize="inherit"
                  lineHeight="inherit"
                  fontWeight="inherit"
                  color="blue.500"
                >
                  {"NetZero"}
                </Text>
              </Heading>
              <Text fontSize="3xl" fontWeight={600}>
                {
                  "Ramping up the deployment of clean technologies and phasing out carbon-intensive activities relies on well-designed, effective government support. Pathfinders serves as a basic resource for policymakers and other key stakeholders designing decarbonization strategies."
                }
              </Text>
            </Stack>
            <Divider />
          </Stack>
          <Box
            gridColumn="-3 / -1"
            color="gray.400"
            display={["none", null, null, "block"]}
          >
            <DotGrid xTiles={3} yTiles={2} />
          </Box>
        </PageHeader>

        <Stack spacing={20}>
          {/* <Container>
            <SimpleGrid px={5} columns={8} spacing={6}>
              <Stack
                spacing={6}
                gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
              >
                <Heading as="h3" fontSize="5xl">
                  {"Overview"}
                </Heading>
                <Text fontSize="xl">
                  {
                    "Pathfinders serves as a basic resource for policymakers and other key stakeholders designing decarbonization strategies."
                  }
                </Text>
              </Stack>
            </SimpleGrid>
          </Container> */}

          <SectionDivider />

          <HistoricalEmissionsSection />

          <SectionDivider />

          <EmissionsByCountrySection />

          <SectionDivider />

          <EmissionsBySectorSection />

          <SectionDivider />

          <FrameworkSection pillars={pillars} sectors={sectors} />

          <Container>
            <SimpleGrid px={5} columns={8} spacing={6}>
              <Stack
                spacing={6}
                gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
              >
                <Text fontSize="2xl">
                  {
                    "Through trial and error, governments and others have been testing low-carbon policies for more than two decades. Pathfinders therefore highlights ‘best practices’ – that is, tried-and-true programs that have proved effective at driving decarbonization, as well as newer measures with high potential for future impact."
                  }
                </Text>
              </Stack>
            </SimpleGrid>
          </Container>

          <Container>
            <InView threshold={0.25}>
              {({ inView, ref }) => {
                return (
                  <Box
                    ref={ref}
                    px={5}
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: "opacity 0.5s",
                    }}
                  >
                    <CombinedDiagram sectors={sectors} />
                  </Box>
                )
              }}
            </InView>
          </Container>

          {/* <SectionDivider gridColumn="1 / -1" /> */}
        </Stack>

        {/* <InView
        threshold={0.5}
        onChange={(isInView) => {
          if (!isInView) return
          setCurrentStep(1)
        }}
      >
        <Box position="relative" border="1px solid #000">
          <Container>
            <Center px={5} h="100vh">
              <Text fontSize="2xl">{"Introduction"}</Text>
            </Center>
          </Container>
        </Box>
      </InView>

      <InView
        threshold={0.5}
        onChange={(isInView) => {
          if (!isInView) return
          setCurrentStep(2)
        }}
      >
        <Box position="relative" border="1px solid #000">
          <Container>
            <Center px={5} h="100vh">
              <Text fontSize="2xl">{"Show line chart"}</Text>
            </Center>
          </Container>
        </Box>
      </InView>

      <InView
        threshold={0.5}
        onChange={(isInView) => {
          if (!isInView) return
          setCurrentStep(3)
        }}
      >
        <Box position="relative" border="1px solid #000">
          <Container>
            <Center px={5} h="100vh">
              <Text fontSize="2xl">
                {"Show emissions by country bubble chart"}
              </Text>
            </Center>
          </Container>
        </Box>
      </InView> */}
      </Box>
    </>
  )
}

function SectionDivider(props) {
  return (
    <Container>
      <SimpleGrid columns={8} spacing={6} px={5}>
        <Divider
          borderBottomWidth="0.25rem"
          borderColor="black"
          gridColumn="2 / -3"
          {...props}
        />
      </SimpleGrid>
    </Container>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const sectorsRaw = await getPages({ pageType: "sectors" })
  const sectors = _sortBy(
    sectorsRaw.map((d) => d.frontmatter),
    (o) => o.key
  )
  const pillarsRaw = await getPages({ pageType: "pillars" })
  const pillars = _sortBy(
    pillarsRaw.map((d) => d.frontmatter),
    (o) => o.key
  )
  return {
    props: {
      pillars,
      sectors,
      navigation,
    },
  }
}

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Center,
  useTheme,
} from "@chakra-ui/react"
// import { Button } from "@chakra-ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { create } from "zustand"
import { InView } from "react-intersection-observer"

import { getPack } from "./getDistribution"
import { sectorIcons } from "@/components/Icon"
import StakeholdersDiagram, {
  StakeholdersDiagramPillars,
  StakeholdersDiagramStakeholders,
  StakeholdersDiagramSectors,
  GroupHeading,
} from "@/components/StakeholdersDiagram"
// import StoryVisual from "@components/PathsToClimateStrategyStory"
// import { useStore } from "@utils/store/pathsToClimateStrategyStore"

const useStore = create((set) => ({
  currentSlide: 1,
  setCurrentSlide: (currentSlide) => set({ currentSlide }),
}))

export default function FrameworkSection({ pillars, sectors }) {
  const setCurrentSlide = useStore((state) => state.setCurrentSlide)
  return (
    <Container>
      <SimpleGrid columns={8} spacing={6} px={5}>
        {/* <Box gridColumn="-5 / -1" gridRow="1 / span 1" bg="gray.50" h="100vh" /> */}
        <Stack
          spacing={6}
          gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
          gridRow="1 / span 1"
          pb={12}
        >
          <Heading as="h3" fontSize="5xl">
            {"The Framework of "}
            <br />
            <Text
              as="strong"
              fontSize="inherit"
              lineHeight="inherit"
              fontWeight="inherit"
              color="blue.500"
            >
              {"NetZero Pathfinders"}
            </Text>
          </Heading>
          <Text fontSize="xl">
            {
              "The magnitude of climate change can make it difficult to discern how best to address the problem. The good news is that effective solutions have been tested and proven already in cities, states and nations around the globe. Many of these are now ready to be implemented in other contexts and at far greater scale. This report breaks the climate challenge down into the four pillars of net-zero strategies and describes crucial solutions to address these challenges."
            }
          </Text>
        </Stack>

        <SimpleGrid
          columns={1}
          spacing={6}
          gridColumn="1 / -1"
          position="sticky"
          top={0}
        >
          <FrameworkVisual pillars={pillars} sectors={sectors} />
        </SimpleGrid>

        <Box gridColumn="2 / -3">
          <InView
            threshold={0.5}
            onChange={(inView) => {
              if (!inView) return
              setCurrentSlide(1)
            }}
          >
            <Center h="100vh" position="relative">
              <Text fontSize="xl" p={5} bg="whiteAlpha.900">
                {
                  "The pillars of net-zero strategy are relevant for all major emitting sectors of the economy and key stakeholder groups in the race to zero. They encompass: 1. Accelerating deployment of mature climate solutions 2. Supporting the development of new climate solutions 3. Phasing out of carbon-intensive activities 4. Creating appropriate climate transition governance structures"
                }
              </Text>
            </Center>
          </InView>
        </Box>

        <Box gridColumn="2 / -3">
          <InView
            threshold={0.5}
            onChange={(inView) => {
              if (!inView) return
              setCurrentSlide(2)
            }}
          >
            <Center h="100vh" position="relative">
              <Text fontSize="xl" p={5} bg="whiteAlpha.900">
                {
                  "Without immediate action, the carbon budget for 1.5C warming above pre-industrial levels will rapidly be depleted. Identifying, replicating and scaling policy measures with demonstrated impact is thus critical. Pathfinders outlines actionable solutions that could accelerate progress by 2030, while also laying the foundation for decarbonizing harder-to-abate sectors in the years to come."
                }
              </Text>
            </Center>
          </InView>
        </Box>

        <Box gridColumn="2 / -3">
          <InView
            threshold={0.5}
            onChange={(inView) => {
              if (!inView) return
              setCurrentSlide(3)
            }}
          >
            <Center h="100vh" position="relative">
              <Text fontSize="xl" p={5} bg="whiteAlpha.900">
                {
                  "These actions target the financial institutions, consumers and companies that need to transition their activities, as well as the different levels of government that must lead the way."
                }
              </Text>
            </Center>
          </InView>
        </Box>

        <Box gridColumn="2 / -3">
          <InView
            threshold={0.5}
            onChange={(inView) => {
              if (!inView) return
              setCurrentSlide(4)
            }}
          >
            <Center h="50vh" position="relative">
              <Text fontSize="xl" py={5} bg="whiteAlpha.900">
                {""}
              </Text>
            </Center>
          </InView>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

function FrameworkVisual({ pillars }) {
  const { colors } = useTheme()
  const [nodes, setNodes] = useState({})

  const currentSlide = useStore((state) => state.currentSlide)

  const customSectors = [
    {
      key: 1,
      Icon: sectorIcons.PowerandGridsandBuildingsIcon,
      name: "Power and grids + Buildings",
      total: 80,
    },
    {
      key: 2,
      Icon: sectorIcons.IndustryandMaterialsIcon,
      name: "Industry and Materials",
      total: 30,
    },
    { key: 3, Icon: sectorIcons.TransportIcon, name: "Transport", total: 40 },
    { key: 4, Icon: sectorIcons.BuildingsIcon, name: "Buildings", total: 0 },
    {
      key: 5,
      Icon: sectorIcons.AgricultureIcon,
      name: "Agriculture",
      total: 20,
    },
    // { key: 6, Icon: null, name: "Waste", total: 10 },
    { key: 6, Icon: null, name: "Other", total: 10 },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return
    setNodes(getPack({ name: "Root", sectors: customSectors }, 100, 100))
  }, [JSON.stringify(customSectors)])

  return (
    <Box h="100vh" position="relative">
      <Center
        w="100%"
        h="100%"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
      >
        <Box position="relative" w="30rem" h="30rem">
          <AnimatePresence>
            {currentSlide === 1 && (
              <motion.div
                key="root-node"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 2 }}
                style={{
                  position: "absolute",
                  top: nodes.y - nodes.r + "%",
                  left: nodes.x - nodes.r + "%",
                  width: nodes.r * 2 + "%",
                  height: nodes.r * 2 + "%",
                  background: colors.gray[100],
                  borderRadius: "100%",
                }}
                transition={{ duration: 0.5, bounce: 0, type: "spring" }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentSlide === 1 &&
              nodes.children?.map((node) => {
                const sectorColors =
                  colors[node.data.name.toLowerCase().split("+")[0].trim()] ||
                  colors.gray
                if (!node.r) return null
                const Icon =
                  sectorIcons[
                    node.data.name
                      .split("+")
                      .join("and")
                      .trim()
                      .split(" ")
                      .join("") + "Icon"
                  ] || null
                return (
                  <motion.div
                    key={node.data.name}
                    layoutId={node.data.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      width: node.r * 2 + "%",
                      height: node.r * 2 + "%",
                      background: sectorColors[400],
                      position: "absolute",
                      left: node.x - node.r + "%",
                      top: node.y - node.r + "%",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    transition={{ duration: 0.5, bounce: 0, type: "spring" }}
                  >
                    {Icon && (
                      <Icon size="2.5rem" stroke="#FFF" strokeWidth={1.5} />
                    )}
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </Box>
      </Center>

      <Box position="relative" h="100%" zIndex={0} py={10}>
        <StakeholdersDiagram
          hideBackground={currentSlide <= 2 || currentSlide >= 4}
        >
          <motion.div
            animate={{
              opacity: currentSlide >= 3 && currentSlide < 4 ? 1 : 0,
            }}
            transition={{ duration: 0.5, bounce: 0, type: "spring" }}
          >
            <StakeholdersDiagramPillars
              pillars={pillars.map((d) => ({ d, frontmatter: d }))}
            />
          </motion.div>

          <motion.div
            animate={{
              opacity: currentSlide >= 3 && currentSlide < 4 ? 1 : 0,
            }}
            transition={{ duration: 0.5, bounce: 0, type: "spring" }}
          >
            <StakeholdersDiagramStakeholders
              stakeholders={[
                {
                  key: 1,
                  title: "Financials",
                  description:
                    "Replicating proven private investment models in more mature markets is fundamental to accelerate deployment of today’s net-zero technologies.",
                },
                {
                  key: 2,
                  title: "Policy makers",
                  description:
                    "The scope of the climate crisis is forcing policymakers to take a multi-decadal view of the problem but policies are only as good as the frameworks that exist to implement and enforce them.",
                },
                {
                  key: 3,
                  title: "Consumers",
                  description:
                    "Public acceptance and understanding of clean alternatives is fundamental to ensuring fast deployment of green technologies and solutions.",
                },
                {
                  key: 4,
                  title: "Companies",
                  description:
                    "The private sector can help unlock new low carbon markets. In addition to providing asset financing. The private sector can also communicate guidelines for factors that make projects more appealing to investors.",
                },
              ]}
            />
          </motion.div>
          <Box flex="none">
            <AnimatePresence>
              {currentSlide > 1 && currentSlide < 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, bounce: 0, type: "spring" }}
                >
                  <SimpleGrid columns={5} spacingX={2} spacingY={5}>
                    <Box gridColumn="1 / -1" textAlign="center">
                      {currentSlide >= 2 && (
                        <GroupHeading>{"Emitting sectors"}</GroupHeading>
                      )}
                    </Box>
                    <AnimatePresence>
                      {customSectors
                        // .filter((d) => d.name !== "Waste")
                        .filter((d) => d.name !== "Other")
                        .map(
                          ({ key, ...sector }) => (
                              <SectorItem
                                key={key}
                                slide={currentSlide}
                                {...sector}
                              />
                            )
                        )}
                    </AnimatePresence>
                  </SimpleGrid>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </StakeholdersDiagram>
      </Box>
    </Box>
  )
}

function SectorItem({ name, slide }) {
  const { colors } = useTheme()
  const sectorColors =
    colors[name.toLowerCase().split("+")[0].trim()] || colors.gray
  const Icon =
    sectorIcons[name.split("+")[0].trim().split(" ").join("") + "Icon"] || null
  return (
    <Stack spacing={2} alignItems="center" textAlign="center">
      <Center>
        {slide >= 2 && (
          <motion.div
            key={name + "-circle"}
            layoutId={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: "5rem",
              height: "5rem",
              background: sectorColors[400],
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            transition={{ duration: 0.5, bounce: 0, type: "spring" }}
          >
            {Icon && <Icon size="2.5rem" stroke="#FFF" strokeWidth={1.5} />}
          </motion.div>
        )}
      </Center>
      {slide >= 2 && (
        <Text color={sectorColors[900]} fontWeight={600} fontSize="lg">
          {name.split("+")[0].trim()}
        </Text>
      )}
    </Stack>
  )
}

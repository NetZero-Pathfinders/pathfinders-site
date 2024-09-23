import { useEffect } from "react"
import {
  Box,
  Container,
  Center,
  HStack,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  AspectRatio,
  Switch,
} from "@chakra-ui/react"
import { create } from "zustand"
import { useInView } from "react-intersection-observer"
import { AnimatePresence, motion } from "framer-motion"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"
import { Text as SVGText } from "@visx/text"

import fetchDataset from "@/utils/api/client/fetchDataset"
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icon"
import { useResizeObserver } from "@/utils/useResizeObserver"
import { getDistribution } from "./getDistribution"
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup"
import { useStoryStore } from "@/components/PathsToClimateStrategyStory/useStoryStore"

const useStore = create((set, get) => ({
  width: 0,
  height: 0,
  setDimensions: (width, height) => set({ width, height }),
  data: null,
  setData: async (width, height) => {
    if (!width || !height || get().data) return

    const url = "/data/emissions/total-emissions-by-country.txt"
    const emissionsData = await fetchDataset(url, "json").then((d) =>
      d.filter((dd) => !["WORLD", "EUU"].includes(dd.id))
    )
    // const emissionsData = await fetch(url)
    //   .then((res) => res.json())
    //   .then((d) => d.filter((dd) => !["WORLD", "EUU"].includes(dd.id)))

    const sumLatest = _sumBy(emissionsData, (o) => o.latest)
    const sumCumulative = _sumBy(emissionsData, (o) => o.cumulative)

    const sumLatest_withLUCF = _sumBy(emissionsData, (o) => o.latest_withLUCF)
    const sumCumulative_withLUCF = _sumBy(
      emissionsData,
      (o) => o.cumulative_withLUCF
    )

    const data = _sortBy(
      emissionsData.map((d) => {
        return {
          cumulative: d.cumulative,
          cumulative_withLUCF: d.cumulative_withLUCF,
          full_name: d.name,
          name: d.id,
          region: d.region,
          sectors: [],
          sums: [
            {
              name: "All",
              total: sumLatest,
              cumulative: sumCumulative,
              total_withLUCF: sumLatest_withLUCF,
              cumulative_withLUCF: sumCumulative_withLUCF,
            },
          ],
          total: d.latest,
          total_withLUCF: d.latest_withLUCF,
          year: d.extent[1],
        }
      }),
      (o) => -o.total
    )

    const nodes = {
      latest: getDistribution(data, width, height, "total"),
      cumulative: getDistribution(data, width, height, "cumulative"),
      latest_withLUCF: getDistribution(data, width, height, "total_withLUCF"),
      cumulative_withLUCF: getDistribution(
        data,
        width,
        height,
        "cumulative_withLUCF"
      ),
    }

    set({ width, height, data, nodes })
  },
  pathVisibility: false,
  setPathVisibility: (pathVisibility) => set({ pathVisibility }),
  nodes: {
    latest: [],
    cumulative: [],
    latest_withLUCF: [],
    cumulative_withLUCF: [],
  },
  updateNodes: () => {
    if (!get().nodes.length) return
    // TODO: Update nodes based on width and height
  },

  sumType: "latest",
  setSumType: (sumType) => {
    set({ sumType })
  },
}))

export default function EmissionsByCountrySection() {
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const setDimensions = useStore((state) => state.setDimensions)
  const { ref } = useResizeObserver(setDimensions)

  const allNodes = useStore((state) => state.nodes)
  const setData = useStore((state) => state.setData)

  const sumType = useStore((state) => state.sumType)
  const setSumType = useStore((state) => state.setSumType)

  const currentMode = useStoryStore((state) => state.mode)
  const setCurrentMode = useStoryStore((state) => state.setMode)

  const adjustedSumType = `${sumType}${
    currentMode === "withLUCF" ? `_${currentMode}` : ""
  }`

  const nodes = allNodes[adjustedSumType] || []

  useEffect(() => {
    if (typeof window === "undefined") return
    setData(width, height)
  }, [width, height])

  const { inView, ref: viewRef } = useInView({
    threshold: 0.5,
    // triggerOnce: true,
  })

  return (
    <Container>
      <SimpleGrid columns={8} spacing={6} px={5}>
        <Center
          gridColumn={["1 / -1", null, null, "-5 / -1"]}
          gridRow={["auto", null, null, "1 / span 1"]}
          minH={["none", null, null, "90vh"]}
        >
          <AspectRatio ratio={1} w="100%">
            <Box ref={ref}>
              <svg ref={viewRef} viewBox={`0 0 ${width} ${height}`}>
                <g transform={`translate(${width / 2} ${height / 2})`}>
                  <AnimatePresence mode="wait">
                    {inView && (
                      <motion.g
                        key={adjustedSumType}
                        transition={{
                          duration: 0.3,
                          bounce: 0,
                          type: "spring",
                        }}
                      >
                        {nodes.map((node, i) => {
                          console.log(node)
                          return (
                            <motion.g
                              key={`${node.name}`}
                              transform={`translate(${node.x} ${node.y})`}
                            >
                              <motion.circle
                                key={`${node.name}-circle`}
                                r={node.r}
                                initial={{
                                  scale: 0,
                                }}
                                animate={{
                                  scale: 1,
                                  transition: {
                                    duration: 0.5,
                                    delay: Math.min(i, 20) * 0.015,
                                    bounce: 0,
                                    type: "spring",
                                  },
                                }}
                                exit={{
                                  scale: 0,
                                  transition: {
                                    duration: 0.3,
                                    bounce: 0,
                                    type: "spring",
                                  },
                                }}
                                fill={node.circleFill}
                              />
                              {/* {node.showLabel ? (
                                <text
                                  textAnchor="middle"
                                  alignmentBaseline="central"
                                  fill={node.textFill}
                                  fontSize={16}
                                  fontWeight={600}
                                >
                                  {node.full_name}
                                </text>
                              ) : null} */}
                              {node.showLabel ? (
                                <SVGText
                                  textAnchor="middle"
                                  alignmentBaseline="central"
                                  fill={node.textFill}
                                  fontSize={node.r < 50 ? 12 : 16}
                                  fontWeight={600}
                                  verticalAnchor="middle"
                                  width={node.r * 2 - 8}
                                >
                                  {node.full_name}
                                </SVGText>
                              ) : null}
                            </motion.g>
                          )
                        })}
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              </svg>
            </Box>
          </AspectRatio>
        </Center>

        {/* <Box
          ref={ref}
          gridColumn={["1 / -1", null, null, "-5 / -1"]}
          gridRow={["auto", null, null, "1 / span 1"]}
          color="blue.500"
          h={["75vh", null, null, "90vh"]}
        >
          <svg ref={viewRef} viewBox={`0 0 ${width} ${height}`}>
            <g transform={`translate(${width / 2} ${height / 2})`}>
              <AnimatePresence mode="wait">
                {inView && (
                  <motion.g
                    key={adjustedSumType}
                    transition={{ duration: 0.3, bounce: 0, type: "spring" }}
                  >
                    {nodes.map((node, i) => {
                      return (
                        <motion.g
                          key={`${node.name}`}
                          transform={`translate(${node.x} ${node.y})`}
                        >
                          <motion.circle
                            key={`${node.name}-circle`}
                            r={node.r}
                            initial={{
                              scale: 0,
                            }}
                            animate={{
                              scale: 1,
                              transition: {
                                duration: 0.5,
                                delay: Math.min(i, 20) * 0.015,
                                bounce: 0,
                                type: "spring",
                              },
                            }}
                            exit={{
                              scale: 0,
                              transition: {
                                duration: 0.3,
                                bounce: 0,
                                type: "spring",
                              },
                            }}
                            fill={node.circleFill}
                          />
                          {node.showLabel ? (
                            <text
                              textAnchor="middle"
                              alignmentBaseline="central"
                              fill={node.textFill}
                              fontSize={16}
                              fontWeight={600}
                            >
                              {node.name}
                            </text>
                          ) : null}
                        </motion.g>
                      )
                    })}
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          </svg>
        </Box> */}

        <Stack
          spacing={6}
          gridColumn={["1 / -1", null, null, "1 / -5", "2 / -5"]}
          gridRow="1 / span 1"
        >
          <Heading as="h3" fontSize="5xl">
            {"Emissions"}
            <br />
            <Text
              as="strong"
              fontSize="inherit"
              lineHeight="inherit"
              fontWeight="inherit"
              color="blue.500"
            >
              {"by country"}
            </Text>
          </Heading>
          <Text fontSize="xl">
            {
              "With a few exceptions, greenhouse gas emissions have been growing over the past 30 years."
            }
          </Text>
          <Text fontSize="xl">
            {
              "With this tool, we illustrate which markets have emitted the most historically, as well as just in the past year.  Some markets like the US and China have both the highest cumulative emissions and continue to emit at the highest rates – the onus falls on these markets to rapidly decarbonize."
            }
          </Text>
          <RadioGroup
            name="Emissions sum type"
            value={sumType}
            onChange={(val) => setSumType(val)}
            spacing={1}
          >
            <RadioGroupItem flex={1} value="cumulative">
              {"Cumulative (1990 - 2021)"}
            </RadioGroupItem>
            <RadioGroupItem flex={1} value="latest">
              {"Latest (2021)"}
            </RadioGroupItem>
          </RadioGroup>
        </Stack>

        <Stack
          gridColumn={["1 / -1", null, "1 / span 4", "2 / span 3"]}
          spacing={1}
        >
          <Box h={5} bgGradient="linear(to-r, blue.100, blue.500, blue.800)" />
          <HStack justifyContent="space-between">
            <HStack spacing={1} color="gray.500">
              <ArrowLeftIcon strokeWidth={1.5} size="1rem" />
              <Text fontSize="sm" lineHeight="shorter">
                {"Less emissions"}
              </Text>
            </HStack>
            <HStack spacing={1} color="gray.500">
              <Text fontSize="sm" lineHeight="shorter">
                {"More emissions"}
              </Text>
              <ArrowRightIcon strokeWidth={1.5} size="1rem" />
            </HStack>
          </HStack>
        </Stack>

        <Box gridColumn={["1/ -1", null, "-5 / -1"]}>
          <Switch
            fontWeight={600}
            fontSize="sm"
            lineHeight="shorter"
            display="flex"
            flexDirection="row-reverse"
            alignItems="center"
            gap={3}
            isChecked={currentMode === "withLUCF"}
            onChange={(e) => {
              const isChecked = e.target.checked
              setCurrentMode(isChecked ? "withLUCF" : "withoutLUCF")
            }}
          >
            {"Show data including LUCF*"}
          </Switch>
        </Box>

        <Text
          gridColumn={["1 / -1", null, null, "2 / -3"]}
          fontSize="xl"
          mt={20}
        >
          {
            "Below, you can find these emissions broken down by sector to show governments where they should prioritize their decarbonization strategies and compare their impact to other markets."
          }
        </Text>
      </SimpleGrid>
    </Container>
  )
}

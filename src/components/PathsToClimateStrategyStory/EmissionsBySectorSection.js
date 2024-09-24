import { useEffect, forwardRef, useMemo, useState } from "react"
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Select,
  useTheme,
  Tooltip,
  Switch,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { create } from "zustand"
import _sortBy from "lodash/sortBy"
import _sumBy from "lodash/sumBy"

import fetchDataset from "@/utils/api/client/fetchDataset"
import { useStoryStore } from "@/components/PathsToClimateStrategyStory/useStoryStore"
import { sectorIcons } from "@/components/Icon"
import { useResizeObserver } from "@/utils/useResizeObserver"
import { getPack } from "./getDistribution"

const useStore = create((set, get) => ({
  width: 0,
  height: 0,
  setDimensions: (width, height) => set({ width, height }),
  data: null,
  setData: async (width, height) => {
    if (!width || !height || get().data) return

    const url = "/data/emissions/all.txt"
    // const emissionsData = await fetch(url).then((res) => res.json())
    const emissionsData = await fetchDataset(url, "json")

    const parsedEmissionsData = _sortBy(
      emissionsData.filter((d) => !["WORLD", "EUU"].includes(d.name)),
      (o) => -o.total
    )
    const totalSum = _sumBy(parsedEmissionsData, (o) => o.total || 0)
    const totalSum_withLUCF = _sumBy(
      parsedEmissionsData,
      (o) => o.total_withLUCF || 0
    )

    const totalBySector = parsedEmissionsData.reduce((acc, cur) => {
      if (!acc.length)
        return cur.sectors.map((d, i) => ({
          name: d.name,
          total: d.total,
          total_withLUCF: cur.sectors_withLUCF[i].total,
        }))
      return acc.map((d, i) => ({
        name: d.name,
        total: d.total + (cur.sectors[i].total || 0),
        total_withLUCF: d.total_withLUCF + (cur.sectors_withLUCF[i].total || 0),
      }))
    }, [])

    const sums = [
      { name: "All", total: totalSum, total_withLUCF: totalSum_withLUCF },
      ...totalBySector,
    ]

    const emissionsWithSumsData = parsedEmissionsData.map((d) => ({
      ...d,
      sums,
    }))

    set({ data: emissionsWithSumsData })
  },
  pathVisibility: false,
  setPathVisibility: (pathVisibility) => set({ pathVisibility }),
  nodes: [],
  updateNodes: () => {
    if (!get().nodes.length) return
    // TODO: Update nodes based on width and height
  },
}))

const MiniChart = forwardRef(({ iso3, inView, ...props }, ref) => {
  const { colors } = useTheme()

  const [isoValue, setIsoValue] = useState(iso3)

  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const data = useStore((state) => state.data)

  const currentMode = useStoryStore((state) => state.mode)

  const root = useMemo(() => {
    if (!data) return {}
    return getPack(
      data.find((s) => s.name === isoValue),
      width,
      height,
      currentMode
    )
  }, [isoValue, data, width, height, currentMode])

  return (
    <Stack spacing={3}>
      <Box fontWeight={600} pb={2}>
        <Select
          value={isoValue}
          onChange={(e) => setIsoValue(e.target.value)}
          size="lg"
          variant="flushed"
          fontWeight={600}
        >
          {data?.map((d) => {
            return (
              <option key={d.name} value={d.name}>
                {d.full_name}
              </option>
            )
          })}
        </Select>
      </Box>
      <Box ref={ref} aspectRatio={1} color="blue.500" {...props}>
        <svg viewBox={`0 0 ${width} ${height}`}>
          <AnimatePresence>
            {inView &&
              root.children?.map((node, i) => {
                const sectorColors =
                  colors[node.data.name.toLowerCase().split("+")[0].trim()] ||
                  colors.gray
                const fill = sectorColors[400]
                // const showLabel = node.data.name !== "Waste" ? node.r > 50 : false
                // const showLabel =
                //   node.data.name !== "Waste" ? node.r > 32 : false

                const showLabel =
                  node.data.name !== "Other" ? node.r > 32 : false

                const SectorIcon =
                  sectorIcons[
                    node.data.name.split("+").join("and").split(" ").join("") +
                      "IconRaw"
                  ] || null

                return (
                  <motion.g
                    key={node.data.name}
                    initial={{ opacity: 0, x: node.x, y: node.y }}
                    animate={{ opacity: 1, x: node.x, y: node.y }}
                    exit={{ opacity: 0, x: node.x, y: node.y }}
                    transition={{
                      duration: 0.5,
                      bounce: 0,
                      type: "spring",
                    }}
                  >
                    <Tooltip
                      label={
                        <Stack spacing={0} textAlign="center" p={3}>
                          <Box>{node.data.name}</Box>
                          <Box>{`${
                            Math.round(node.data.value * 100) / 100
                          } MtCO2e`}</Box>
                        </Stack>
                      }
                      hasArrow
                      placement="top"
                    >
                      <motion.circle
                        initial={{ r: 0 }}
                        animate={{ r: node.r }}
                        exit={{ r: 0 }}
                        fill={fill}
                        tabIndex={0}
                        transition={{
                          duration: 0.5,
                          bounce: 0,
                          type: "spring",
                        }}
                        style={{ outline: "none" }}
                      />
                    </Tooltip>
                    {showLabel && SectorIcon && (
                      <g
                        fill="none"
                        stroke="#FFF"
                        transform="translate(-20 -20)"
                        style={{ pointerEvents: "none" }}
                      >
                        <SectorIcon />
                      </g>
                    )}
                    {/* {showLabel && (
                    <VisText
                      width={node.r}
                      verticalAnchor="middle"
                      textAnchor="middle"
                      fontWeight={500}
                      fill={sectorColors[100]}
                      style={{ pointerEvents: "none" }}
                    >
                      {node.data.name}
                    </VisText>
                  )} */}
                  </motion.g>
                )
              })}
          </AnimatePresence>
        </svg>
      </Box>

      {/* <Divider borderColor="black" borderBottomWidth="0.25rem" /> */}

      <HStack spacing={0}>
        {root.children?.map((d) => {
          const val = (100 / d.parent.value) * d.value
          const sectorColors =
            colors[d.data.name.toLowerCase().split("+")[0].trim()] ||
            colors.gray
          const fill = sectorColors[400]
          return (
            <Box
              key={d.data.name}
              flex="none"
              h={3}
              style={{ width: val + "%", background: fill }}
            />
          )
        })}
      </HStack>

      <HStack justifyContent="space-between">
        <Box fontSize="lg" lineHeight="shorter" fontWeight={600}>
          {"Total"}
        </Box>
        <Box
          textAlign="right"
          fontSize="lg"
          lineHeight="shorter"
          fontWeight={600}
        >
          {`${(Math.round(root.value * 100) / 100).toLocaleString()} MtCO2e`}
        </Box>
      </HStack>
    </Stack>
  )
})

export default function EmissionsBySectorSection() {
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const setDimensions = useStore((state) => state.setDimensions)
  const { ref } = useResizeObserver(setDimensions)

  // const nodes = useStore((state) => state.nodes)
  const setData = useStore((state) => state.setData)

  const currentMode = useStoryStore((state) => state.mode)
  const setCurrentMode = useStoryStore((state) => state.setMode)

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
        <Stack
          spacing={6}
          gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
          gridRow="1 / span 1"
        >
          <Heading as="h3" fontSize="5xl">
            {"Emissions "}
            <br />
            <Text
              as="strong"
              fontSize="inherit"
              lineHeight="inherit"
              fontWeight="inherit"
              color="blue.500"
            >
              {"by sector"}
            </Text>
          </Heading>
          <Text fontSize="2xl">
            {
              "This section is showing emissions (in MtCO2e) by sector in 2020. This chart takes into account BNEF’s Pathfinders sectors, namely "
            }
            <Text
              as="span"
              fontWeight={600}
              bg="indigo.400"
              color="white"
              px={2}
            >
              {"Power and Grids + Buildings"}
            </Text>
            {", "}
            <Text as="span" fontWeight={600} bg="red.400" color="white" px={2}>
              {"Industry and Materials"}
            </Text>
            {", "}
            <Text
              as="span"
              fontWeight={600}
              bg="purple.400"
              color="white"
              px={2}
            >
              {"Transport"}
            </Text>
            {",and "}
            <Text
              as="span"
              fontWeight={600}
              bg="green.400"
              color="white"
              px={2}
            >
              {"Agriculture"}
            </Text>
            {". Each sector was mapped to the ClimateWatch sectors."}
          </Text>
          <Text fontSize="2xl">
            {
              "The gray circle includes Waste and Fugitive emissions, as well as LUCF depending on the chosen setting. Toggle to include or exclude LUCF in the other emissions. For some countries, LUCF represent a large proportion of their emissions. However, Pathfinders focuses on the five major emitting sectors listed above."
            }
          </Text>
          <Text fontSize="2xl">
            {
              "The size of the circle corresponds to the volume of GHG emissions coming from the particular sector it represents."
            }
          </Text>
        </Stack>

        <Box gridColumn="1 / -1" textAlign="right">
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

        <SimpleGrid
          ref={viewRef}
          columns={[2, null, null, 4]}
          spacing={6}
          gridColumn="1 / -1"
          py={12}
        >
          <MiniChart iso3="CHN" inView={inView} ref={ref} />
          <MiniChart iso3="BRA" inView={inView} />
          <MiniChart iso3="UGA" inView={inView} />
          <MiniChart iso3="SGP" inView={inView} />
        </SimpleGrid>

        <HStack spacing={6} gridColumn="1 / -1">
          <HStack spacing={2}>
            <Box flex="none" bg="indigo.400" w={4} h={4} borderRadius="full" />
            <Text color="indigo.500" lineHeight="shorter">
              {"Power and Grids + Buildings"}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Box flex="none" bg="red.400" w={4} h={4} borderRadius="full" />
            <Text color="red.500" lineHeight="shorter">
              {"Industry and Materials"}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Box flex="none" bg="purple.400" w={4} h={4} borderRadius="full" />
            <Text color="purple.500" lineHeight="shorter">
              {"Transport"}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Box flex="none" bg="green.400" w={4} h={4} borderRadius="full" />
            <Text color="green.500" lineHeight="shorter">
              {"Agriculture"}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Box flex="none" bg="gray.400" w={4} h={4} borderRadius="full" />
            <Text color="gray.500" lineHeight="shorter">
              {"Other"}
            </Text>
          </HStack>
        </HStack>

        <Text gridColumn={["1 / -1", null, null, "2 / -3"]} fontSize="2xl">
          {
            "Use this tool to easily compare the emissions impact of several markets simultaneously to evaluate and understand how governments’ priorities should differ when designing decarbonization strategies."
          }
        </Text>
      </SimpleGrid>
    </Container>
  )
}

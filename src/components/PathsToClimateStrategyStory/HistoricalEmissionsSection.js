import { useEffect } from "react"
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react"
import { scaleLinear } from "d3-scale"
import { extent as _extent } from "d3-array"
import { create } from "zustand"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import fetchDataset from "@/utils/api/client/fetchDataset"
import { useResizeObserver } from "@/utils/useResizeObserver"
import { useStoryStore } from "@/components/PathsToClimateStrategyStory/useStoryStore"
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup"

const useStore = create((set) => ({
  width: 0,
  height: 0,
  setDimensions: (width, height) => {
    set({ width, height })
  },
  data: null,
  setData: (data) => set({ data }),
  pathVisibility: false,
  setPathVisibility: (pathVisibility) => set({ pathVisibility }),
}))

export default function HistoricalEmissionsSection() {
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const setDimensions = useStore((state) => state.setDimensions)

  const data = useStore((state) => state.data)
  const setData = useStore((state) => state.setData)

  const currentMode = useStoryStore((state) => state.mode)
  const setCurrentMode = useStoryStore((state) => state.setMode)

  const currentDataset =
    currentMode === "withLUCF" ? `data_${currentMode}` : "data"

  const { ref } = useResizeObserver(setDimensions)

  useEffect(() => {
    if (typeof window === "undefined") return
    fetchDataset("/data/emissions/world.txt", "json").then((data) =>
      setData(data)
    )
    // fetch("/data/emissions/world.json")
    //   .then((res) => res.json())
    //   .then((data) => setData(data))
  }, [])

  const timeseries = {
    data: data?.data,
    data_withLUCF: data?.data_withLUCF,
  }[currentDataset]

  const [xMin, xMax] = timeseries
    ? _extent(timeseries || [], (o) => o.year)
    : []
  const [yMin, yMax] = timeseries
    ? _extent(timeseries || [], (o) => o.value)
    : []

  const xScale = scaleLinear()
    .domain([xMin, xMax])
    .range([20, width - 20])

  const yScale = scaleLinear()
    .domain([yMin, yMax])
    .range([height - 80, 40])

  const dPath = timeseries
    ? "M" +
      timeseries
        .map((d) => [xScale(d.year), yScale(d.value)].join(","))
        .join("L")
    : ""

  const { inView, ref: viewRef } = useInView({
    threshold: 0.5,
    // triggerOnce: true,
  })

  return (
    <Container>
      <SimpleGrid columns={8} spacing={6} px={5}>
        <Box
          ref={ref}
          gridColumn="1 / -1"
          gridRow="1 / span 1"
          bg="transparent"
          h="90vh"
          color="blue.500"
        >
          <svg ref={viewRef} viewBox={`0 0 ${width} ${height}`}>
            {/* <XYAxis xScale={xScale} yScale={yScale} /> */}
            <XAxis xScale={xScale} />

            {dPath && (
              <motion.path
                d={dPath}
                fill="none"
                stroke="currentcolor"
                strokeWidth={3}
                strokeLinejoin="round"
                initial={{ pathLength: 0, d: dPath }}
                animate={{ pathLength: inView ? 1 : 0, d: dPath }}
                transition={{ duration: 1.5, bounce: 0, type: "spring" }}
              />
            )}
            <motion.g
              animate={{
                x: xScale(timeseries?.slice(-1)[0].year),
                y: yScale(timeseries?.slice(-1)[0].value),
              }}
              transition={{
                duration: 1.5,
                bounce: 0,
                type: "spring",
              }}
            >
              <motion.circle
                r={11}
                fill="currentcolor"
                stroke="#FFF"
                strokeWidth={2}
                initial={{ r: 0 }}
                animate={{ r: inView ? 11 : 0 }}
                transition={{
                  duration: 1.5,
                  delay: inView ? 1 : 0,
                  bounce: 0,
                  type: "spring",
                }}
              />
            </motion.g>
            <motion.text
              x={xScale(timeseries?.slice(-1)[0].year) || 0}
              y={(yScale(timeseries?.slice(-1)[0].value) || 0) - 16}
              textAnchor="end"
              fontWeight={600}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{
                duration: 1.5,
                delay: inView ? 1 : 0,
                bounce: 0,
                type: "spring",
              }}
            >
              {Math.round(timeseries?.slice(-1)[0].value).toLocaleString(
                "en-US"
              ) + " MtCO2e"}
            </motion.text>
          </svg>
        </Box>
        <Stack
          spacing={6}
          gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -5"]}
          gridRow="1 / span 1"
        >
          <Heading as="h3" fontSize="5xl">
            {"Historical"}
            <br />
            <Text
              as="strong"
              fontSize="inherit"
              lineHeight="inherit"
              fontWeight="inherit"
              color="blue.500"
            >
              {"Emissions"}
            </Text>
          </Heading>
          <Text fontSize="2xl" color="gray.500">
            {"Total global emissions, "}
            {currentMode === "withLUCF" ? "including" : "excluding"}
            {" LUCF,"}
            <br />
            {"1990 - 2021."}
          </Text>
          {/* <RadioGroup
            name="Mode"
            value={currentMode}
            onChange={(val) => setCurrentMode(val)}
            spacing={1}
          >
            <RadioGroupItem flex={1} value="withoutLUCF">
              {"Without LUCF"}
            </RadioGroupItem>
            <RadioGroupItem flex={1} value="withLUCF">
              {"With LUCF"}
            </RadioGroupItem>
          </RadioGroup> */}
        </Stack>
        <Box gridColumn="1 / span 6">
          <Text lineHeight="short" color="gray.500">
            {
              "Source: Climate Watch Historical GHG Emissions. 2022. Washington, DC: World Resources Institute. Available online at: https://www.climatewatchdata.org/ghg-emissions"
            }
          </Text>
        </Box>
        <Box gridColumn="span 2" spacing={3}>
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
        <Text gridColumn="2 / -3" fontSize="xl" mt={20}>
          {
            "The land-use change and forestry (LUCF) sector can be a carbon sink or a source of emissions. Trees and other vegetation take up carbon dioxide from the atmosphere, but they also release emissions when they are cut down, burned or converted to other land uses. Depending on the balance between emissions and carbon sequestration in this sector within a country’s territory, the resulting net emissions could be positive or negative."
          }
        </Text>
      </SimpleGrid>
    </Container>
  )
}

// function XYAxis({ xScale, yScale }) {
//   // const width = useStore((state) => state.width)
//   const height = useStore((state) => state.height)

//   const [x1, x2] = xScale.range()

//   const xTicks = xScale.ticks(5)
//   const yTicks = yScale.ticks(5)

//   return (
//     <g>
//       {yTicks.map(tick => {
//         return (

//         )
//       })}
//       <g transform={`translate(0 ${height - 48})`}>
//         <line x1={x1} x2={x2} stroke="#000" strokeWidth={2} />
//         {xTicks.map((tick) => {
//           return (
//             <text
//               key={tick}
//               x={xScale(tick)}
//               y={6}
//               textAnchor="middle"
//               alignmentBaseline="hanging"
//               fontSize={14}
//               fontWeight={600}
//             >
//               {tick}
//             </text>
//           )
//         })}
//       </g>
//     </g>
//   )
// }

function XAxis({ xScale }) {
  // const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)

  const [x1, x2] = xScale.range()

  const ticks = xScale.ticks(5)
  // console.log(ticks)

  return (
    <g transform={`translate(0 ${height - 48})`}>
      <line x1={x1} x2={x2} stroke="#000" strokeWidth={2} />
      {ticks.map((tick) => {
        return (
          <text
            key={tick}
            x={xScale(tick)}
            y={6}
            textAnchor="middle"
            alignmentBaseline="hanging"
            fontSize={14}
            fontWeight={600}
          >
            {tick}
          </text>
        )
      })}
    </g>
  )
}

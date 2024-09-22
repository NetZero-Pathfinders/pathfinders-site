import { readdir } from "fs/promises"
import { join } from "path"
import { useState, useEffect } from "react"
import {
  Container,
  Divider,
  SimpleGrid,
  HStack,
  Stack,
  Box,
  Text,
  useTheme,
  Menu,
  MenuList,
  MenuButton,
  // MenuItem,
  MenuOptionGroup,
  MenuItemOption,
  Select,
  Input,
  Textarea,
  Button,
  useClipboard,
} from "@chakra-ui/react"
import _groupBy from "lodash/groupBy"

import getNavigation from "@/utils/api/server/getNavigation"
import ChartWrapper from "@/components/ChartWrapper"
import FileUpload from "@/components/FileUpload"
import { Link } from "@/components/Link"

function Control({ label, inputType, children, ...restProps }) {
  return (
    <Stack spacing={1} as="label">
      <Box
        as="span"
        fontSize="xs"
        lineHeight="1.25"
        fontWeight={600}
        color="gray.500"
      >
        {label}
      </Box>
      {inputType === "input" ? <Input {...restProps} /> : ""}
      {inputType === "textarea" ? (
        <Textarea borderRadius={0} {...restProps} />
      ) : (
        ""
      )}
      {inputType === "number" ? <Input type="number" {...restProps} /> : null}
      {children}
    </Stack>
  )
}

function Summary({
  currentSrc,
  currentChartType,
  orientation,
  chartPadding,
  currentDataset,
  chartTitle,
  chartCaption,
  colors,
}) {
  const tag =
    {
      "line": "LineChart",
      "bar": "BarChart",
      "scatter": "ScatterPlot",
    }[currentChartType] || "Chart"

  const finalValue = [
    `<${tag}`,
    currentSrc ? `src="${currentSrc}"` : "",
    chartTitle ? `title="${chartTitle}"` : "",
    chartCaption ? `caption="${chartCaption}"` : "",
    currentChartType === "bar" ? `orientation="${orientation}"` : "",
    `padding={[${chartPadding.top},${chartPadding.right},${chartPadding.bottom},${chartPadding.left}]}`,
    `colors={${JSON.stringify(
      colors.reduce((acc, cur) => {
        acc[cur.name] = cur.color
        return acc
      }, {})
    )}}`,
    `/>`,
  ]
    .filter((d) => d)
    .join(" ")

  const { onCopy, setValue, hasCopied } = useClipboard("")

  useEffect(() => {
    if (typeof window === "undefined") return
    setValue(finalValue)
  }, [finalValue])

  return (
    <HStack spacing={1}>
      <Box flex="1">
        <Input fontFamily="mono" bg="gray.50" value={finalValue} readOnly />
      </Box>
      <Box flex="none">
        <Button colorScheme="blue" onClick={onCopy}>
          {hasCopied ? "Copied..." : "Copy"}
        </Button>
      </Box>
    </HStack>
  )
}

export default function ChartBuilder() {
  const { colors } = useTheme()

  const [currentChartType, setCurrentChartType] = useState("scatter")
  const [currentSrc, setCurrentSrc] = useState("")
  const [orientation, setOrientation] = useState("horizontal")
  const [chartPadding, setChartPadding] = useState({
    top: 24,
    left: 48,
    bottom: 24,
    right: 0,
  })
  const [currentDataset, setCurrentDataset] = useState(null)

  const [chartTitle, setChartTitle] = useState("")
  const [chartCaption, setChartCaption] = useState("")

  const chartTypes = ["bar", "line", "scatter"]

  const [groupColors, setGroupColors] = useState(
    Object.keys(_groupBy(currentDataset, (o) => o.group)).map((name, i) => ({
      name,
      color: colors.charts[(i + 1) * 100] || "#000",
    }))
  )

  return (
    <Stack spacing={12} py={24}>
      <Divider />

      <Container>
        <SimpleGrid columns={3} gridGap={6} px={5}>
          <Box
            gridColumn="1 / -2"
            position="sticky"
            top={5}
            _hover={{
              "figure > div > svg": {
                outline: "0.125rem solid",
                outlineColor: "gray.100",
              },
            }}
            sx={{
              ".chart": {
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                ".chart__title": {
                  fontSize: "2xl",
                  lineHeight: "shorter",
                  letterSpacing: "-0.01em",
                  fontWeight: 700,
                },
                "figure": {
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "md",
                  lineHeight: "short",
                  fontWeight: 500,
                  color: "gray.500",
                },
              },
            }}
          >
            {currentDataset?.length ? (
              <ChartWrapper
                chartType={currentChartType}
                orientation={orientation}
                data={currentDataset}
                chartPadding={chartPadding}
                title={chartTitle}
                caption={chartCaption}
                colors={groupColors.reduce((acc, cur) => {
                  acc[cur.name] = cur.color
                  return acc
                }, {})}
              />
            ) : (
              <Box aspectRatio={16 / 9} bg="gray.50" />
            )}
          </Box>
          <Stack gridColumn="-2 / -1" spacing={3}>
            <Stack spacing={1}>
              <Box
                fontSize="xs"
                lineHeight="1.25"
                fontWeight={600}
                color="gray.500"
              >
                {"Data upload"}
              </Box>
              <FileUpload
                label={currentSrc}
                onUpload={(content) => {
                  setCurrentSrc(content[0].name || "")
                  setCurrentDataset(content[0].content)
                }}
              />
            </Stack>
            <Stack spacing={3} display={currentSrc ? "flex" : "none"}>
              <Control
                label="Title"
                placeholder="Title"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                inputType="input"
              />

              <Control
                label="Caption"
                placeholder="Caption"
                value={chartCaption}
                onChange={(e) => setChartCaption(e.target.value)}
                inputType="textarea"
              />

              <Control label="Chart type">
                <Select
                  value={currentChartType}
                  onChange={(e) => {
                    const updatedChartType = e.target.value
                    if (updatedChartType !== "bar") setOrientation("horizontal")
                    setCurrentChartType(updatedChartType)
                  }}
                  borderRadius={0}
                >
                  {chartTypes.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </Control>

              <Control label="Orientation">
                <Select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  disabled={currentChartType !== "bar"}
                  borderRadius={0}
                >
                  <option value="horizontal">{"Horizontal"}</option>
                  <option value="vertical">{"Vertical"}</option>
                </Select>
              </Control>

              <SimpleGrid columns={4} gridGap={3}>
                <Control
                  label={
                    <>
                      {"Top "}
                      <br />
                      {"padding"}
                    </>
                  }
                  inputType="number"
                  min={0}
                  step={4}
                  placeholder={0}
                  value={chartPadding.top}
                  onChange={(e) =>
                    setChartPadding({
                      ...chartPadding,
                      top: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Control
                  label={
                    <>
                      {"Right "}
                      <br />
                      {"padding"}
                    </>
                  }
                  inputType="number"
                  min={0}
                  step={4}
                  placeholder={0}
                  value={chartPadding.right}
                  onChange={(e) =>
                    setChartPadding({
                      ...chartPadding,
                      right: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Control
                  label={
                    <>
                      {"Bottom "}
                      <br />
                      {"padding"}
                    </>
                  }
                  inputType="number"
                  min={0}
                  step={4}
                  placeholder={0}
                  value={chartPadding.bottom}
                  onChange={(e) =>
                    setChartPadding({
                      ...chartPadding,
                      bottom: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Control
                  label={
                    <>
                      {"Left "}
                      <br />
                      {"padding"}
                    </>
                  }
                  inputType="number"
                  min={0}
                  step={4}
                  placeholder={0}
                  value={chartPadding.left}
                  onChange={(e) =>
                    setChartPadding({
                      ...chartPadding,
                      left: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </SimpleGrid>

              <Control label="Group colors">
                {currentDataset && (
                  <ChartColorsSelector
                    currentDataset={currentDataset}
                    groupColors={groupColors}
                    setGroupColors={setGroupColors}
                  />
                )}
              </Control>
            </Stack>
          </Stack>

          <Stack
            gridColumn="1 / -1"
            spacing={6}
            display={currentSrc ? "flex" : "none"}
          >
            <Divider />
            {currentSrc && (
              <Text>
                {`Before embedding your chart in a best practice, please make sure that you `}
                <Link
                  href="https://github.com/zcreativelabs/content-editor/upload/main/data"
                  target="_blank"
                >
                  {"upload your dataset"}
                </Link>
                {" ("}
                <em>{currentSrc}</em>
                {") "}
                {`to the data directory.`}
              </Text>
            )}
            <Stack spacing={1}>
              <Box
                fontSize="xs"
                lineHeight="1.25"
                fontWeight={600}
                color="gray.500"
              >
                {"Code snippet"}
              </Box>
              <Summary
                currentSrc={currentSrc}
                currentChartType={currentChartType}
                orientation={orientation}
                chartPadding={chartPadding}
                currentDataset={currentDataset}
                chartTitle={chartTitle}
                chartCaption={chartCaption}
                colors={groupColors}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider />
    </Stack>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  const allCharts = await readdir(
    join(process.env.PWD, "public", "data", "charts")
  )
  return { props: { navigation, allCharts } }
}

function ChartColorsSelector({ currentDataset, groupColors, setGroupColors }) {
  const { colors } = useTheme()

  const allColors = Object.entries(colors.charts).map(([name, color]) => ({
    name,
    color,
  }))

  useEffect(() => {
    setGroupColors(
      Object.keys(_groupBy(currentDataset, (o) => o.group)).map((name, i) => ({
        name,
        color: colors.charts[(i + 1) * 100] || "#000",
      }))
    )
  }, [JSON.stringify(currentDataset)])

  return (
    <Stack spacing={3}>
      {groupColors.map((groupColor) => {
        return (
          <Menu key={groupColor.name} matchWidth placement="bottom">
            <MenuButton
              textAlign="left"
              whiteSpace="nowrap"
              overflow="hidden"
              border="0.0625rem solid"
              borderColor="gray.200"
              p={3}
            >
              <HStack spacing={3}>
                <Box w={4} h={4} style={{ background: groupColor.color }} />
                <Box textOverflow="ellipsis" w="100%" overflow="hidden">
                  {groupColor.name === "undefined"
                    ? groupColor.color
                    : groupColor.name}
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                value={groupColor.color}
                type="radio"
                title="Colors"
                onChange={(color) => {
                  setGroupColors(
                    groupColors.map((d) => {
                      return d.name === groupColor.name
                        ? { name: groupColor.name, color }
                        : d
                    })
                  )
                }}
              >
                {allColors.map(({ name, color }) => {
                  return (
                    <MenuItemOption key={name} value={color}>
                      <HStack spacing={3}>
                        <Box w={4} h={4} style={{ background: color }} />
                        <Box>{name}</Box>
                      </HStack>
                    </MenuItemOption>
                  )
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        )

        return (
          <HStack key={groupColor.name} spacing={1} alignItems="flex-start">
            <Box w={5} h={5} style={{ background: groupColor.color }} />
            <Box flex={1} lineHeight="shorter">
              {groupColor.name}
            </Box>
          </HStack>
        )
      })}
    </Stack>
  )
}

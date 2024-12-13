import { Heading, Text, Box, SimpleGrid, Stack } from "@chakra-ui/react"

import baseComponents from "@/components/MDXComponents/baseComponents"
import { EmissionsChartListing } from "@/components/EmissionsChart"

// import BarChart from "@components/BarChart"
// import LineChart from "@components/LineChart"
import ChartWrapper from "@/components/ChartWrapper"

export default {
  ...baseComponents,
  SignUpButton: (props) => <div {...props} />,

  h2: ({ children, ...restProps }) => {
    const isSource = `${children}`.trim().toLowerCase().startsWith("source")
    return isSource ? (
      <Heading as="h2" textStyle="h2_mdx_source" {...restProps}>
        {children}
      </Heading>
    ) : (
      <Heading as="h2" textStyle="h2_mdx" {...restProps}>
        {children}
      </Heading>
    )
  },

  EmissionsChart: ({ chartTitle = "Emissions by sector", ...restProps }) => (
    <Stack
      gridColumn="2 / span 5"
      spacing={3}
      borderY="0.0625rem solid"
      borderColor="gray.200"
      pt={5}
      pb={6}
    >
      <Heading as="h3" fontSize="xl">
        {props.chartTitle}
      </Heading>
      <EmissionsChartListing {...restProps} />
    </Stack>
  ),

  KeyFigures: (props) => {
    return (
      <SimpleGrid
        as="aside"
        gridColumn={["1 / -1", null, null, null, "2 / -2"]}
        columns={[1, null, null, 3]}
        spacing={6}
        pb={10}
        {...props}
      />
    )

    // return (
    //   <Box as="aside" gridColumn="2 / span 6" pb={10}>
    //     <HStack as="ul" gap={10} alignItems="flex-start" {...props} />
    //   </Box>
    // )
  },
  KeyFigure: ({ title, subtitle, ...restProps }) => {
    return (
      <Stack
        as="li"
        spacing={3}
        borderBottom="0.25rem solid"
        borderColor="black"
        py={[3, null, null, 6]}
        {...restProps}
      >
        <Heading
          as="h3"
          fontSize={["2xl", null, "3xl"]}
          lineHeight="shorter"
          color="blue.500"
        >
          {title}
        </Heading>
        <Text
          fontSize={["lg", null, "xl"]}
          lineHeight="short"
          fontWeight={500}
          color="gray.500"
        >
          {subtitle}
        </Text>
      </Stack>
    )
  },

  BarChart: (props) => {
    return (
      <ChartContainer>
        <ChartWrapper chartType="bar" {...props} />
      </ChartContainer>
    )
  },
  LineChart: (props) => {
    return (
      <ChartContainer>
        <ChartWrapper chartType="line" {...props} />
      </ChartContainer>
    )
  },
  ScatterPlot: (props) => {
    return (
      <ChartContainer>
        <ChartWrapper chartType="scatter" {...props} />
      </ChartContainer>
    )
  },
}

function ChartContainer(props) {
  return (
    <Box
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      sx={{
        ".chart": {
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          ".chart__title": {
            fontSize: "2xl",
            lineHeight: "shorter",
            letterSpacing: "-0.015em",
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
      {...props}
    />
  )
}

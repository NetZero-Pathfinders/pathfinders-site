import { useState, useEffect, useMemo } from "react"
import { useTheme } from "@chakra-ui/system"
import { SimpleGrid, Text, Box, Stack, HStack, Center } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import _groupBy from "lodash/groupBy"
import { AnimatePresence, motion } from "framer-motion"

import { Tabs, TabList, Tab, TabUnderline } from "@/components/Tabs"
import {
  sectorIcons,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@/components/Icon"
import Action from "./Action"

function SectorSelect({ sectors, currentSector, setCurrentSector }) {
  const { colors } = useTheme()
  const currentSectorData = sectors.find((s) => s.key === currentSector)
  const sectorColor =
    colors[currentSectorData.title.toLowerCase()] || colors.gray

  const SectorIcon =
    sectorIcons[currentSectorData.title.split(" ").join("") + "Icon"] || null

  return (
    <HStack
      spacing={1}
      display={["flex", null, null, null, "none"]}
      borderY="0.0625rem solid"
      borderColor="gray.200"
      minH="9.5rem"
    >
      <Box flex="none" alignSelf="stretch">
        <Button
          h="100%"
          px={0}
          variant="ghost"
          onClick={() => {
            const nextSector =
              sectors.find((s) => s.key === currentSector - 1) ||
              sectors.slice(-1)[0]
            setCurrentSector(nextSector.key)
          }}
        >
          <ChevronLeftIcon size="2rem" />
        </Button>
      </Box>
      <Box flex={1} py={4} overflow="hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {currentSectorData && (
            <motion.div
              key={currentSectorData.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, bounce: 0, type: "spring" }}
            >
              <Stack spacing={3} alignItems="center">
                <Center
                  w="5rem"
                  h="5rem"
                  bg="gray.100"
                  borderRadius="full"
                  style={{ background: sectorColor[400], color: "white" }}
                >
                  {SectorIcon && <SectorIcon size="2rem" strokeWidth={1.5} />}
                </Center>
                <Text
                  textAlign="center"
                  fontSize="lg"
                  lineHeight="short"
                  fontWeight={600}
                  style={{ color: sectorColor[900] }}
                >
                  {currentSectorData.title}
                </Text>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <Box flex="none" alignSelf="stretch">
        <Button
          h="100%"
          px={0}
          variant="ghost"
          onClick={() => {
            const nextSector =
              sectors.find((s) => s.key === currentSector + 1) || sectors[0]
            setCurrentSector(nextSector.key)
          }}
        >
          <ChevronRightIcon size="2rem" />
        </Button>
      </Box>
    </HStack>
  )
}

export default function ActionsBySector({
  selectedSector,
  sectors,
  recommendations,
  onChange,
}) {
  const { colors } = useTheme()

  const [currentSector, setCurrentSector] = useState(selectedSector || 1)

  const allActionsByPillar = useMemo(() => {
    const currentRecommendations = recommendations.find(
      (s) => s.key === currentSector
    )

    const actions = currentRecommendations?.pillars.flatMap((d) => {
      const color =
        colors[currentRecommendations.title.toLowerCase()] || colors.gray
      return [
        {
          id: d.key,
          key: d.key,
          title: d.title,
          isHeader: true,
          gridColumn: "span 1",
          gridRow: "1 / span 1",
          color,
        },
        ...d.recommendations.map((dd, i) => {
          return {
            ...dd,
            id: dd.id,
            title: dd.title,
            description: dd.description,
            isHeader: false,
            gridColumn: `${d.key} / span 1`,
            gridRow: `${1 + (i + 1)} / span 1`,
            color,
          }
        }),
      ]
    })
    return actions
  }, [currentSector])

  useEffect(() => {
    if (onChange)
      onChange({
        view: 1,
        currentSector,
        actions: allActionsByPillar.filter((d) => !d.isHeader),
      })
  }, [currentSector, JSON.stringify(allActionsByPillar)])

  return (
    <Stack spacing={6} pt={3}>
      <SectorSelect
        sectors={sectors}
        currentSector={currentSector}
        setCurrentSector={setCurrentSector}
      />

      {!selectedSector && (
        <Tabs
          display={["none", null, null, null, "flex"]}
          index={currentSector - 1}
          onChange={(id) => setCurrentSector(id + 1)}
          w="100%"
        >
          <TabList
            display="grid"
            border="none"
            alignItems="flex-start"
            gridTemplateColumns="repeat(5, 1fr)"
            gridGap={2}
            w="100%"
          >
            {sectors.map((sector) => {
              const colorName = sector.title.toLowerCase().trim()
              const color = colors[colorName] || colors.gray
              const SectorIcon =
                sectorIcons[sector.title.trim().split(" ").join("") + "Icon"] ||
                null
              return (
                <Tab
                  key={sector.key}
                  flex={1}
                  p={0}
                  mb={0}
                  position="relative"
                  sx={{
                    color: "gray.200",
                    p: { color: "gray.500" },
                    svg: { color: "gray.500" },
                  }}
                  _active={{}}
                  _selected={{
                    color: color[400],
                    p: { color: color[900] },
                    svg: { color: "white" },
                  }}
                  _focusVisible={{
                    outline: "0.125rem solid",
                    outlineColor: "black",
                    outlineOffset: "0.125rem",
                  }}
                  _before={{
                    content: "''",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    h: "0.0625rem",
                    bg: "gray.200",
                  }}
                >
                  <Stack spacing={3} alignItems="center" py={5}>
                    <Center w={20} h={20} borderRadius="full" bg="currentcolor">
                      {SectorIcon && (
                        <SectorIcon size="2.5rem" strokeWidth={1.5} />
                      )}
                    </Center>
                    <Text fontWeight={600} fontSize="lg" lineHeight="shorter">
                      {sector.title}
                    </Text>
                  </Stack>
                  {currentSector === sector.key && (
                    <TabUnderline layoutId="underliner" color={color[400]} />
                  )}
                </Tab>
              )
            })}
          </TabList>
        </Tabs>
      )}

      <Box
        w={["100vw", null, null, null, "100%"]}
        ml={["-1.25rem", null, "-3.25rem", null, 0]}
        px={["1.25rem", null, "3.25rem", null, 0]}
        overflowX="scroll"
        scrollSnapType="x mandatory"
      >
        <SimpleGrid
          columns={4}
          spacing={2}
          w={[
            "calc(200% + 0.5rem)",
            null,
            null,
            "calc(133.333% + 0.25rem)",
            "100%",
          ]}
        >
          {allActionsByPillar.map((d, i) => {
            const isHeader = d.isHeader
            return isHeader ? (
              <Stack
                key={d.id}
                spacing={1}
                py={6}
                pr={4}
                borderBottom="0.25rem solid"
                borderColor={d.color[400]}
                scrollSnapAlign="start"
                scrollMargin={["1.25rem", null, "3.25rem", null, 0]}
              >
                <Text
                  fontSize="xl"
                  lineHeight="shorter"
                  fontWeight={600}
                  color={d.color[400]}
                >{`Pillar ${d.key}`}</Text>
                <Text fontSize="xl" fontWeight={600} lineHeight="shorter">
                  {d.title}
                </Text>
              </Stack>
            ) : (
              <Action
                key={`${currentSector}-${d.id}`}
                color={d.color}
                gridColumn={d.gridColumn}
                gridRow={d.gridRow}
                name={d.name}
                slug={d.slug}
                stakeholders={d.stakeholders}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.25,
                    bounce: 0,
                    delay: (parseInt(d.gridRow.split("/")[0]) - 1) * 0.1,
                  },
                }}
              />
            )
          })}
        </SimpleGrid>
      </Box>
    </Stack>
  )
}

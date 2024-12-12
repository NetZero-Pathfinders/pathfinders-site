import { useState, useEffect, useMemo } from "react"
import {
  useTheme,
  SimpleGrid,
  Text,
  HStack,
  Stack,
  Box,
  Center,
  Button,
} from "@chakra-ui/react"
import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"
import { AnimatePresence, motion } from "framer-motion"

import { Tabs, TabList, Tab, TabUnderline } from "@/components/Tabs"
import {
  sectorIcons,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/Icon"
import Action from "./Action"

function PillarsSelect({ sectors, currentSector, setCurrentSector }) {
  const { colors } = useTheme()
  const currentSectorData = sectors.find((s) => s.key === currentSector)
  const sectorColor =
    colors[currentSectorData.title.toLowerCase()] || colors.gray

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
      <Box flex={1} overflow="hidden" py={4}>
        <AnimatePresence mode="popLayout" initial={false}>
          {currentSectorData && (
            <motion.div
              key={currentSectorData.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, bounce: 0, type: "spring" }}
            >
              <Stack spacing={1} alignItems="center">
                <Text
                  textAlign="left"
                  fontSize="xl"
                  lineHeight="short"
                  fontWeight={600}
                  style={{ color: sectorColor[900] }}
                >
                  <Text
                    as="span"
                    color="gray.500"
                    fontWeight="inherit"
                    fontSize="inherit"
                    lineHeight="inherit"
                  >{`Pillar ${currentSectorData.key}:`}</Text>
                  <br />
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

export default function ActionsByPillar({
  selectedPillar,
  sectors,
  pillars,
  recommendations,
  onChange,
}) {
  const { colors } = useTheme()

  const [currentPillar, setCurrentPillar] = useState(selectedPillar || 1)

  const recommendationsByColumn = useMemo(() => {
    const actions = Object.entries(
      _groupBy(
        recommendations.filter((d) => d.pillar === currentPillar),
        (o) => parseInt(o.gridColumn.split("/")[0]) - 1
      )
    ).map(([key, recommendations]) => ({
      key,
      recommendations: _sortBy(recommendations, (o) => -o.sectorIds.length),
    }))
    return actions
  }, [currentPillar])

  useEffect(() => {
    if (onChange)
      onChange({
        view: 0,
        currentPillar,
        actions: recommendationsByColumn.flatMap((d) => d.recommendations),
      })
  }, [currentPillar, JSON.stringify(recommendationsByColumn)])

  return (
    <Stack spacing={6}>
      <PillarsSelect
        sectors={pillars}
        currentSector={currentPillar}
        setCurrentSector={setCurrentPillar}
      />

      {!selectedPillar && (
        <Tabs
          index={currentPillar - 1}
          onChange={(id) => setCurrentPillar(parseInt(id + 1))}
          w="100%"
          display={["none", null, null, null, "flex"]}
        >
          <TabList
            display="grid"
            border="none"
            alignItems="flex-start"
            gridTemplateColumns="repeat(4, 1fr)"
            gridGap={2}
            w="100%"
          >
            {pillars.map((pillar, i) => {
              return (
                <Tab
                  key={pillar.key}
                  textAlign="left"
                  pl={0}
                  pr={6}
                  py={10}
                  mb={0}
                  h="100%"
                  fontSize="xl"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  spacing={0}
                  borderBottom="none"
                  position="relative"
                  _active={{}}
                  sx={{
                    "p:first-of-type": { color: "gray.500" },
                    color: "gray.400",
                  }}
                  _selected={{ color: "black", borderColor: "black" }}
                  _before={{
                    content: "''",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    h: "0.0625rem",
                    bg: "gray.200",
                  }}
                  _focusVisible={{
                    outline: "0.125rem solid",
                    outlineColor: "black",
                    outlineOffset: "0.125rem",
                  }}
                >
                  <Text
                    fontSize="xl"
                    lineHeight="shorter"
                    fontWeight={600}
                  >{`Pillar ${pillar.key}`}</Text>
                  <Text fontSize="xl" fontWeight={600} lineHeight="shorter">
                    {pillar.title}
                  </Text>
                  {currentPillar === pillar.key ? (
                    <TabUnderline layoutId="pillar-tabs" />
                  ) : null}
                </Tab>
              )
            })}
          </TabList>
        </Tabs>
      )}

      <Box
        overflowX="scroll"
        scrollSnapType="x mandatory"
        w={["100vw", null, null, null, "100%"]}
        ml={["-1.25rem", null, "-3.25rem", null, 0]}
        px={["1.25rem", null, "3.25rem", null, 0]}
      >
        <SimpleGrid
          columns={5}
          spacing={2}
          autoRows="auto"
          gridAutoFlow="dense"
          w={[
            "calc(250% + 0.5rem)",
            null,
            null,
            "calc(166.666% + 0.5rem)",
            "100%",
          ]}
        >
          {sectors.map((sector) => {
            const colorName = sector.title.toLowerCase().trim()
            const color = colors[colorName] || colors.gray
            const SectorIcon =
              sectorIcons[sector.title.trim().split(" ").join("") + "Icon"] ||
              null
            return (
              <Stack
                key={sector.key}
                spacing={3}
                alignItems="center"
                borderBottom="0.25rem solid currentcolor"
                borderBottomColor={color[400]}
                color={color[900]}
                py={5}
                scrollSnapAlign="start"
                scrollMargin={["1.25rem", null, "3.25rem", null, 0]}
              >
                <Center
                  w={20}
                  h={20}
                  borderRadius="full"
                  bg={color[400]}
                  color="white"
                >
                  {SectorIcon && <SectorIcon size="2.5rem" strokeWidth={1.5} />}
                </Center>
                <Text fontWeight={600} fontSize="lg" lineHeight="shorter">
                  {sector.title}
                </Text>
              </Stack>
            )
          })}

          {recommendationsByColumn.map((col) => {
            return col.recommendations.map((d, i) => {
              const isMultiColumn = d.sectors.length > 1
              const sector = d.sectors[0]
              const color = isMultiColumn
                ? colors.gray
                : colors[`${sector.title.toLowerCase()}`] || colors.gray
              return (
                <Box
                  key={d.id}
                  as={motion.div}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, bounce: 0, delay: i * 0.1 },
                  }}
                  gridColumn={d.gridColumn}
                  sx={{ ">div": { height: "100%" } }}
                >
                  <Action
                    color={color}
                    name={d.name}
                    slug={d.slug}
                    stakeholders={d.stakeholders}
                  />
                </Box>
              )
            })
          })}
        </SimpleGrid>
      </Box>
    </Stack>
  )
}

import { useState, useEffect } from "react"
import { Text, HStack, Stack, Flex, Box } from "@chakra-ui/react"
import _groupBy from "lodash/groupBy"
import { AnimatePresence, motion } from "framer-motion"

import fetchDataset from "@/utils/api/client/fetchDataset"
import ViewSwitch from "./ViewSwitch"
import parseRecommendations from "./parseActions"
import ActionsByPillar from "./ActionsByPillar"
import ActionsBySector from "./ActionsBySector"
import { useSummaryStore, Summary } from "./Summary"

export default function CombinedDiagram({
  selectedView,
  selectedPillar,
  selectedSector,
  ...props
}) {
  const views = ["Pillar", "Sector"]
  const [currentView, setCurrentView] = useState(selectedView || 0)

  const [sectors, setSectors] = useState([])
  const [pillars, setPillars] = useState([])
  const [recommendations, setRecommendations] = useState([])

  const setCurrentSummary = useSummaryStore((state) => state.setCurrentSummary)

  const [
    recommendationsBySectorAndPillar,
    setRecommendationsBySectorAndPillar,
  ] = useState([])

  useEffect(() => {
    if (typeof window === "undefined") return
    Promise.all([
      fetchDataset("/data/sectors/all.txt", "json"),
      fetchDataset("/data/pillars/all.txt", "json"),
      fetchDataset("/data/actions/all.txt", "json"),
      // fetch("/data/sectors/all.json").then((res) => res.json()),
      // fetch("/data/pillars/all.json").then((res) => res.json()),
      // fetch("/data/actions/all.json").then((res) => res.json()),
    ]).then(([allSectors, allPillars, allActions]) => {
      setSectors(allSectors)
      setPillars(allPillars)

      const recommendations = parseRecommendations(allActions)
      setRecommendations(recommendations)

      const recommendationsBySector = recommendations.reduce((acc, cur) => {
        cur.sectorIds.forEach((d) => {
          if (!acc[d]) acc[d] = [cur]
          else acc[d].push(cur)
        })
        return acc
      }, {})

      const recommendationsBySectorAndPillar = Object.entries(
        recommendationsBySector
      ).map(([key, data]) => {
        const relevantSector =
          allSectors.find((s) => s.key === parseInt(key)) || {}
        const groupedByPillar = Object.entries(
          _groupBy(data, (o) => o.pillar)
        ).map(([pillarKey, items]) => {
          const relevantPillar =
            allPillars.find((s) => s.key === parseInt(pillarKey)) || {}
          return { ...relevantPillar, recommendations: items }
        })
        return { ...relevantSector, pillars: groupedByPillar }
      })

      // console.group("Diagram")
      // console.log(allSectors)
      // console.log(allPillars)
      // console.log(allActions)
      // console.log(recommendations)
      // console.log(recommendationsBySector)
      // console.log(recommendationsBySectorAndPillar)
      // console.groupEnd()

      setRecommendationsBySectorAndPillar(recommendationsBySectorAndPillar)
    })
  }, [])

  const handleChange = (d) => {
    setCurrentSummary(d, sectors, pillars)
  }

  return (
    <Stack spacing={8} pt={12} {...props}>
      {selectedView !== 0 && selectedView !== 1 && (
        <Flex
          gap={6}
          flexDirection={["column-reverse", null, null, "row"]}
          alignItems={["flex-start", null, null, "center"]}
          justifyContent="flex-end"
          minH={16}
        >
          {/* <Summary currentView={currentView} /> */}
          <HStack
            spacing={4}
            flex="none"
            alignSelf={["stretch", null, null, "center"]}
          >
            <Text
              fontSize="xl"
              lineHeight="shorter"
              fontWeight={600}
              color="gray.500"
              flex="none"
              display={["none", null, null, "block"]}
            >
              {"Group by"}
            </Text>
            <ViewSwitch
              options={views}
              value={currentView}
              onChange={(id) => setCurrentView(id)}
            />
          </HStack>
        </Flex>
      )}

      <Box minH="100vh" position="relative">
        <AnimatePresence mode="wait">
          {currentView === 0 ? (
            <motion.div
              key="by-pillar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, bounce: 0, type: "spring" }}
            >
              {recommendations.length && (
                <ActionsByPillar
                  selectedPillar={selectedPillar}
                  sectors={sectors}
                  pillars={pillars}
                  recommendations={recommendations}
                  onChange={handleChange}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="by-sector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, bounce: 0, type: "spring" }}
            >
              {recommendationsBySectorAndPillar.length && (
                <ActionsBySector
                  selectedSector={selectedSector}
                  sectors={sectors}
                  pillars={pillars}
                  recommendations={recommendationsBySectorAndPillar}
                  onChange={handleChange}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Stack>
  )
}

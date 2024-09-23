import { useState } from "react"
import { Box, HStack, Text, SimpleGrid, Button } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"

import {
  sectorIcons,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/Icon"
import {
  SectorCard,
  SectorCardGrid,
  SectorCardHeading,
  SectorCardIcon,
  SectorCardImage,
  SectorCardContent,
} from "@/components/SectorCard"

export default function SectorsCarousel({ sectors }) {
  const [currentSector, setCurrentSector] = useState(sectors[0])

  const src = currentSector.slug.split("/").slice(-1)[0] + ".jpg"
  const SectorIcon =
    sectorIcons[currentSector.title.split(" ").join("") + "Icon"]

  const handlePrev = () => {
    const prevSector = sectors.reduce((acc, cur, i) => {
      if (cur.slug === currentSector.slug)
        acc = sectors[i - 1] || sectors.slice(-1)[0]
      return acc
    }, {})
    setCurrentSector(prevSector)
  }

  const handleNext = () => {
    const nextSector = sectors.reduce((acc, cur, i) => {
      if (cur.slug === currentSector.slug) acc = sectors[i + 1] || sectors[0]
      return acc
    }, {})
    setCurrentSector(nextSector)
  }

  return (
    <Box position="relative">
      <SimpleGrid
        position="absolute"
        top={0}
        left={0}
        right={0}
        columns={8}
        gridGap={6}
        zIndex={99}
        pointerEvents="none"
      >
        <HStack
          gridColumn={["1 / -1", null, null, "1 / span 5"]}
          justifyContent={["flex-end", null, null, "flex-start"]}
          mt={[-6, null, null, 3]}
          pt="calc(100% / 3 * 2)"
          spacing={0}
        >
          <Button
            onClick={handlePrev}
            px={0}
            size="xl"
            variant="ghost"
            pointerEvents="all"
          >
            <ChevronLeftIcon size="3rem" strokeWidth={2.5} />
          </Button>
          <Button
            onClick={handleNext}
            px={0}
            size="xl"
            variant="ghost"
            pointerEvents="all"
          >
            <ChevronRightIcon size="3rem" strokeWidth={2.5} />
          </Button>
        </HStack>
      </SimpleGrid>
      <AnimatePresence mode="wait">
        {currentSector && (
          <motion.div
            key={currentSector.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, bounce: 0, type: "spring" }}
          >
            <SectorCard
              key={currentSector.key}
              variant="ltr"
              href={currentSector.slug}
            >
              <SectorCardImage src={src} />
              <SectorCardIcon>
                <SectorIcon
                  size={["2.5rem", null, null, "4rem"]}
                  color="gray.300"
                />
              </SectorCardIcon>
              <SectorCardGrid />
              <SectorCardContent>
                <SectorCardHeading as="h2" fontSize={["3xl", null, "5xl"]}>
                  {currentSector.title}
                </SectorCardHeading>
                <Text fontSize={["xl", null, "2xl"]} color="gray.500">
                  {currentSector.description}
                </Text>
                <HStack spacing={3} className="continue-reading">
                  <Text fontSize="2xl" lineHeight="short" fontWeight={600}>
                    {"Continue reading"}
                  </Text>
                  <ArrowRightIcon
                    size="2rem"
                    strokeWidth={2.5}
                    isAnimated="right"
                  />
                </HStack>
              </SectorCardContent>
            </SectorCard>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

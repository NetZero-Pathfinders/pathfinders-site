import { Text, SimpleGrid, HStack, Box } from "@chakra-ui/react"

import { pillarIcons, Pillar1Icon, ArrowRightIcon } from "@/components/Icon"
import { LinkBox, LinkOverlay } from "@/components/Link"

export default function PillarCard({ pillar }) {
  const { key, title } = pillar
  const PillarIcon = pillarIcons[`Pillar${pillar.key}Icon`] || Pillar1Icon

  return (
    <LinkBox
      _hover={{
        ".pillar-card-icn svg": { transform: "scale(1.1)" },
        ".arrow-icon": { transform: "translateX(25%)", opacity: 1 },
      }}
    >
      <SimpleGrid
        columns={4}
        spacing={6}
        bg="blue.500"
        color="white"
        h="100%"
        py={12}
      >
        <LinkOverlay
          fontSize="3xl"
          fontWeight={600}
          lineHeight="shorter"
          alignSelf="start"
          gridColumn="1 / -2"
          gridRow="1"
          ml={6}
          href={`/pillars/pillar-${key}`}
          _focusVisible={{
            outline: "0.125rem solid",
            outlineColor: "white",
            outlineOffset: "0.125rem",
            "& ~ .pillar-card-icn svg": { transform: "scale(1.1)" },
            "& ~ .read-more .arrow-icon": {
              transform: "translateX(25%)",
              opacity: 1,
            },
          }}
        >
          <Text
            as="span"
            fontWeight="inherit"
            color="blue.200"
          >{`Pillar ${key}: `}</Text>
          <br />
          {title}
        </LinkOverlay>

        <HStack
          gridColumn="1 / -2"
          gridRow="2"
          pl={6}
          alignSelf="end"
          spacing={2}
          h="2rem"
          className="read-more"
        >
          <Text as="span" fontSize="2xl" lineHeight="shorter" fontWeight={600}>
            {"Read more"}
          </Text>
          <Box
            className="arrow-icon"
            opacity={0}
            pointerEvents="none"
            transition="all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          >
            <ArrowRightIcon size="2rem" strokeWidth={2.5} />
          </Box>
        </HStack>

        <Box
          gridColumn="-2 / -1"
          gridRow="1 / span 2"
          alignSelf="end"
          className="pillar-card-icn"
          pointerEvents="none"
          overflow="hidden"
          mb={-12}
          sx={{
            svg: { transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" },
          }}
        >
          <Box w="calc(100% + 1.5rem)" pt={3} pl={3} mb={-6}>
            <PillarIcon size="100%" strokeWidth={4} color="blue.200" />
          </Box>
        </Box>
      </SimpleGrid>
    </LinkBox>
  )
}

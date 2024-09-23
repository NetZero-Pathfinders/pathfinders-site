import { SimpleGrid, Stack, Text } from "@chakra-ui/react"

import ArrowBox from "@/components/StakeholdersDiagram/ArrowBox"

export default function StakeholdersDiagramPillars({ pillars }) {
  return (
    <SimpleGrid columns={4} spacingX={2} spacingY={5} gridAutoRows="1fr">
      {pillars.map((pillar) => {
        return (
          <ArrowBox key={pillar.frontmatter.key}>
            <Stack spacing={0} px={5} py={5}>
              <Text
                color="blue.500"
                fontSize="lg"
                lineHeight="shorter"
                fontWeight={600}
              >{`Pillar ${pillar.frontmatter.key}`}</Text>
              <Text fontWeight={600} fontSize="lg" lineHeight="shorter">
                {pillar.frontmatter.title}
              </Text>
            </Stack>
          </ArrowBox>
        )
      })}
    </SimpleGrid>
  )
}

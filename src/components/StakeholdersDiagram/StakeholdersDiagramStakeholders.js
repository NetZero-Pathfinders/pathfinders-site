import { SimpleGrid, Box, Stack, Text, Divider, Center } from "@chakra-ui/react"

import { sectorIcons } from "@/components/Icon"
import ArrowBox from "@/components/StakeholdersDiagram/ArrowBox"
import GroupHeading from "@/components/StakeholdersDiagram/GroupHeading"

export default function StakeholdersDiagramStakeholders({ stakeholders }) {
  return (
    <SimpleGrid columns={3} spacingX={2} spacingY={5}>
      <Box gridColumn="1 / -1" textAlign="center">
        <GroupHeading>{"Stakeholders"}</GroupHeading>
      </Box>
      {stakeholders.map((stakeholder) => {
        const IconComponent =
          sectorIcons[stakeholder.title.split(" ").join("") + "Icon"]
        return (
          <ArrowBox key={stakeholder.key}>
            <Stack spacing={5} py={5}>
              <Stack spacing={0} alignItems="center" px={5}>
                <Center w={20} h={20} bg="gray.100" borderRadius="full">
                  {IconComponent && (
                    <IconComponent size="2.5rem" strokeWidth={1.5} />
                  )}
                </Center>
                <Text fontWeight={600} fontSize="lg">
                  {stakeholder.title}
                </Text>
              </Stack>
              <Divider borderBottomWidth="0.25rem" borderColor="black" />
              <Text px={5} lineHeight="short" fontSize="md" fontWeight={600}>
                {stakeholder.description}
              </Text>
            </Stack>
          </ArrowBox>
        )
      })}
    </SimpleGrid>
  )
}

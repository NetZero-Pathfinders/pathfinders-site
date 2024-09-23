import {
  SimpleGrid,
  Box,
  Stack,
  Text,
  Center,
  useTheme,
} from "@chakra-ui/react"

import { sectorIcons } from "@/components/Icon"
import { Link } from "@/components/Link"

import GroupHeading from "@/components/StakeholdersDiagram/GroupHeading"

export default function StakeholdersDiagramSectors({ sectors }) {
  const { colors } = useTheme()
  return (
    <SimpleGrid columns={sectors.length} spacingX={2} spacingY={5}>
      <Box gridColumn="1 / -1" textAlign="center">
        <GroupHeading>{"Emitting sectors"}</GroupHeading>
      </Box>
      {sectors.map((sector) => {
        const sectorColors = colors[sector.title.toLowerCase()] || {}
        const colorKey = sector.title.toLowerCase() || ""
        console.log(colorKey)
        const IconComponent =
          sector.Icon ||
          sectorIcons[sector.title.split(" ").join("") + "Icon"] ||
          null
        return (
          <Link
            key={sector.key}
            href={sector.slug}
            w="100%"
            display="block"
            py={5}
            px={4}
            color="inherit"
            fontWeight={600}
            lineHeight="shorter"
            bg="white"
            _hover={{ bg: sectorColors[50] }}
            _focusVisible={{
              bg: sectorColors[50],
              outline: "0.125rem solid #000",
              outlineOffset: "0.125rem",
            }}
            borderTop="0.25rem solid"
            borderTopColor={sectorColors[400]}
          >
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Center w={20} h={20} bg={`${colorKey}.400`} borderRadius="full">
                {IconComponent && (
                  <IconComponent
                    size="2.5rem"
                    strokeWidth={1.5}
                    color="white"
                  />
                )}
              </Center>
              <Text color={`${colorKey}.900`} fontWeight={600} fontSize="lg">
                {sector.title}
              </Text>
            </Stack>
          </Link>
        )
      })}
    </SimpleGrid>
  )
}

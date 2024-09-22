import { Box, HStack, Text } from "@chakra-ui/react"

import { Link } from "@/components/Link"

export default function Breadcrumbs({ items, color = "gray.500" }) {
  return (
    <HStack
      color={color}
      spacing={4}
      divider={
        <Box border="none" fontWeight={600}>
          {"/"}
        </Box>
      }
    >
      {items.map((item) => {
        return item.path ? (
          <Link
            key={item.label}
            href={item.path}
            variant="stealth"
            fontWeight={600}
          >
            {item.label}
          </Link>
        ) : (
          <Text key={item.label} as="span" fontWeight={600}>
            {item.label}
          </Text>
        )
      })}
    </HStack>
  )
}

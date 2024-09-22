import { Text } from "@chakra-ui/react"

export default function GroupHeading({ children }) {
  return (
    <Text
      fontSize="sm"
      lineHeight="shorter"
      letterSpacing="wide"
      textTransform="uppercase"
      fontWeight={600}
      color="gray.500"
    >
      {children}
    </Text>
  )
}

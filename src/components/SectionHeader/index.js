import { SimpleGrid, Stack, Heading, Text } from "@chakra-ui/react"

export function SectionHeader(props) {
  return <SimpleGrid position="relative" columns={8} spacing={6} {...props} />
}

export function SectionHeaderLinks(props) {
  return (
    <Stack
      gridColumn="-3/-1"
      spacing={0}
      display={["none", null, null, "flex"]}
      sx={{ "a:first-of-type": { color: "blue.500" } }}
      {...props}
    />
  )
}

export function SectionHeaderContent(props) {
  return (
    <Stack
      gridColumn={["1 / -1", null, null, "1 / -4"]}
      spacing={5}
      {...props}
    />
  )
}

export function SectionHeaderTitle(props) {
  return (
    <Heading
      fontSize={["3xl", null, "4xl", "5xl"]}
      maxW="40rem"
      {...props}
    />
  )
}

export function SectionHeaderSubtitle(props) {
  return (
    <Text
      fontSize="2xl"
      color="gray.500"
      {...props}
    />
  )
}

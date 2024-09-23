import { Heading, Text, Stack, Box } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import { LinkBox, LinkOverlay } from "@/components/Link"
// import day from "dayjs"

export default function BestPracticePreview({
  title = "Title",
  author = [],
  date = "",
  href = "/",
}) {
  return (
    <LinkBox>
      <Stack
        spacing={4}
        pb={6}
        px={5}
        pt={5}
        bg="white"
        borderBottom="0.25rem solid black"
        position="relative"
        h="100%"
        _after={{
          content: "''",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          h: "0.25rem",
          bg: "blue.500",
          transform: "scale(0, 1)",
          transition: "transform 0.3s",
          transformOrigin: "left",
        }}
        _hover={{
          _after: { transform: "scale(1, 1)" },
          color: "blue.500",
          cursor: "pointer",
        }}
        _focusVisible={{
          outline: "0.125rem solid black",
          outlineOffset: "0.125rem",
        }}
      >
        <Text
          fontSize="lg"
          lineHeight="shorter"
          fontWeight={600}
          color="gray.500"
        >
          {date}
        </Text>
        {/* <Divider /> */}
        <Box flex={1}>
          <Heading fontSize="2xl">
            <LinkOverlay
              href={href}
              _focusVisible={{
                outline: "0.125rem solid black",
                outlineOffset: "0.125rem",
                color: "blue.500",
              }}
            >
              {title}
            </LinkOverlay>
          </Heading>
        </Box>
        {/* <Text fontSize="lg" lineHeight="shorter" fontWeight={600} color="black">
          {author.join(", ")}
        </Text> */}
      </Stack>
    </LinkBox>
  )
}

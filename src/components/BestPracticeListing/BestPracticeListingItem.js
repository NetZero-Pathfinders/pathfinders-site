import { Stack, Heading, Text, Center } from "@chakra-ui/react"

import { LinkBox, LinkOverlay } from "@/components/Link"
import { ArrowRightIcon } from "@/components/Icon"
import day from "dayjs"

export default function BestPracticeListingItem({
  slug,
  title,
  description,
  date,
}) {
  return (
    <LinkBox as="article">
      <Stack
        position="relative"
        py={[4, null, 6]}
        borderBottom="0.0625rem solid"
        borderColor="gray.200"
        h="100%"
      >
        <Stack py={2} flex={1}>
          <Heading as="h3" fontSize={["xl", null, "2xl", "3xl"]} display="flex">
            <LinkOverlay
              href={slug}
              flex={1}
              pr={6}
              _hover={{
                outline: "none",
                color: "blue.500",
                "+ *": {
                  color: "blue.500",
                  opacity: 1,
                  svg: { transform: "translateX(25%)" },
                },
              }}
              _focusVisible={{
                outline: "none",
                color: "blue.500",
                "+ *": {
                  color: "blue.500",
                  opacity: 1,
                  svg: { transform: "translateX(25%)" },
                },
              }}
            >
              {title}
            </LinkOverlay>
            <Center
              opacity={0}
              h={8}
              display={["none", null, "block"]}
              mt={1}
              pr={5}
              transition="opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              sx={{
                "svg": {
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                },
              }}
            >
              <ArrowRightIcon
                size="2rem"
                strokeWidth={2.5}
                isAnimated="right"
              />
            </Center>
          </Heading>
          <Text
            fontSize="xl"
            color="gray.500"
            fontWeight={600}
            pr={[0, null, 16]}
            display={["none", null, "block"]}
          >
            {description}
          </Text>
        </Stack>
        {date && (
          <Text
            fontSize="lg"
            color="gray.500"
            fontWeight={600}
            pr={[0, null, 16]}
            display={["none", null, "block"]}
          >
            {day(date).format("MMMM DD, YYYY")}
          </Text>
        )}
      </Stack>
    </LinkBox>
  )
}

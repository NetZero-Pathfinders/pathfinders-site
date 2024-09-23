import {
  Stack,
  HStack,
  Heading,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import { ArrowRightIcon } from "@/components/Icon"
import { LinkBox, LinkOverlay } from "@/components/Link"

export default function ActionsListing({ actions, ...restProps }) {
  return (
    <Stack spacing={3} fontSize="2xl" {...restProps}>
      {actions.map((action) => {
        const actionSectors = action.sectors
        const actionStakeholders = action.stakeholders
        return (
          <LinkBox as="article" key={action.id}>
            <Stack
              position="relative"
              py={[4, null, 6]}
              borderBottom="0.0625rem solid"
              borderColor="gray.200"
              spacing={2}
            >
              <Heading
                as="h3"
                fontSize={["xl", null, "2xl", "2xl"]}
                display="flex"
              >
                <LinkOverlay
                  href={action.slug}
                  flex={1}
                  pr={["0", null, "3rem", null, "15rem"]}
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
                  {action.title}
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
                      transition:
                        "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
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
              <HStack spacing={1}>
                {actionSectors.map((actionSector) => {
                  return (
                    <Wrap spacing={1} key={actionSector}>
                      <WrapItem
                        py={0.5}
                        px={2}
                        bg="gray.100"
                        lineHeight="shorter"
                        fontWeight={600}
                        fontSize="md"
                      >
                        {actionSector}
                      </WrapItem>
                    </Wrap>
                  )
                })}
                {actionStakeholders?.map((actionStakeholder) => {
                  return (
                    <Wrap spacing={1} key={actionStakeholder}>
                      <WrapItem
                        py={0.5}
                        px={2}
                        bg="gray.100"
                        lineHeight="shorter"
                        fontWeight={600}
                        fontSize="md"
                      >
                        {actionStakeholder}
                      </WrapItem>
                    </Wrap>
                  )
                })}
              </HStack>
            </Stack>
          </LinkBox>
        )
      })}
    </Stack>
  )
}

import { HStack, Stack, Wrap, WrapItem, Box } from "@chakra-ui/layout"
import _groupBy from "lodash/groupBy"
import { motion } from "framer-motion"

import { ArrowRightIcon } from "@/components/Icon"
import { LinkBox, LinkOverlay } from "@/components/Link"

const MotionBox = motion(Box)

export default function Action({
  gridColumn,
  gridRow,
  color,
  name,
  slug,
  stakeholders,
  ...props
}) {
  return (
    <MotionBox gridColumn={gridColumn} gridRow={gridRow} {...props}>
      <LinkBox
        as={Stack}
        p={4}
        bg={color[50]}
        color={color[900]}
        spacing={5}
        position="relative"
        justifyContent="space-between"
        cursor="pointer"
        h="100%"
        _hover={{
          bg: color[100],
          "div svg": { transform: "translateX(25%)", opacity: 1 },
        }}
      >
        <LinkOverlay
          fontSize="lg"
          fontWeight={500}
          letterSpacing="-0.01em"
          lineHeight="shorter"
          flex={1}
          href={slug || "/actions"}
          _focusVisible={{
            textDecoration: "underline",
            outline: "none",
            "~ div svg": { transform: "translateX(25%)", opacity: 1 },
          }}
        >
          {name}
        </LinkOverlay>
        <HStack spacing={3} alignItems="flex-end">
          <Wrap spacing={1} flex={1}>
            {stakeholders.length
              ? stakeholders.map(({ key, title }) => {
                  return (
                    <WrapItem
                      key={key}
                      py={0.5}
                      px={2}
                      bg={color[200]}
                      fontSize="sm"
                      lineHeight="shorter"
                      fontWeight={600}
                    >
                      {title}
                    </WrapItem>
                  )
                })
              : null}
          </Wrap>
          <Box
            flex="none"
            sx={{
              svg: {
                opacity: 0,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              },
            }}
          >
            <ArrowRightIcon size="1.5rem" />
          </Box>
        </HStack>
      </LinkBox>
    </MotionBox>
  )
}

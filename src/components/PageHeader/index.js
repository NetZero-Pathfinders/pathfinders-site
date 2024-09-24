import {
  Container,
  SimpleGrid,
  HStack,
  Heading,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react"

import { ArrowLeftIcon, ArrowRightIcon, ShareIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"

export function PageHeader({
  children,
  backgroundOverlay = false,
  ...restProps
}) {
  return (
    <Box py={24} {...restProps}>
      {backgroundOverlay && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4)), radial-gradient(rgba(0,0,0,0.4) 50%, rgba(0,0,0,0))"
        />
      )}
      <Container>
        <SimpleGrid px={5} columns={8} spacingX={6} spacingY={16}>
          {children}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export function PageHeaderSubnavigation({
  borderTopColor = "transparent",
  borderBottomColor = "gray.200",
  bg,
  ...restProps
}) {
  return (
    <HStack
      gridColumn="1 / -1"
      justifyContent="space-between"
      borderY="0.0625rem solid"
      borderTopColor={borderTopColor}
      borderBottomColor={borderBottomColor}
      py={2}
      spacing={6}
      mx={[-5, null, 0]}
      px={[5, null, 0]}
      bg={bg}
      {...restProps}
    />
  )
}

export function PageHeaderBackLink(props) {
  return (
    <ButtonLink
      leftIcon={<ArrowLeftIcon isAnimated="left" />}
      variant="ghost"
      {...props}
    />
  )
}

export { default as PageHeaderShareButton } from "./PageHeaderShareButton"

export function PageHeaderContent({ children }) {
  return (
    <Stack spacing={6} gridColumn={["1 / -1", null, "1 / span 5"]}>
      {children}
    </Stack>
  )
}

export function PageHeaderTitle({ children }) {
  return (
    <Heading
      as="h1"
      fontSize={["3xl", "4xl", "5xl", "6xl"]}
      lineHeight="shorter"
      fontWeight={700}
    >
      {children || "Key pillars of NetZero strategies"}
    </Heading>
  )
}

export function PageHeaderSubtitle({ color = "gray.900", ...restProps }) {
  return <Text fontSize="2xl" fontWeight={600} color={color} {...restProps} />
}

export function PageHeaderLinks({ children }) {
  return (
    <Stack
      gridColumn={["1 / -1", null, "-4 / -1", "-3 / -1"]}
      spacing={0}
      sx={{
        "> a:first-of-type": { color: "blue.500" },
      }}
    >
      {children || (
        <ButtonLink
          href="/pillars"
          justifyContent="space-between"
          size="2xl"
          variant="ghost"
          color="blue.500"
          rightIcon={
            <ArrowRightIcon size="2rem" strokeWidth={2.5} isAnimated="right" />
          }
        >
          {"NetZero pillars"}
        </ButtonLink>
      )}
    </Stack>
  )
}

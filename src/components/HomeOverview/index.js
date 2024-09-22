import { Container, SimpleGrid, Text, Box } from "@chakra-ui/react"

import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"

export function HomeOverview(props) {
  return (
    <Container>
      <SimpleGrid
        as="ul"
        columns={[1, null, 2, 2, 4]}
        spacing={6}
        px={5}
        alignItems="stretch"
        {...props}
      />
    </Container>
  )
}

export const HomeOverviewItem = ({ href, colorScheme, ...restProps }) => {
  return (
    <Box as="li" display="block" sx={{ "a": { minW: "100%", minH: "100%" } }}>
      <ButtonLink
        href={href}
        size="none"
        variant="linkCard"
        colorScheme={colorScheme}
        rightIcon={
          <ArrowRightIcon size="3rem" strokeWidth={3} isAnimated="right" />
        }
      >
        <Text as="span" lineHeight="short" fontWeight={600} {...restProps} />
      </ButtonLink>
    </Box>
  )
}

export const HomeOverviewItemAccent = (props) => {
  return (
    <Text
      as="span"
      display="block"
      color={props.color}
      fontWeight="inherit"
      lineHeight="inherit"
      {...props}
    />
  )
}

export const HomeOverviewItemTitle = (props) => {
  return (
    <Text
      as="span"
      display="block"
      fontWeight="inherit"
      lineHeight="inherit"
      {...props}
    />
  )
}

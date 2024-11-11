import { Box, Center, Container, Stack, Heading, Text } from "@chakra-ui/react"

import IndexCover from "@/components/IndexCover"
import {
  QuickSearch,
  QuickSearchInput,
  QuickSearchResults,
} from "@/components/QuickSearch"

export const HomeBanner = ({ children, spacing = 6, ...restProps }) => {
  return (
    <Box position="relative">
      <IndexCover />
      <Center
        position="relative"
        mt={24}
        pt={32}
        pb={36}
        bgGradient="radial(rgba(0,0,0,0.5), rgba(0,0,0,0))"
        color="white"
        {...restProps}
      >
        <Container>
          <Stack
            alignItems="center"
            textAlign="center"
            spacing={spacing}
            px={5}
          >
            {children}
            <QuickSearch color="black" searchIndex="lite">
              <QuickSearchInput />
              <QuickSearchResults
                boxShadow="xl"
                maxH="33vh"
                overflowY="scroll"
              />
            </QuickSearch>
          </Stack>
        </Container>
      </Center>
    </Box>
  )
}

export const HomeBannerTitle = (props) => {
  return (
    <Heading
      as="h1"
      fontSize={["4xl", null, "6xl"]}
      maxW="45rem"
      {...props}
    />
  )
}

export const HomeBannerSubtitle = (props) => {
  return (
    <Text
      fontSize="2xl"
      maxW="40rem"
      {...props}
    />
  )
}

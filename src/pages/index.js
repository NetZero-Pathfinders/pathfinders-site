import { SimpleGrid, Center, Stack, Heading, Text, Box } from "@chakra-ui/react"

import SEO from "@/components/SEO"
import Logo from "@/components/Logo"
import DotGrid from "@/components/DotGrid"
import { ButtonLink } from "@/components/Link"
import { DownloadIcon } from "@/components/Icon"

export default function IndexPage() {
  return (
    <>
      <SEO />
      <SimpleGrid
        w="100vw"
        columns={1}
        gridGap={0}
        alignItems="center"
        bg="#111111"
        bgImage="/images/cover.jpg"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="relative"
      >
        <Center
          bgGradient="radial(rgba(0,0,0,0.75) 33%, rgba(0,0,0,0.6) 66%, rgba(0,0,0,0))"
          gridColumn="1 / -1"
          gridRow="1 / span 1"
          h="100vh"
          color="white"
        >
          <Stack spacing={10} alignItems="center" px={[5, null, null, 10]}>
            <Box w="10rem" h="auto">
              <Logo />
            </Box>
            <Heading
              fontSize="5xl"
              lineHeight="calc(1em + 0.5rem)"
              textAlign="center"
            >
              <Text as="span" fontWeight={700} lineHeight="inherit">
                {"Delivering Net Zero"}
              </Text>
              <br />
              <Text as="span" fontWeight={400} lineHeight="inherit">
                {"A Framework for Policymakers"}
              </Text>
            </Heading>
            <ButtonLink
              href="/downloads/Netzero Pathfinders Delivering Net Zero - A Framework for Policymakers.pdf"
              variant="outline"
              colorScheme="whiteAlpha"
              color="white"
              size="2xl"
              gap={4}
              rightIcon={<DownloadIcon size="2rem" />}
              onClick={() => {
                if (!window.sa_event || !window.sa_loaded) return
                window.sa_event("Download Report")
              }}
            >
              {"Download report"}
            </ButtonLink>
          </Stack>
        </Center>

        <Box
          position="absolute"
          top={[1.5, null, null, 0]}
          right={0}
          transform={["translateY(-50%)", null, null, "none"]}
        >
          <DotGrid color="rgba(255,255,255,0.5)" xTiles={2} yTiles={2} />
        </Box>
        <Box
          position="absolute"
          bottom={[1.5, null, null, 0]}
          left={0}
          transform={["translateY(50%)", null, null, "none"]}
        >
          <DotGrid color="rgba(255,255,255,0.5)" xTiles={2} yTiles={2} />
        </Box>
      </SimpleGrid>
    </>
  )
}

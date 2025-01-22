import { Box, HStack, Container } from "@chakra-ui/react"

import Logo from "@/components/Logo"
import { Link, ButtonLink } from "@/components/Link"
import SearchOverlay from "@/components/SearchOverlay"
import NavigationOverlay from "@/components/NavigationOverlay"

export default function SiteHeader({ navigation = {} }) {
  return (
    <Box position="absolute" top={0} left={0} right={0} zIndex={1}>
      <Container>
        <HStack
          bg="white"
          spacing={0}
          h={24}
          px={5}
          justifyContent="space-between"
        >
          <Link
            variant="logo"
            href="/"
            flex="none"
            w={{ base: "11rem", sm: "14rem" }}
            p={1}
          >
            <Logo color="black" />
          </Link>
          <HStack spacing={2}>
            <HStack spacing={2} display={["none", null, null, null, "flex"]}>
              <ButtonLink
                href="/paths-to-netzero"
                variant="ghost"
                color="blue.500"
              >
                {"Paths to NetZero"}
              </ButtonLink>
              <ButtonLink href="/pillars" variant="ghost">
                {"Pillars"}
              </ButtonLink>
              <ButtonLink href="/sectors" variant="ghost">
                {"Emitting sectors"}
              </ButtonLink>
              <ButtonLink href="/best-practices" variant="ghost">
                {"Best practices"}
              </ButtonLink>
            </HStack>
            <HStack spacing={2}>
              <SearchOverlay />
              <NavigationOverlay navigation={navigation} />
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

import {
  Box,
  SimpleGrid,
  Stack,
  // Heading,
  Text,
  Divider,
  HStack,
  Container,
} from "@chakra-ui/react"

import Logo from "@/components/Logo"
import {
  ArrowRightIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/Icon"
import { Link, ButtonLink } from "@/components/Link"
// import NewsletterForm from "@/components/NewsletterForm"

export default function SiteFooter() {
  return (
    <Box bg="black" color="white" pb={12}>
      {/* <Container>
        <SimpleGrid py={24} px={5} columns={8} gridGap={6}>
          <Stack spacing={6} gridColumn={["1 / -1", null, null, "1 / span 6"]}>
            <Heading fontSize="3xl">{"Subscribe to our newsletter"}</Heading>
            <Text color="gray.500" fontSize="2xl">
              {
                "Subscribe to our quarterly publications, presenting best practices to decarbonize the major emitting sectors of the global economy."
              }
            </Text>
          </Stack>
          <Box gridColumn={["1 / -1", null, null, "1 / span 5"]}>
            <NewsletterForm inverted />
          </Box>
        </SimpleGrid>
        <Divider borderBottomColor="gray.600" mx={5} />
      </Container> */}

      <Container>
        <SimpleGrid
          columns={[1, null, null, 2]}
          spacing={[6, null, null, 20]}
          px={5}
        >
          <Stack py={12}>
            <ButtonLink
              href="/pillars"
              size="2xl"
              variant="defaultLink"
              colorScheme="blue"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"NetZero Pillars"}
            </ButtonLink>
            <ButtonLink
              href="/sectors"
              size="2xl"
              variant="defaultLink"
              colorScheme="blue"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"Emitting sectors"}
            </ButtonLink>
            <ButtonLink
              href="/sectors"
              size="2xl"
              variant="defaultLink"
              colorScheme="blue"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"Key stakeholders"}
            </ButtonLink>
            <ButtonLink
              href="/best-practices"
              size="2xl"
              variant="defaultLink"
              colorScheme="blue"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"Best practices"}
            </ButtonLink>
            <ButtonLink
              href="/actions"
              size="2xl"
              variant="defaultLink"
              colorScheme="blue"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"NetZero Actions"}
            </ButtonLink>
          </Stack>
          <Stack py={12} justifyContent="space-between">
            <Stack>
              <ButtonLink
                href="/paths-to-climate-strategy"
                size="2xl"
                variant="defaultLink"
                colorScheme="blue"
                rightIcon={
                  <ArrowRightIcon
                    size="2rem"
                    strokeWidth={2.5}
                    isAnimated="right"
                  />
                }
              >
                {"Paths to climate strategy"}
              </ButtonLink>
              <ButtonLink
                href="/about"
                size="2xl"
                variant="defaultLink"
                colorScheme="blue"
                rightIcon={
                  <ArrowRightIcon
                    size="2rem"
                    strokeWidth={2.5}
                    isAnimated="right"
                  />
                }
              >
                {"About Pathfinders"}
              </ButtonLink>
              <ButtonLink
                href="/reports"
                size="2xl"
                variant="defaultLink"
                colorScheme="blue"
                rightIcon={
                  <ArrowRightIcon
                    size="2rem"
                    strokeWidth={2.5}
                    isAnimated="right"
                  />
                }
              >
                {"Reports"}
              </ButtonLink>
              <ButtonLink
                href="/newsletter"
                size="2xl"
                variant="defaultLink"
                colorScheme="blue"
                rightIcon={
                  <ArrowRightIcon
                    size="2rem"
                    strokeWidth={2.5}
                    isAnimated="right"
                  />
                }
              >
                {"Newsletter"}
              </ButtonLink>
            </Stack>
            <HStack spacing={3} h={12}>
              <Text flex={1} fontSize="2xl" fontWeight="600">
                {"Follow BNEF"}
              </Text>
              <HStack spacing={0}>
                <ButtonLink
                  href="https://x.com/BloombergNEF"
                  variant="defaultLink"
                  colorScheme="blue"
                  size="lg"
                  px={0}
                  justifyContent="center"
                >
                  <TwitterIcon size="1.5rem" strokeWidth={2} />
                </ButtonLink>
                <ButtonLink
                  href="https://www.linkedin.com/showcase/bloombergnef/"
                  variant="defaultLink"
                  colorScheme="blue"
                  size="lg"
                  px={0}
                  justifyContent="center"
                >
                  <LinkedinIcon size="1.5rem" strokeWidth={2} />
                </ButtonLink>
                <ButtonLink
                  href="https://www.instagram.com/bloombergnef/?hl=en"
                  variant="defaultLink"
                  colorScheme="blue"
                  size="lg"
                  px={0}
                  justifyContent="center"
                >
                  <InstagramIcon size="1.5rem" strokeWidth={2} />
                </ButtonLink>
              </HStack>
            </HStack>
          </Stack>
        </SimpleGrid>
        <Divider borderBottomColor="gray.600" mx={5} />
      </Container>

      <Container>
        <Stack py={6} spacing={6} display={["flex", null, "none"]}>
          <HStack px={5} spacing={6} fontSize="sm">
            <Link
              href="https://about.bnef.com/bnef-privacy-policy/"
              fontWeight={600}
            >
              {"Privacy Policy"}
            </Link>
            <Link href="https://about.bnef.com/terms-service/" fontWeight={600}>
              {"Terms"}
            </Link>
          </HStack>
          <HStack px={5} spacing={6}>
            <Text fontSize="sm" lineHeight="short">
              {"© 2024 Bloomberg L.P. All Rights Reserved."}
            </Text>
            <Link variant="logo" href="/" flex="none" w="9.375rem" p={1}>
              <Logo inverted />
            </Link>
          </HStack>
        </Stack>
        <HStack
          py={6}
          px={5}
          justifyContent="space-between"
          display={["none", null, "flex"]}
        >
          <HStack spacing={6} fontSize="sm" lineHeight="short">
            <Link
              href="https://about.bnef.com/bnef-privacy-policy/"
              fontWeight={600}
            >
              {"Privacy Policy"}
            </Link>
            <Link href="https://about.bnef.com/terms-service/" fontWeight={600}>
              {"Terms"}
            </Link>
          </HStack>
          <HStack>
            <Text fontSize="sm" lineHeight="short">
              {"© 2024 Bloomberg L.P. All Rights Reserved."}
            </Text>
            <Link variant="logo" href="/" flex="none" w="9.375rem" p={1}>
              <Logo inverted />
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

import { useRef, useEffect } from "react"
import {
  Box,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Divider,
  Container,
  Button,
  useTheme,
  Drawer,
  DrawerBody,
  DrawerContent,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { create } from "zustand"
import _sortBy from "lodash/sortBy"
import { useRouter } from "next/router"

import Logo from "@/components/Logo"
import { Link, LinkBox, LinkOverlay, ButtonLink } from "@/components/Link"
import {
  MenuIcon,
  CloseIcon,
  ArrowRightIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/Icon"

export const useNavigationOverlay = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default function NavigationOverlay({ navigation }) {
  const isOpen = useNavigationOverlay((state) => state.isOpen)
  const onOpen = useNavigationOverlay((state) => state.onOpen)
  const onClose = useNavigationOverlay((state) => state.onClose)

  const btnRef = useRef()
  const closeRef = useRef()

  const { colors } = useTheme()

  const handleToggle = (e) => {
    if (isOpen) onClose(e)
    else onOpen(e)
  }

  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const handleRouteChangeComplete = () => {
      onClose()
    }
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router, onClose])

  return (
    <Box>
      <Button
        ref={btnRef}
        onClick={handleToggle}
        variant="ghost"
        leftIcon={<MenuIcon color="blue.500" />}
      >
        {isOpen ? "Close" : "Menu"}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        initialFocusRef={closeRef}
        finalFocusRef={btnRef}
        size="full"
        trapFocus
      >
        <DrawerContent
          p={0}
          motionProps={{
            initial: {
              opacity: 0,
              transition: { duration: 0.25, type: "spring", bounce: 0 },
            },
            animate: {
              opacity: 1,
              transition: { duration: 0.25, type: "spring", bounce: 0 },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.25, type: "spring", bounce: 0 },
            },
          }}
        >
          <DrawerBody p={0} h="100vh" overflowY="scroll">
            <Container>
              <Box px={5}>
                <HStack
                  h={24}
                  position="sticky"
                  top={0}
                  bg="white"
                  spacing={0}
                  justifyContent="space-between"
                  zIndex={1}
                  boxShadow={`0 0.0625rem 0 ${colors.gray[200]}`}
                >
                  <Link variant="logo" href="/" flex="none" w="9.375rem" p={1}>
                    <Logo />
                  </Link>
                  <Button
                    ref={closeRef}
                    variant="ghost"
                    onClick={handleToggle}
                    leftIcon={<CloseIcon />}
                  >
                    {isOpen ? "Close" : "Menu"}
                  </Button>
                </HStack>

                <motion.div
                  initial={{ y: 16, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.125,
                      duration: 0.75,
                      bounce: 0,
                      type: "spring",
                    },
                  }}
                  exit={{ opacity: 0 }}
                >
                  <SimpleGrid
                    columns={[1, null, 2, null, 4]}
                    gridColumnGap={6}
                    gridRowGap={12}
                    py={12}
                  >
                    <LinkBox
                      as={Stack}
                      gridColumn={["1 / -1", null, "span 2"]}
                      spacing={5}
                      alignItems="flex-start"
                      bg="blue.500"
                      color="white"
                      px={5}
                      py={10}
                    >
                      <Heading as="p" fontSize="3xl">
                        {"Best practices"}
                      </Heading>
                      <LinkOverlay
                        href="/best-practices"
                        fontSize="xl"
                        lineHeight="short"
                        fontWeight={600}
                        display="inline-flex"
                        alignItems="center"
                        gap={3}
                        sx={{
                          ".is-animated-right": {
                            transition:
                              "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          },
                        }}
                        _hover={{
                          ".is-animated-right": {
                            transform: "translateX(25%)",
                          },
                        }}
                        _focusVisible={{
                          outline: "0.125rem solid",
                          outlineColor: "white",
                          outlineOffset: "0.125rem",
                          ".is-animated-right": {
                            transform: "translateX(25%)",
                          },
                        }}
                      >
                        <span>{"See all best practices"}</span>
                        <ArrowRightIcon
                          size="1.5rem"
                          strokeWidth={2}
                          isAnimated="right"
                        />
                      </LinkOverlay>
                    </LinkBox>

                    <LinkBox
                      as={Stack}
                      gridColumn={["1 / -1", null, "span 2"]}
                      spacing={5}
                      alignItems="flex-start"
                      bg="black"
                      color="white"
                      px={5}
                      py={10}
                    >
                      <Heading as="p" fontSize="3xl">
                        {"Paths to NetZero"}
                      </Heading>
                      <LinkOverlay
                        href="/paths-to-netzero"
                        fontSize="xl"
                        lineHeight="short"
                        fontWeight={600}
                        display="inline-flex"
                        alignItems="center"
                        gap={3}
                        sx={{
                          ".is-animated-right": {
                            transition:
                              "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          },
                        }}
                        _hover={{
                          ".is-animated-right": {
                            transform: "translateX(25%)",
                          },
                        }}
                        _focusVisible={{
                          outline: "0.125rem solid",
                          outlineColor: "white",
                          outlineOffset: "0.125rem",
                          ".is-animated-right": {
                            transform: "translateX(25%)",
                          },
                        }}
                      >
                        <span>{"Read more"}</span>
                        <ArrowRightIcon
                          size="1.5rem"
                          strokeWidth={2}
                          isAnimated="right"
                        />
                      </LinkOverlay>
                    </LinkBox>

                    <Stack spacing={3}>
                      <Heading as="p" fontSize="3xl">
                        {"Pillars"}
                      </Heading>
                      <Stack
                        spacing={1}
                        divider={<Divider />}
                        borderY="0.0625rem solid"
                        borderColor="gray.200"
                        flex="1"
                      >
                        {navigation.pillars?.map((item) => {
                          return (
                            <ButtonLink
                              key={item.key}
                              href={item.slug}
                              variant="defaultLink"
                              colorScheme="blue"
                              size="lg-variable"
                              rightIcon={
                                <ArrowRightIcon
                                  size="1.5rem"
                                  strokeWidth={2}
                                  isAnimated="right"
                                />
                              }
                            >
                              {`${item.key}. ${item.title}`}
                            </ButtonLink>
                          )
                        })}
                        <Stack flex="1" justifyContent="flex-end">
                          <ButtonLink
                            href="/pillars"
                            variant="defaultLink"
                            colorScheme="blue"
                            size="lg-variable"
                            rightIcon={
                              <ArrowRightIcon
                                size="1.5rem"
                                strokeWidth={2}
                                isAnimated="right"
                              />
                            }
                          >
                            {`Explore all pillars`}
                          </ButtonLink>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack spacing={3}>
                      <Heading as="p" fontSize="3xl">
                        {"Sectors"}
                      </Heading>
                      <Stack
                        spacing={1}
                        divider={<Divider />}
                        borderY="0.0625rem solid"
                        borderColor="gray.200"
                        flex="1"
                      >
                        {navigation.sectors?.map((item) => {
                          return (
                            <ButtonLink
                              key={item.key}
                              href={item.slug}
                              variant="defaultLink"
                              colorScheme="blue"
                              size="lg-variable"
                              rightIcon={
                                <ArrowRightIcon
                                  size="1.5rem"
                                  strokeWidth={2}
                                  isAnimated="right"
                                />
                              }
                            >
                              {item.title}
                            </ButtonLink>
                          )
                        })}
                        <Stack flex="1" justifyContent="flex-end">
                          <ButtonLink
                            href="/sectors"
                            variant="defaultLink"
                            colorScheme="blue"
                            size="lg-variable"
                            rightIcon={
                              <ArrowRightIcon
                                size="1.5rem"
                                strokeWidth={2}
                                isAnimated="right"
                              />
                            }
                          >
                            {`Explore all sectors`}
                          </ButtonLink>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack spacing={3}>
                      <Heading as="p" fontSize="3xl">
                        {"Stakeholders"}
                      </Heading>
                      <Stack
                        spacing={1}
                        divider={<Divider />}
                        borderY="0.0625rem solid"
                        borderColor="gray.200"
                        flex="1"
                      >
                        {navigation.stakeholders?.map((item) => {
                          return (
                            <ButtonLink
                              key={item.key}
                              href={item.slug}
                              variant="defaultLink"
                              colorScheme="blue"
                              size="lg-variable"
                              rightIcon={
                                <ArrowRightIcon
                                  size="1.5rem"
                                  strokeWidth={2}
                                  isAnimated="right"
                                />
                              }
                            >
                              {item.title}
                            </ButtonLink>
                          )
                        })}
                        <Stack flex="1" justifyContent="flex-end">
                          <ButtonLink
                            href="/stakeholders"
                            variant="defaultLink"
                            colorScheme="blue"
                            size="lg-variable"
                            rightIcon={
                              <ArrowRightIcon
                                size="1.5rem"
                                strokeWidth={2}
                                isAnimated="right"
                              />
                            }
                          >
                            {`Explore all stakeholders`}
                          </ButtonLink>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack spacing={3}>
                      <Heading as="p" fontSize="3xl">
                        {"About"}
                      </Heading>
                      <Stack
                        spacing={1}
                        divider={<Divider />}
                        borderY="0.0625rem solid"
                        borderColor="gray.200"
                        flex={1}
                      >
                        {[
                          {
                            slug: "/paths-to-netzero",
                            label: "Paths to NetZero",
                          },
                          {
                            slug: "/about",
                            label: "About NetZero Pathfinders",
                          },
                          {
                            slug: "/newsletter",
                            label: "Newsletter",
                          },
                          {
                            slug: "/reports",
                            label: "Reports",
                          },
                        ].map((item) => {
                          return (
                            <ButtonLink
                              key={item.slug}
                              href={item.slug}
                              variant="defaultLink"
                              colorScheme="blue"
                              size="lg-variable"
                              rightIcon={
                                <ArrowRightIcon
                                  size="1.5rem"
                                  strokeWidth={2}
                                  isAnimated="right"
                                />
                              }
                            >
                              {item.label}
                            </ButtonLink>
                          )
                        })}
                        <Stack flex={1} justifyContent="flex-end">
                          <HStack spacing={3} h={12}>
                            <Text
                              flex={1}
                              fontSize="lg"
                              lineHeight="short"
                              fontWeight={600}
                            >
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
                      </Stack>
                    </Stack>
                  </SimpleGrid>
                </motion.div>
              </Box>
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

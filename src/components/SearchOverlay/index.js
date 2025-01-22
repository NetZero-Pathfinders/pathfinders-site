import { useRef, useEffect } from "react"
import {
  Box,
  HStack,
  SimpleGrid,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  useTheme,
  Button,
} from "@chakra-ui/react"
import { create } from "zustand"
import _sortBy from "lodash/sortBy"
import { useRouter } from "next/router"

import Logo from "@/components/Logo"
import { Link } from "@/components/Link"
import { CloseIcon, SearchIcon } from "@/components/Icon"
import {
  QuickSearch,
  QuickSearchInput,
  QuickSearchResults,
} from "@/components/QuickSearch"

export const useSearchOverlay = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default function SearchOverlay() {
  const isOpen = useSearchOverlay((state) => state.isOpen)
  const onOpen = useSearchOverlay((state) => state.onOpen)
  const onClose = useSearchOverlay((state) => state.onClose)

  const btnRef = useRef()
  const closeRef = useRef()
  const inputRef = useRef()

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
      <Button ref={btnRef} onClick={handleToggle} variant="ghost" px={0}>
        <SearchIcon size="1.25rem" />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        initialFocusRef={inputRef}
        finalFocusRef={btnRef}
        size="full"
        trapFocus
      >
        {/* <DrawerOverlay /> */}
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
                  <Link
                    variant="logo"
                    href="/"
                    flex="none"
                    w={{ base: "11rem", sm: "14rem" }}
                    p={1}
                  >
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

                <SimpleGrid
                  columns={[1, null, 2, null, 6]}
                  gridColumnGap={6}
                  gridRowGap={12}
                  py={12}
                >
                  <Box gridColumn={["1 / -1", null, null, null, "2 / -2"]}>
                    <QuickSearch
                      customOptions={{ isOpen: true }}
                      maxW="100%"
                      searchIndex="lite"
                    >
                      <QuickSearchInput bg="gray.100" mb={6} ref={inputRef} />
                      <hr />
                      <QuickSearchResults
                        zIndex={0}
                        position="relative"
                        top={0}
                        w="100%"
                        pl={0}
                      />
                    </QuickSearch>
                  </Box>
                </SimpleGrid>
              </Box>
            </Container>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

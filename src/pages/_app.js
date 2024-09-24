import { ChakraProvider, Box } from "@chakra-ui/react"
// import { AnimatePresence, motion } from "framer-motion"
// import { useRouter } from "next/router"
import Script from "next/script"

import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
// import { useNavigationOverlay } from "@/components/NavigationOverlay"
// import { useSearchOverlay } from "@/components/SearchOverlay"

import theme from "@/utils/theme"

export default function App({ Component, pageProps }) {
  // const router = useRouter()
  // const pathname = router.asPath

  // const pathKey = pathname.split("?")[0].trim()

  return (
    <>
      <ChakraProvider theme={theme} resetCSS>
        <SiteHeader navigation={pageProps?.navigation || {}} />
        {/* <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <motion.main
          key={pathKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
            type: "spring",
            bounce: 0,
          }}
          style={{ position: "relative", width: "100%", overflow: "visible" }}
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence> */}
        <Box bg="white" minH="100vh">
          <Component {...pageProps} />
        </Box>
        <SiteFooter />
      </ChakraProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  )
}

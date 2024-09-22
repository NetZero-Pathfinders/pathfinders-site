// import { ChakraProvider } from "@chakra-ui/react"
// import Script from "next/script"

// import theme from "@/styles/theme"

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <ChakraProvider theme={theme}>
//         <Component {...pageProps} />
//       </ChakraProvider>
//       <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
//     </>
//   )
// }

// import { useEffect } from "react"
import { ChakraProvider } from "@chakra-ui/react"
// import { AnimatePresence, motion } from "framer-motion"
// import { useRouter } from "next/router"

import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
// import { useNavigationOverlay } from "@/components/NavigationOverlay"
// import { useSearchOverlay } from "@/components/SearchOverlay"

import theme from "@/utils/theme"

export default function App({ Component, pageProps }) {
  // const router = useRouter()
  // const pathname = router.asPath

  // const onCloseNavigationOverlay = useNavigationOverlay(
  //   (state) => state.onClose
  // )
  // const onCloseSearchOverlay = useSearchOverlay((state) => state.onClose)

  // const pathKey = pathname.split("?")[0].trim()

  // const handleExitComplete = () => {
  //   if (typeof window === "undefined") return
  //   onCloseNavigationOverlay()
  //   onCloseSearchOverlay()
  //   window.scrollTo(0, 0)
  // }

  // useEffect(() => {
  //   if (typeof window === "undefined") return undefined

  //   const handleRouteChangeStart = (url) => {
  //     if (url === window.location.pathname) {
  //       onCloseNavigationOverlay()
  //       onCloseSearchOverlay()
  //     }
  //   }

  //   const handleRouteChangeComplete = () => {}

  //   router.events.on("routeChangeStart", handleRouteChangeStart)
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete)

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart)
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete)
  //   }
  // }, [])

  return (
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
      <Component {...pageProps} />
      <SiteFooter navigation={pageProps?.navigation || {}} />
    </ChakraProvider>
  )
}

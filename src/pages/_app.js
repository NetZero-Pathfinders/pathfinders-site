import {
  ChakraProvider,
  extendTheme,
  theme as defaultTheme,
} from "@chakra-ui/react"
import Script from "next/script"

const theme = extendTheme({
  fonts: {
    body: `"AvenirPathfinders", Avenir Next, ${defaultTheme.fonts.body}`,
    heading: `"AvenirPathfinders", Avenir Next, ${defaultTheme.fonts.heading}`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        _focusVisible: {
          outline: "0.125rem solid #FFF",
          outlineOffset: "0.125rem",
          boxShadow: "none",
        },
      },
      variants: {
        outline: { borderWidth: 2 },
      },
      sizes: {
        "2xl": { fontSize: "2xl", h: 14, pl: 8, pr: 6 },
      },
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  )
}

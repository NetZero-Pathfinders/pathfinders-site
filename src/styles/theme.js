import localFont from "next/font/local"
import { extendTheme } from "@chakra-ui/react"

const avenirSans = localFont({
  display: "swap",
  src: [
    {
      path: "../pages/fonts/bb-avenir-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../pages/fonts/bb-avenir-demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../pages/fonts/bb-avenir-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bb-avenir",
  fallback: ["system-ui", "sans-serif"],
})

const theme = extendTheme({
  fonts: {
    body: avenirSans.style.fontFamily,
    heading: avenirSans.style.fontFamily,
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

export default theme

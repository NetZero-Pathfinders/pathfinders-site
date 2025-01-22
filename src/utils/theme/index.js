import { theme as defaultTheme } from "@chakra-ui/theme"
import localFont from "next/font/local"

import colorsTheme from "./colors"
import componentsTheme from "./components"

const avenirSans = localFont({
  display: "swap",
  src: [
    {
      path: "../../pages/fonts/bb-avenir-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../pages/fonts/bb-avenir-demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../pages/fonts/bb-avenir-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bb-avenir",
  fallback: ["system-ui", "sans-serif"],
})

export default {
  ...defaultTheme,
  styles: {
    ...defaultTheme.styles,
    global: {
      ...defaultTheme.styles.global,
      body: {
        maxWidth: "100vw",
        overflowX: "hidden",
        fontFamily: "body",
      },
      "::selection": {
        background: "blue.500",
        color: "white",
      },
      ".diagram-label-link": {
        outline: "none",
        cursor: "pointer",
        _focusVisible: {
          outline: "0.125rem solid",
          outlineColor: "blue.500",
          outlineOffset: "0.25rem",
        },
      },
    },
  },
  sizes: {
    ...defaultTheme.sizes,
    container: {
      ...defaultTheme.sizes.container,
      sm: "40rem",
      "md": "48rem",
      "lg": "64rem",
      // "xl": "80rem",
      "xl": "90rem",
    },
  },
  fonts: {
    ...defaultTheme.fonts,
    body: avenirSans.style.fontFamily,
    heading: avenirSans.style.fontFamily,
  },
  fontSizes: {
    ...defaultTheme.fontSizes,
    "3xl": "2rem",
    "4xl": "2.5rem",
    "5xl": "3rem",
  },
  lineHeights: {
    ...defaultTheme.lineHeights,
    shorter: "calc(1em + 0.375rem)",
    short: "calc(1em + 0.5rem)",
    base: "calc(1em + 0.75rem)",
    tall: "calc(1em + 1rem)",
    taller: "calc(1em + 1.25rem)",
  },
  colors: colorsTheme,
  components: componentsTheme,
  textStyles: {
    h1_mdx: {
      fontSize: ["4xl", null, "5xl"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      mb: 6,
      gridRow: "span 1",
    },
    h2_mdx: {
      fontSize: ["3xl", null, "4xl"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      mb: 6,
      gridRow: "span 1",
    },
    h2_mdx_source: {
      fontSize: ["3xl", null, "4xl"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      borderTop: "0.0625rem solid",
      borderColor: "gray.200",
      pt: 6,
      gridRow: "span 1",
    },
    h3_mdx: {
      fontSize: ["xl", null, "2xl"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      mb: 6,
      gridRow: "span 1",
    },
    h4_mdx: {
      fontSize: ["lg", null, "xl"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      mb: 6,
      gridRow: "span 1",
    },
    h5_mdx: {
      fontSize: ["md", null, "lg"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      mb: 6,
      gridRow: "span 1",
    },
    h6_mdx: {
      fontSize: ["md", null, "lg"],
      lineHeight: "shorter",
      gridColumn: ["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"],
      mb: 6,
      gridRow: "span 1",
    },
  },
}

// import colorsTheme from "@utils/theme/colors"
// import componentsTheme from "@utils/theme/components"

// export default {
//   ...defaultTheme,
//   styles: {
//     ...defaultTheme.styles,
//     global: {
//       ...defaultTheme.styles.global,
//       body: {
//         maxWidth: "100vw",
//         overflowX: "hidden",
//       },
//       ".diagram-label-link": {
//         outline: "none",
//         cursor: "pointer",
//         _focusVisible: {
//           outline: "0.125rem solid",
//           outlineColor: "blue.500",
//           outlineOffset: "0.25rem",
//         },
//       },
//     },
//   },
//   sizes: {
//     ...defaultTheme.sizes,
//     container: {
//       ...defaultTheme.sizes.container,
//       sm: "40rem",
//       "md": "48rem",
//       "lg": "64rem",
//       // "xl": "80rem",
//       "xl": "90rem",
//     },
//   },
//   fonts: {
//     ...defaultTheme.fonts,
//     body: `"Avenir Next", ${defaultTheme.fonts.body}`,
//     heading: `"Avenir Next", ${defaultTheme.fonts.heading}`,
//   },
//   letterSpacings: {
//     ...defaultTheme.letterSpacings,
//     tighter: "-0.025em",
//     tight: "-0.0125em",
//     normal: "0",
//     wide: "0.0125em",
//     wider: "0.025em",
//     widest: "0.05em",
//     // tighter: "-0.0125em",
//     // tight: "-0.00625em",
//     // normal: "0",
//     // wide: "0.00625em",
//     // wider: "0.0125em",
//     // widest: "0.0625em",
//   },
//   fontSizes: {
//     ...defaultTheme.fontSizes,
//     "3xl": "2rem",
//     "4xl": "2.5rem",
//     "5xl": "3rem",
//   },
//   lineHeights: {
//     ...defaultTheme.lineHeights,
//     shorter: "calc(1em + 0.375rem)",
//     short: "calc(1em + 0.5rem)",
//     base: "calc(1em + 0.75rem)",
//     tall: "calc(1em + 1rem)",
//     taller: "calc(1em + 1.25rem)",
//   },
//   colors: colorsTheme,
//   components: componentsTheme,
// }

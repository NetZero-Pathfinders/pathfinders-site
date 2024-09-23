import { theme as defaultTheme } from "@chakra-ui/theme"

export default {
  ...defaultTheme.components.Heading,
  baseStyle: {
    ...defaultTheme.components.Heading.baseStyle,
    fontFamily: "heading",
    fontWeight: 700,
    letterSpacing: "-0.015em",
    lineHeight: "short",
  },
  variants: {
    ...defaultTheme.components.Heading.variants,
    pageHeading: {
      fontSize: ["4xl", null, "5xl"],
      fontWeight: 700,
    },
    sectorCardHeading: {
      fontSize: ["3xl", "4xl", "5xl"],
      "a:focus-visible": {
        outline: "0.125rem solid #000",
        outlineOffset: "0.125rem",
      },
    },
    sectionHeading: {
      fontSize: ["3xl", null, "5xl"],
    },
    cardTitle: {
      fontSize: ["2xl", null, "3xl"],
    },
    footerHeading: {
      fontSize: "lg",
      // textTransform: "uppercase",
      // color: "blue.300",
      // letterSpacing: "0.0625rem",
    },
  },
  sizes: {
    ...defaultTheme.components.Heading.sizes,
    "4xl": { "fontSize": ["6xl", null, "7xl"] },
    "3xl": { "fontSize": ["5xl", null, "6xl"] },
    "2xl": { "fontSize": ["4xl", null, "5xl"] },
    "xl": { "fontSize": ["3xl", null, "4xl"] },
    "lg": { "fontSize": ["2xl", null, "3xl"] },
    "md": { "fontSize": "xl" },
    "sm": { "fontSize": "md" },
    "xs": { "fontSize": "sm" },
  },
  defaultProps: {},
}

import { baseTheme, theme as defaultTheme } from "@chakra-ui/theme"

export default {
  ...defaultTheme.components.Text,
  baseStyle: {
    fontFamily: "body",
    fontWeight: 500,
    lineHeight: "base",
    letterSpacing: "-0.01em",
  },
  variants: {
    body: {
      fontSize: "xl",
    },
    pageSubheading: {
      fontSize: "2xl",
    },
    sectionSubheading: {
      fontSize: "2xl",
      color: "gray.500",
    },
    caption: {
      fontSize: "md",
      color: "gray.500",
    },
  },
}

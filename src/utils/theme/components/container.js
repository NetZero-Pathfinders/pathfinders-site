import { baseTheme, theme as defaultTheme } from "@chakra-ui/theme"

export default {
  ...defaultTheme.components.Container,
  baseStyle: {
    ...defaultTheme.components.Container.baseStyle,
    position: "relative",
    maxW: "container.xl",
    px: [0, null, 8],
  },
}

import { theme as defaultTheme } from "@chakra-ui/theme"

export default {
  ...defaultTheme.components.Link,
  baseStyle: {
    ...defaultTheme.components.Link.baseStyle,
    fontFamily: "body",
    letterSpacing: "-0.01em",
    _focusVisible: {
      outline: "0.125rem solid",
      outlineColor: "black",
      outlineOffset: "0.125rem",
    },
  },
  variants: {
    text: ({ colorScheme, theme }) => ({
      fontSize: "inherit",
      display: "inline",
      px: 0,
      color: colorScheme ? theme.colors[colorScheme][500] : "inherit",
      _hover: { textDecoration: "underline" },
      _focusVisible: {
        textDecoration: "underline",
      },
    }),
  },
  defaultProps: {
    ...defaultTheme.components.Link.defaultProps,
    variant: "text",
    colorScheme: "blue",
  },
}

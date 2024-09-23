import { baseTheme, theme as defaultTheme } from "@chakra-ui/theme"

// console.log(defaultTheme.components.Button.variants.solid)

export default {
  ...defaultTheme.components.Button,
  baseStyle: {
    ...defaultTheme.components.Button.baseStyle,
    borderRadius: 0,
    fontFamily: "body",
    letterSpacing: "-0.01em",
    lineHeight: "calc(1em + 0.5rem)",
    "span svg.is-animated-left, span svg.is-animated-right": {
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    _hover: {
      _disabled: { bg: "initial" },
      "span svg.is-animated-left": { transform: "translateX(-25%)" },
      "span svg.is-animated-right": { transform: "translateX(25%)" },
    },
    _focusVisible: {
      outline: "0.125rem solid",
      outlineColor: "black",
      outlineOffset: "0.125rem",
      "span svg.is-animated-left": { transform: "translateX(-25%)" },
      "span svg.is-animated-right": { transform: "translateX(25%)" },
    },
  },
  variants: {
    ...defaultTheme.components.Button.variants,
    defaultLink: ({ colorScheme }) => {
      return {
        color: "currentcolor",
        bg: "transparent",
        justifyContent: "space-between",
        textAlign: "left",
        px: 0,
        _hover: {
          color: `${colorScheme}.500`,
        },
        _focusVisible: {
          color: `${colorScheme}.500`,
        },
        _active: {
          color: `${colorScheme}.500`,
        },
      }
    },
    ghostLink: ({ rightIcon, colorScheme }) => {
      return {
        bg: "transparent",
        justifyContent: rightIcon ? "space-between" : "center",
        textAlign: rightIcon ? "left" : "center",
        _hover: {
          bg: `${colorScheme}.100`,
        },
        _focusVisible: {
          bg: `${colorScheme}.100`,
        },
        _active: {
          bg: `${colorScheme}.200`,
        },
      }
    },

    linkCard: (props) => ({
      ...defaultTheme.components.Button.variants.solid(props),
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      whiteSpace: "normal",
      fontSize: "3xl",
      p: 6,
      pr: 4,
      aspectRatio: [1, 1.75, 1.25, 1.5, 1],
      "span:last-of-type": { flex: "none", alignSelf: "flex-end" },
    }),
    outline: (props) => ({
      ...defaultTheme.components.Button.variants.outline(props),
      justifyContent: "space-between",
      outline: "0.125rem solid",
    }),
  },
  sizes: {
    "none": {},
    "2xl": { h: 14, minW: 14, fontSize: "2xl", px: 5 },
    "xl": { h: 14, minW: 14, fontSize: "xl", px: 5 },
    "lg": { h: 12, minW: 12, fontSize: "lg", px: 5 },
    "md": { h: 10, minW: 10, fontSize: "md", px: 4 },
    "sm": { h: 8, minW: 8, fontSize: "sm", px: 3 },
    "xs": { h: 6, minW: 6, fontSize: "xs", px: 2 },

    "2xl-variable": {
      whiteSpace: "normal",
      h: "auto",
      minW: 14,
      fontSize: "2xl",
      px: 5,
      py: "0.75rem",
      span: { alignSelf: "flex-end" },
    },
    "xl-variable": {
      whiteSpace: "normal",
      h: "auto",
      minW: 14,
      fontSize: "xl",
      px: 5,
      py: "0.875rem",
      span: { alignSelf: "flex-end" },
    },
    "lg-variable": {
      whiteSpace: "normal",
      h: "auto",
      minW: 12,
      fontSize: "lg",
      px: 5,
      py: "0.6875rem",
      span: { alignSelf: "flex-end" },
    },
    "md-variable": {
      whiteSpace: "normal",
      h: "auto",
      minW: 10,
      fontSize: "md",
      px: 4,
      py: 2,
      span: { alignSelf: "flex-end" },
    },
    "sm-variable": {
      whiteSpace: "normal",
      h: "auto",
      minW: 8,
      fontSize: "sm",
      px: 3,
      py: "0.3125rem",
      span: { alignSelf: "flex-end" },
    },
    "xs-variable": {
      whiteSpace: "normal",
      h: "auto",
      minW: 6,
      fontSize: "xs",
      px: 2,
      py: 0.5,
      span: { alignSelf: "flex-end" },
    },
  },
}

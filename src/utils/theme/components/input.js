import { baseTheme, theme as defaultTheme } from "@chakra-ui/theme"

export default {
  baseStyle: {
    addon: {
      height: "var(--input-height)",
      fontSize: "var(--input-font-size)",
      lineHeight: "calc(1em + 0.5rem)",
      letterSpacing: "-0.01em",
      px: "var(--input-padding)",
      borderRadius: 0,
    },
    field: {
      width: "100%",
      height: "var(--input-height)",
      fontSize: "var(--input-font-size)",
      lineHeight: "calc(1em + 0.5rem)",
      letterSpacing: "-0.01em",
      px: "var(--input-padding)",
      borderRadius: 0,
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      _disabled: { "opacity": 0.4, "cursor": "not-allowed" },
    },
  },
  variants: {
    outline: {
      "field": {
        border: "0.0625rem solid",
        borderColor: "inherit",
        bg: "inherit",
        _hover: { "borderColor": "gray.300" },
        _readOnly: { "boxShadow": "none !important", "userSelect": "all" },
        _invalid: {
          borderColor: "#000000",
          boxShadow: "0 0 0 1px #000000",
        },
        _focusVisible: {
          zIndex: 1,
          outline: "0.125rem solid",
          outlineColor: "blue.500",
          outlineOffset: "-0.125rem",
        },
      },
      "addon": {
        border: "1px solid",
        borderColor: "inherit",
        bg: "gray.100",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
  sizes: {
    ...defaultTheme.components.Input.sizes,
    xl: {
      field: {
        "--input-border-radius": "radii.md",
        "--input-font-size": "fontSizes.xl",
        "--input-height": "sizes.14",
        "--input-padding": "space.6",
      },
      group: {
        "--input-border-radius": "radii.md",
        "--input-font-size": "fontSizes.xl",
        "--input-height": "sizes.14",
        "--input-padding": "space.6",
      },
    },
  },
}

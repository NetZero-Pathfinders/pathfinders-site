import { theme as defaultTheme } from "@chakra-ui/theme"

export default {
  ...defaultTheme.components.Checkbox,
  sizes: {
    ...defaultTheme.components.Checkbox.sizes,
    lg: {
      ...defaultTheme.components.Checkbox.sizes.lg,
      control: {
        ...defaultTheme.components.Checkbox.sizes.lg.control,
        borderRadius: "none",
        _focusVisible: {
          outline: "0.125rem solid",
          outlineOffset: "0.125rem",
          boxShadow: "none",
        },
      },
    },
  },
}

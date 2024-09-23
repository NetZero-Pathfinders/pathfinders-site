export default {
  baseStyle: {
    borderBottomWidth: "0.0625rem",
    borderColor: "gray.200",
    opacity: 1,
    borderStyle: "solid",
  },
  defaultProps: {
    variant: "thin",
  },
  variants: {
    thick: {
      borderBottomWidth: "0.25rem",
      borderColor: "black",
    },
    thin: {
      borderBottomWidth: "0.0625rem",
      borderColor: "gray.200",
    },
  },
}

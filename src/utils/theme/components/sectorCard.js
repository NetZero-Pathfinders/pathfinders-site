import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

// import headingTheme from "@utils/theme/components/heading"

const helpers = createMultiStyleConfigHelpers([
  "sectorCard",
  "sectorCardImage",
  "sectorCardIcon",
  "sectorCardContent",
  "sectorCardGrid",
  "sectorCardHeading",
])

export default helpers.defineMultiStyleConfig({
  baseStyle: {
    sectorCard: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gridColumnGap: 6,
      alignItems: "start",
      ".continue-reading": {
        transition: "color 0.2s",
        ".is-animated-right": {
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        },
      },
      _hover: {
        img: { transform: "scale(1.1)" },
        ".sector-image-overlay": { transform: "scale(1.1)" },
        ".continue-reading": {
          color: "blue.500",
          ".is-animated-right": { transform: "translateX(25%)" },
        },
      },
    },
    sectorCardImage: {
      zIndex: 1,
      img: { transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)" },
      ".sector-image-overlay": {
        transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      "> div": {
        top: ["50%", null, null, "40%"],
      },
    },
    sectorCardIcon: {
      position: "absolute",
      top: 0,
      zIndex: 2,
      bg: "white",
      w: ["4rem", null, null, "6rem"],
      h: ["4.75rem", null, null, "6.75rem"],
      borderBottom: "0.75rem solid",
      borderColor: "gray.300",
    },
    sectorCardContent: {
      zIndex: 3,
      mt: [0, null, null, "47%"],
    },
    sectorCardGrid: {
      opacity: 1,
      gridColumn: ["2 / -2", null, null, "2 / -3", "3 / -3"],
      gridRow: 1,
      zIndex: 2,
      mt: ["33%", null, null, "15%", "20%"],
      color: "gray.300",
    },
  },
  variants: {
    ltr: {
      sectorCardImage: {
        gridColumn: ["1 / -1", null, null, "1 / span 5"],
      },
      sectorCardIcon: {
        right: 0,
      },
      sectorCardContent: {
        gridColumn: ["1 / -1", null, null, "-5 / -1"],
        ml: -10,
        pl: 10,
        pt: 10,
      },
    },
    rtl: {
      sectorCardImage: {
        gridColumn: ["1 / -1", null, null, "-6 / -1"],
      },
      sectorCardIcon: {
        left: 0,
      },
      sectorCardContent: {
        gridColumn: ["1 / -1", null, null, "1 / span 4"],
        mr: -10,
        pr: 10,
        pt: 10,
      },
    },
  },
  defaultProps: {
    variant: "ltr",
  },
})

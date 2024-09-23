import { Box, Stack } from "@chakra-ui/react"

export default function ArrowBox({ boxColor = "white", children }) {
  const arrowWidth = 100
  const arrowHeight = 10

  return (
    <Stack spacing={0}>
      <Box bg={boxColor} flex={1}>
        {children}
      </Box>
      <Box color={boxColor}>
        <svg viewBox={`0 0 ${arrowWidth} ${arrowHeight}`}>
          <path
            d={`M0,0L${arrowWidth},0L${arrowWidth / 2},${arrowHeight}Z`}
            fill="currentcolor"
          />
        </svg>
      </Box>
    </Stack>
  )
}

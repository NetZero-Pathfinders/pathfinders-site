import { useTheme } from "@chakra-ui/react"

export default function useCustomColors(customColors = {}) {
  const { colors: defaultColors } = useTheme()
  const combinedColors = Object.entries(defaultColors.charts || {}).map((d) => d[1])
  combinedColors.groupColors = customColors
  return combinedColors
}

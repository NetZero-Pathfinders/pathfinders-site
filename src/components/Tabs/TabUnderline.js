import { motion } from "framer-motion"
import { useTheme } from "@chakra-ui/react"

export default function TabUnderline({ layoutId = "tab-underline", color }) {
  const { colors } = useTheme()
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ duration: 0.3, bounce: 0, type: "spring" }}
      initial={{ background: color || colors.black }}
      animate={{ background: color || colors.black }}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "0.25rem",
        width: "100%",
        zIndex: 1,
      }}
    />
  )
}

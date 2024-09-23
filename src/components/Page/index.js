import { Stack } from "@chakra-ui/react"

export default function Page({ spacing = 24, pb = 24, ...restProps }) {
  return <Stack minH="100vh" spacing={spacing} pb={pb} {...restProps} />
}

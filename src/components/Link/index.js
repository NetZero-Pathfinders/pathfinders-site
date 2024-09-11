import { forwardRef } from "react"
import {
  Link as ChakraLink,
  LinkBox as ChakraLinkBox,
  LinkOverlay as ChakraLinkOverlay,
  Button,
} from "@chakra-ui/react"
import NextLink from "next/link"

export const LinkBox = ChakraLinkBox
export const LinkOverlay = forwardRef((props, ref) => (
  <ChakraLinkOverlay ref={ref} as={NextLink} scroll={false} {...props} />
))

export const Link = forwardRef((props, ref) => {
  return <ChakraLink ref={ref} as={NextLink} scroll={false} {...props} />
})

export const ButtonLink = forwardRef((props, ref) => {
  return <Button ref={ref} as={NextLink} scroll={false} {...props} />
})

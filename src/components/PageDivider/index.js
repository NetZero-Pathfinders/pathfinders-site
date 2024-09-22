import { Container, Divider } from "@chakra-ui/react"

export default function pageDivider(props) {
  return (
    <Container>
      <Divider mx={5} w="auto" {...props} />
    </Container>
  )
}

import { Button } from "@chakra-ui/react"

const SignupButton = ({ size = "lg", ...restProps }) => {
  return (
    <Button size={size} colorScheme="blue" flex="none" w={["100%", null, "auto"]} {...restProps} />
  )
}

export default SignupButton

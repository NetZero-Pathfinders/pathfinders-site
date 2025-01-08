import { Input } from "@chakra-ui/react"

const SignupInput = ({ size = "lg", ...restProps }) => {
  return (
    <Input
      type="email"
      name="email"
      size={size}
      placeholder="Your email address"
      {...restProps}
    />
  )
}

export default SignupInput

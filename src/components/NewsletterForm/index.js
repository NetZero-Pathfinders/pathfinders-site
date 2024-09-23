import {
  HStack,
  Text,
  Stack,
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"

import { ArrowRightIcon } from "@/components/Icon"
import { Link } from "@/components/Link"

export default function NewsletterForm({ inverted }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit")
  }
  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit}>
      <HStack spacing={1}>
        <InputGroup size="xl">
          <Input
            required
            name="email"
            placeholder="name@email.com"
            pr={0}
            border="none"
            borderBottom={
              inverted ? "0.125rem solid #FFF" : "0.125rem solid #000"
            }
            fontWeight={500}
            letterSpacing="-0.015em"
            _focusVisible={{
              borderBottomColor: "blue.500",
            }}
          />
          <InputRightElement w="auto">
            <Button
              type="submit"
              size="lg"
              colorScheme="whiteAlpha"
              variant="ghost"
              color={inverted ? "white" : "gray.900"}
              rightIcon={<ArrowRightIcon isAnimated="right" />}
              _focusVisible={{ bg: "gray.700", color: "blue.500" }}
              _active={{ bg: "gray.800", color: "blue.500" }}
            >
              {"Submit"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </HStack>
      <Box px={4}>
        <Checkbox size="lg" alignItems="flex-start" gap={3} required>
          <Text fontSize="lg" color="gray.500" mt={-1}>
            {"By submitting my information, I agree to the "}
            <Link href="https://about.bnef.com/bnef-privacy-policy/">
              {"privacy policy"}
            </Link>
            {" and to learn more about products and services from Bloomberg."}
          </Text>
        </Checkbox>
      </Box>
    </Stack>
  )
}

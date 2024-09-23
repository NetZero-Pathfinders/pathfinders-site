import React, { forwardRef } from "react"
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"

import { SearchIcon } from "@/components/Icon"
import { useQuickSearchContext } from "./QuickSearchContext"

const QuickSearchInput = forwardRef(({ bg = "white", ...restProps }, ref) => {
  const { isOpen, getInputProps, getToggleButtonProps } =
    useQuickSearchContext()
  return (
    <InputGroup bg={bg} {...restProps}>
      <Input
        ref={ref}
        placeholder="Search by a topic, sector or country"
        fontWeight={500}
        w="100%"
        h={16}
        size="xl"
        border="none"
        _placeholder={{ color: "gray.500" }}
        _focusVisible={{
          bg: "white",
          color: "black",
          outline: "0.25rem solid",
          outlineColor: "blue.500",
          outlineOffset: "0.125rem",
        }}
        {...getInputProps()}
      />
      <InputRightElement w="auto" h="100%" pr={1.5}>
        <Button
          {...getToggleButtonProps()}
          aria-label={"toggle menu"}
          colorScheme="gray"
          variant="ghost"
          icon={`arrow-${isOpen ? "up" : "down"}`}
          size="lg"
          color="blue.500"
        >
          <SearchIcon size="2rem" />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})

export default QuickSearchInput

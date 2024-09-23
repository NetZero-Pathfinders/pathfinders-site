import { useState, useRef } from "react"
import _groupBy from "lodash/groupBy"
import {
  Box,
  Center,
  Input,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Button,
} from "@chakra-ui/react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

import { CloseIcon, SearchIcon } from "@/components/Icon"
import { SidebarOpen, useStore } from "@/components/BestPracticeListing"

export default function KeywordSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const inputRef = useRef(null)
  const [value, setValue] = useState("")
  const addSearchTerm = useStore((state) => state.addSearchTerm)
  const sidebarVisible = useStore((state) => state.sidebarVisible)

  return (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        addSearchTerm(value, router, pathname, searchParams)
        setValue("")
      }}
    >
      <InputGroup>
        <InputLeftElement w={sidebarVisible ? 16 : 28} h={16}>
          <Center
            h={16}
            w={12}
            style={{ display: sidebarVisible ? "none" : "flex" }}
          >
            <SidebarOpen />
          </Center>
          <Center w={12} h={16}>
            <SearchIcon size="2rem" />
          </Center>
        </InputLeftElement>
        <Input
          ref={inputRef}
          id="best-practice-filter-search"
          type="search"
          name="keyword_input"
          placeholder="e.g. Energy"
          value={value}
          autoComplete="off"
          pl={sidebarVisible ? 16 : "7.25rem"}
          pr={16}
          h={16}
          fontSize="2xl"
          fontWeight={600}
          _placeholder={{ color: "gray.400" }}
          onChange={(e) => setValue(e.target.value)}
          border={0}
          bg="gray.100"
          sx={{
            "::-webkit-search-cancel-button": {
              WebkitAppearance: "none",
              display: "none",
              opacity: 0,
            },
          }}
          _hover={{ borderColor: "blue.500" }}
          _focusVisible={{
            bg: "white",
            borderColor: "blue.500",
            outline: "0.125rem solid",
            outlineOffset: "0.125rem",
          }}
        />
        <InputRightElement w={16} h={16}>
          {value && (
            <Button
              px={0}
              borderRadius="full"
              onClick={() => {
                setValue("")
                inputRef.current?.focus()
              }}
            >
              <CloseIcon size="1rem" />
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

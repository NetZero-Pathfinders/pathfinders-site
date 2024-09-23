import React from "react"
import { Box, List, ListItem, HStack, useTheme } from "@chakra-ui/react"

import { ArrowRightIcon } from "@/components/Icon"
import { useQuickSearchContext } from "./QuickSearchContext"

export default function QuickSearchResults({
  style = {},
  bg = "white",
  px = 6,
  pl = 5,
  ...restProps
}) {
  const { colors } = useTheme()
  const { isOpen, getMenuProps, highlightedIndex, getItemProps, inputItems } =
    useQuickSearchContext()
  return (
    <Box
      position="absolute"
      top="calc(100% + 1rem)"
      left={0}
      right={0}
      bg={bg}
      zIndex={999}
      {...restProps}
      style={{ ...style, display: isOpen ? "block" : "none" }}
    >
      <List pt={0} pb={3} {...getMenuProps()}>
        {!inputItems.length ||
          (inputItems.length === 1 && (
            <Box pt={5} pb={3} px={px} color="gray.500" fontWeight={600}>
              {"No suggestions"}
            </Box>
          ))}
        {inputItems.map((item, index) => {
          const isHighlighted = index === highlightedIndex
          switch (item.type) {
            case "group-start":
              return (
                <ListItem
                  key={item.key}
                  {...getItemProps({ item, index })}
                  textAlign="left"
                  px={px}
                  py={2}
                  mt={4}
                  cursor="pointer"
                  fontSize="lg"
                  lineHeight="short"
                  position="relative"
                  style={{
                    background: isHighlighted
                      ? colors.gray[100]
                      : "transparent",
                  }}
                >
                  {!!index && (
                    <Box
                      position="absolute"
                      left={px}
                      right={px}
                      top={-2}
                      h="0.0625rem"
                      bg="gray.200"
                    />
                  )}

                  <HStack
                    spacing={3}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box
                      flex="1"
                      fontWeight={600}
                      textTransform="capitalize"
                      color="gray.500"
                    >
                      {item.label.split("-").join(" ").trim()}
                      {"s"}
                    </Box>

                    <HStack
                      spacing={2}
                      style={{
                        opacity: isHighlighted ? 1 : 0,
                        color: isHighlighted
                          ? colors.blue[500]
                          : colors.gray[500],
                      }}
                    >
                      <Box fontSize="md" fontWeight={600}>
                        {`See all ${item.label.split("-").join(" ").trim()}s`}
                      </Box>
                      <ArrowRightIcon size="1.5rem" />
                    </HStack>
                  </HStack>
                </ListItem>
              )
            case "group-end":
              return (
                <ListItem key={item.key} px={px} py={2}>
                  <HStack
                    {...getItemProps({ item, index })}
                    fontSize="lg"
                    color="white"
                    cursor="pointer"
                    h={10}
                    mt={2}
                    fontWeight={600}
                    justifyContent="center"
                    spacing={3}
                    style={{
                      background: isHighlighted
                        ? colors.blue[500]
                        : colors.black,
                    }}
                  >
                    <Box>{item.label}</Box>
                    <ArrowRightIcon size="1.5rem" />
                  </HStack>
                </ListItem>
              )
            default:
              return (
                <ListItem
                  key={item.key}
                  {...getItemProps({ item, index })}
                  textAlign="left"
                  pr={6}
                  pl={px}
                  py={1.5}
                  cursor="pointer"
                  fontSize="lg"
                  lineHeight="shorter"
                  style={{
                    color: isHighlighted ? colors.blue[500] : "inherit",
                    background: isHighlighted ? colors.gray[50] : "transparent",
                  }}
                >
                  <HStack
                    spacing={3}
                    pl={pl}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box flex="1" fontWeight={600} maxW="32rem">
                      {item.label}
                    </Box>
                    {isHighlighted && <ArrowRightIcon size="1.5rem" />}
                  </HStack>
                </ListItem>
              )
          }
        })}
      </List>
    </Box>
  )
}

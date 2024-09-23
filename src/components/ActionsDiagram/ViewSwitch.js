import { HStack } from "@chakra-ui/react"
import _groupBy from "lodash/groupBy"

import { Tabs, TabList, Tab } from "@/components/Tabs"

export default function ViewSwitch({ options, value, onChange }) {
  return (
    <Tabs
      index={value}
      onChange={(id) => onChange(parseInt(id))}
      alignSelf="flex-end"
      w="100%"
    >
      <TabList as={HStack} borderBottom={0} spacing={2} w="100%">
        {options.map((viewName) => {
          return (
            <Tab
              key={viewName}
              flex="1"
              mb={0}
              h={12}
              textTransform="capitalize"
              fontSize="xl"
              fontWeight={600}
              letterSpacing="-0.01em"
              color="gray.500"
              bg="gray.100"
              w={32}
              sx={{
                "span": { display: ["inline-block", null, null, "none"] },
              }}
              _hover={{ bg: "gray.200" }}
              _selected={{
                color: "white",
                bg: "black",
                borderColor: "transparent",
              }}
              _focusVisible={{
                outline: "0.125rem solid",
                outlineColor: "black",
                outlineOffset: "0.125rem",
              }}
            >
              <span>{"By"}&nbsp;</span>
              {viewName}
            </Tab>
          )
        })}
      </TabList>
    </Tabs>
  )
}

import {
  Heading,
  Text,
  Box,
  UnorderedList,
  OrderedList,
  ListItem,
} from "@chakra-ui/react"

export default {
  h1: (props) => <Heading as="h1" textStyle="h1_mdx" {...props} />,
  h2: (props) => <Heading as="h2" textStyle="h2_mdx" {...props} />,
  h3: (props) => <Heading as="h3" textStyle="h3_mdx" {...props} />,
  h4: (props) => <Heading as="h4" textStyle="h4_mdx" {...props} />,
  h5: (props) => <Heading as="h5" textStyle="h5_mdx" {...props} />,
  h6: (props) => <Heading as="h6" textStyle="h6_mdx" {...props} />,
  p: (props) => {
    const isCaption =
      props.children.type === "strong" &&
      props?.children?.props?.children?.startsWith("Source:")
    return isCaption ? (
      <Text
        as="p"
        gridRow="span 1"
        gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
        fontSize="sm"
        color="gray.500"
        pb={5}
        _before={{ content: "'*'" }}
        {...props}
      />
    ) : (
      <Text
        as="p"
        gridRow="span 1"
        gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
        fontSize="xl"
        pb={5}
        {...props}
      />
    )
  },
  img: (props) => {
    return (
      <Box
        as="span"
        sx={{
          img: {
            width: "100%",
            height: "auto",
            "@supports (object-fit: contain)": {
              maxH: "30rem",
              objectFit: "contain",
            },
          },
        }}
      >
        <img {...props} />
      </Box>
    )
  },
  ul: (props) => {
    return (
      <UnorderedList
        spacing={2}
        ml="1.375rem"
        gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
        {...props}
      />
    )
  },
  ol: (props) => {
    return (
      <OrderedList
        spacing={2}
        ml="1.375rem"
        gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
        {...props}
      />
    )
  },
  li: (props) => {
    return <ListItem fontSize="xl" {...props} />
  },
}

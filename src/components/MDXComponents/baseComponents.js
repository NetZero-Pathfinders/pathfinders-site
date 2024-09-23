import { Heading, Text, Box } from "@chakra-ui/react"

export default {
  h1: (props) => (
    <Heading
      as="h1"
      gridRow="span 1"
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      fontSize="5xl"
      mb={6}
      {...props}
    />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      gridRow="span 1"
      fontSize={["3xl", null, "5xl"]}
      mb={6}
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      gridRow="span 1"
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      fontSize={["3xl", null, "4xl"]}
      mb={6}
      {...props}
    />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      gridRow="span 1"
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      fontSize={["3xl", null, "4xl"]}
      mb={6}
      {...props}
    />
  ),
  h5: (props) => (
    <Heading
      as="h5"
      gridRow="span 1"
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      fontSize={["3xl", null, "4xl"]}
      mb={6}
      {...props}
    />
  ),
  h6: (props) => (
    <Heading
      as="h6"
      gridRow="span 1"
      gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
      fontSize={["3xl", null, "4xl"]}
      mb={6}
      {...props}
    />
  ),
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
}

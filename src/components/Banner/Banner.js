import { Container, SimpleGrid, Box } from "@chakra-ui/layout"
import _sortBy from "lodash/sortBy"

export default function Banner({
  bg,
  bgImage,
  bgSize = "cover",
  bgRepeat = "no-repeat",
  color,
  fullWidth,
  bgPosition = "center",
  py = "24",
  ...restProps
}) {
  return (
    <Box
      as="section"
      bg={fullWidth && bg}
      bgImage={fullWidth && bgImage}
      bgSize={bgSize}
      bgRepeat={bgRepeat}
      bgPosition={bgPosition}
      color={color}
      py={py}
      overflow="hidden"
    >
      <Container>
        <Box px={5} position="relative">
          {!fullWidth && (
            <Box
              position="absolute"
              top="2.75rem"
              left={-8}
              bottom={0}
              right={-8}
              bg={bg}
              bgImage={bgImage}
              bgSize={bgSize}
              bgRepeat={bgRepeat}
              bgPosition={bgPosition}
            />
          )}
          <SimpleGrid
            position="relative"
            columns={8}
            spacing={6}
            borderBottom="0.0625rem solid"
            borderColor="gray.200"
            pb={12}
            {...restProps}
          />
        </Box>
      </Container>
    </Box>
  )
}

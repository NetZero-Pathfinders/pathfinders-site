import { Container, Stack, Box } from "@chakra-ui/react"

export {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
  SectionHeaderLinks,
} from "@/components/SectionHeader"

export function Section({ fullWidth, spacing = 6, bg, ...restProps }) {
  return fullWidth ? (
    <Stack
      as="section"
      spacing={spacing}
      position="relative"
      bg={bg}
      {...restProps}
    />
  ) : (
    <Container as="section">
      {bg && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={bg}
        />
      )}
      <Stack spacing={spacing} px={5} position="relative" {...restProps} />
    </Container>
  )
}

export function SectionBody(props) {
  return <Box {...props} />
}

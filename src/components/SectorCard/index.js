import {
  Box,
  AspectRatio,
  Stack,
  Heading,
  useMultiStyleConfig,
  createStylesContext,
  useTheme,
} from "@chakra-ui/react"

import { LinkBox, LinkOverlay } from "@/components/Link"
import DotGrid from "@/components/DotGrid"

const [StylesProvider, useStyles] = createStylesContext("SectorCard")

export function SectorCard({ children, href = "", variant }) {
  const styles = useMultiStyleConfig("SectorCard", { variant })
  return href ? (
    <Box as={LinkBox} __css={styles.sectorCard}>
      <StylesProvider value={{ ...styles, href, variant }}>
        {children}
      </StylesProvider>
    </Box>
  ) : (
    <Box __css={styles.sectorCard}>
      <StylesProvider value={{ ...styles, href, variant }}>
        {children}
      </StylesProvider>
    </Box>
  )
}

export function SectorCardImage({
  ratio = 3 / 2,
  bg = "white",
  src = "agriculture-and-nature.jpg",
  alt,
  ...restProps
}) {
  const src2 = `/images/${src}`

  const styles = useStyles()
  const { variant } = styles

  const paths = {
    ltr: [
      "polygon(0% 100%, 100% 0%, 105% 0%, 105% 105%, 0% 105%)",
      "polygon(0% 30%, 70% 100%, 0% 100%)",
    ],
    rtl: [
      "polygon(-5% 0%, 0% 0%, 100% 100%, 100% 105%, -5% 105%)",
      "polygon(100% 30%, 30% 100%, 100% 100%)",
    ],
  }

  return (
    <Box
      gridRow="1"
      position="relative"
      overflow="hidden"
      alignSelf="flex-start"
      __css={styles.sectorCardImage}
      {...restProps}
    >
      <AspectRatio as="figure" ratio={ratio} bg={bg}>
        <Box as="picture">
          <img
            src={src2}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </AspectRatio>
      <Box position="absolute" left={0} right={0} bottom={0} display="grid">
        <Box
          gridColumn="1 / -1"
          gridRow="1"
          style={{
            clipPath: paths[variant][1],
            transformOrigin: variant === "rtl" ? "bottom right" : "bottom left",
          }}
          bg="rgba(255,255,255,0.3)"
          backdropFilter="blur(4px)"
          className="sector-image-overlay"
        />
        <Box
          gridColumn="1 / -1"
          gridRow="1"
          bg={bg}
          style={{ clipPath: paths[variant][0] }}
        />
      </Box>
    </Box>
  )
}

export function SectorCardContent({ children, spacing = 8, ...restProps }) {
  const styles = useStyles()
  return (
    <Box
      gridRow={["2", null, null, "1"]}
      bg="white"
      __css={styles.sectorCardContent}
      {...restProps}
    >
      <Stack spacing={spacing} alignItems="flex-start">
        {children}
      </Stack>
    </Box>
  )
}

export function SectorCardGrid({ color, ...restProps }) {
  const styles = useStyles()
  return (
    <Box __css={styles.sectorCardGrid} color={color}>
      <DotGrid
        tileSize={160}
        xTiles={4}
        yTiles={2}
        dotFill="currentcolor"
        style={{ width: "100%", height: "auto" }}
        {...restProps}
      />
    </Box>
  )
}

export function SectorCardIcon({ borderColor, ...restProps }) {
  const styles = useStyles()
  const { colors } = useTheme()
  return (
    <Box
      __css={styles.sectorCardIcon}
      style={{ borderColor: borderColor || colors.gray[300] }}
    >
      <AspectRatio ratio={1}>
        <Box {...restProps} />
      </AspectRatio>
    </Box>
  )
}

export function SectorCardHeading({
  children,
  as = "h2",
  variant = "sectorCardHeading",
  ...restProps
}) {
  const styles = useStyles()
  return (
    <Heading as={as} variant={variant} {...restProps}>
      {styles.href ? (
        <LinkOverlay href={styles.href}>{children}</LinkOverlay>
      ) : (
        children
      )}
    </Heading>
  )
}

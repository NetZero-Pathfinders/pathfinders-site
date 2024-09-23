import {
  Box,
  Stack,
  SimpleGrid,
  AspectRatio,
  Heading,
  Text,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Link"
import { ArrowRightIcon, DownloadIcon } from "@/components/Icon"

export function ReportCardSm({
  title = "Scaling Technologies for Greening Heavy Industry",
  href = "",
  downloadUrl = "",
  cover = "https://assets.bbhub.io/image/v1/resize?width=auto&type=webp&url=https://assets.bbhub.io/image/v1/resize?width=auto&type=webp&url=https://assets.bbhub.io/company/sites/62/2023/11/Scaling-Technologies-for-Greening-Heavy-Industry_Nov17_OL-724x1024.jpg",
  ...props
}) {
  return (
    <Stack spacing={6} {...props}>
      <AspectRatio
        gridColumn={["span 2", null, "span 2"]}
        ratio={210 / 297}
        borderColor="gray.200"
        borderWidth="0.0625rem"
      >
        <Box as="picture">
          <img
            src={`/images/${cover}`}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </Box>
      </AspectRatio>
      <Stack spacing={3}>
        {href && (
          <ButtonLink
            href={href}
            size="xl"
            justifyContent="space-between"
            rightIcon={<ArrowRightIcon size="2rem" strokeWidth={2.5} />}
          >
            {"Learn more"}
          </ButtonLink>
        )}
        {downloadUrl && (
          <ButtonLink
            href={downloadUrl}
            size="xl"
            justifyContent="space-between"
            rightIcon={<DownloadIcon size="2rem" strokeWidth={2.5} />}
          >
            {"Download report"}
          </ButtonLink>
        )}
      </Stack>
    </Stack>
  )
}

export function ReportCardLg({
  title = "Scaling Technologies for Greening Heavy Industry",
  description = "The NetZero Pathfinders Report: Scaling Technologies for Greening Heavy Industry assesses some of the most promising policy solutions to scale up the technologies needed to decarbonize the hard-to-abate industrial sectors.",
  href = "",
  downloadUrl = "",
  cover = "https://assets.bbhub.io/image/v1/resize?width=auto&type=webp&url=https://assets.bbhub.io/image/v1/resize?width=auto&type=webp&url=https://assets.bbhub.io/company/sites/62/2023/11/Scaling-Technologies-for-Greening-Heavy-Industry_Nov17_OL-724x1024.jpg",
  ...props
}) {
  return (
    <SimpleGrid columns={[4, null, null, 8]} spacing={6} {...props}>
      <Stack
        gridColumn={["span 4", null, "1 / span 4", null, "1 / span 4"]}
        alignItems="flex-start"
        spacing={12}
      >
        <Stack spacing={5}>
          <Heading as="h2" variant="cardTitle">
            {title}
          </Heading>
          <Text variant="sectionSubheading">{description}</Text>
        </Stack>

        <Stack
          direction={["column", null, null, "row"]}
          spacing={5}
          width={["100%", null, null, "auto"]}
        >
          {downloadUrl && (
            <ButtonLink
              href={downloadUrl}
              size="xl"
              justifyContent="space-between"
              rightIcon={<DownloadIcon size="2rem" strokeWidth={2.5} />}
            >
              {"Download report"}
            </ButtonLink>
          )}
          {href && (
            <ButtonLink
              href={href}
              size="xl"
              justifyContent="space-between"
              rightIcon={
                <ArrowRightIcon
                  size="2rem"
                  strokeWidth={2.5}
                  isAnimated="right"
                />
              }
            >
              {"Learn more"}
            </ButtonLink>
          )}
        </Stack>
      </Stack>
      <AspectRatio
        gridColumn={["span 4", null, "7 / -1"]}
        ratio={210 / 297}
        borderColor="gray.200"
        borderWidth="0.0625rem"
        order="1"
      >
        <Box as="picture">
          <img
            src={`/images/${cover}`}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </Box>
      </AspectRatio>
    </SimpleGrid>
  )
}

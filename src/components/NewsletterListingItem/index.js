import { Stack, HStack, Heading, Text } from "@chakra-ui/react"
import dayjs from "dayjs"

import { DownloadLink } from "@/components/Link"
import { DownloadIcon } from "@/components/Icon"

export default function NewsletterListingItem({ title, visibleDate, pdf }) {
  const fixedDate = `${visibleDate}`.trim() || ""
  const dateComplexity = fixedDate.split("-")?.length || 1
  const dateFormats = { "1": "YYYY", "2": "MMMM YYYY", "3": "DD MMMM YYYY" }
  return (
    <HStack
      gap={[3, null, 5]}
      justifyContent="space-between"
      py={[4, null, 6]}
      borderBottom="0.0625rem solid"
      borderColor="gray.200"
      flexDirection={["column", null, "row"]}
      alignItems={["flex-start", null, "flex-end"]}
    >
      <Stack gap={[1, null, 3]}>
        {fixedDate ? (
          <Text
            fontSize="md"
            color="gray.500"
            fontWeight={500}
            pr={[0, null, 16]}
          >
            {dayjs(fixedDate).format(dateFormats[dateComplexity])}
          </Text>
        ) : null}
        <Heading as="h3" fontSize={["xl", null, "2xl", "3xl"]}>
          {title}
        </Heading>
      </Stack>
      <DownloadLink
        href={`/pdfs/${pdf}`}
        download={title}
        leftIcon={<DownloadIcon />}
        flex="none"
      >
        {"Download pdf"}
      </DownloadLink>
    </HStack>
  )
}

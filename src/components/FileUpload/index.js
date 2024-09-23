import React from "react"
import { Box, Center, Stack } from "@chakra-ui/react"

import { readFiles } from "@/utils/filereader"
import { UploadIcon } from "@/components/Icon"

const defaultAcceptedFormats = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  ".csv",
]

export default function FileUpload({
  label,
  acceptedFormats = defaultAcceptedFormats,
  onUpload,
}) {
  const accept = acceptedFormats.join(",")

  const handleChange = async (e) => {
    const files = e.target.files || []
    const allContent = await readFiles({ files })
    if (onUpload) onUpload(allContent)
  }

  return (
    <Box
      as="label"
      w="100%"
      display="block"
      border="0.125rem dashed"
      borderColor="gray.300"
      borderRadius={0}
      position="relative"
      bg="gray.50"
      sx={{
        "input[type='file']": {
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          cursor: "pointer",
          ":hover + div": {
            bg: "gray.100",
          },
          ":focus-visible + div": {
            outline: "0.125rem solid #000",
            outlineOffset: "0.25rem",
            bg: "gray.100",
          },
          ":active + div": {
            bg: "gray.200",
          },
        },
      }}
    >
      <input
        type="file"
        id="file"
        name="file"
        multiple
        accept={accept}
        onChange={handleChange}
      />
      <Center pointerEvents="none">
        <Stack spacing={1} alignItems="center" py={10}>
          <Box w="1.5rem" h="1.5rem" color="gray.500">
            <UploadIcon size="1.5rem" />
          </Box>
          <Box
            color="gray.500"
            fontWeight={500}
            lineHeight="shorter"
            textAlign="center"
            px={5}
          >
            {label || "Upload data"}
          </Box>
        </Stack>
      </Center>
    </Box>
  )
}

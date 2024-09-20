import { Box } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"

import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"

export default function SamplePage({ bestPractices, source }) {
  console.log(bestPractices, source)
  return (
    <Box>
      <MDXRemote {...source} />
    </Box>
  )
}

export async function getStaticProps() {
  const bestPractices = await getPages({
    pageType: "best-practices",
    fields: ["slug"],
  })
  const source = await getPage({
    slug: bestPractices[0].slug,
    pageType: "best-practices",
  })
  return { props: { bestPractices, source } }
}

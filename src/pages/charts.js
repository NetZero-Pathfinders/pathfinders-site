import { Container, SimpleGrid, Box } from "@chakra-ui/react"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

import getPages from "@/utils/api/server/getPages"

import bestPracticeComponents from "@/components/MDXComponents/bestPracticeComponents"

export default function Charts({ charts, source }) {
  return (
    <Container>
      <Box py={40} px={6}>
        <SimpleGrid
          columns={8}
          gridColumn="1 / -1"
          gridRow="1 / span 1"
          spacing={6}
        >
          <MDXRemote {...source} components={bestPracticeComponents} />
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export const getStaticProps = async () => {
  const bestPractices = await getPages({ pageType: "best-practices" })
  const charts = bestPractices
    .map((d) => d.content.match(/\<.+?Chart.+?\/\>/g))
    .filter((d) => !!d)
    .map((d) => d.join("\n\n"))
    .join("\n\n")
  const source = await serialize(`# Charts\n\n${charts}`)
  return { props: { charts, source } }
}

import { MDXRemote } from "next-mdx-remote"
import {
  Heading,
  Text,
  Box,
  Stack,
  SimpleGrid,
  Wrap,
  WrapItem,
  Container,
  Divider,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react"
import { basename } from "path"

import getNavigation from "@/utils/api/server/getNavigation"
import getPages from "@/utils/api/server/getPages"
import getPage from "@/utils/api/server/getPage"
import SEO from "@/components/SEO"
import bestPracticeComponents from "@/components/MDXComponents/bestPracticeComponents"
import DotGrid from "@/components/DotGrid"
import {
  PageHeader,
  PageHeaderSubnavigation,
  PageHeaderBackLink,
  PageHeaderShareButton,
} from "@/components/PageHeader"
import { Link } from "@/components/Link"
import day from "dayjs"

import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  // SectionHeaderSubtitle,
  // SectionHeaderLinks,
  Section,
  SectionBody,
} from "@/components/Section"
import { useStore } from "@/components/BestPracticeListing"
import { BestPracticeListingItem } from "@/components/BestPracticeListing"

const layoutSections = [
  {
    key: "copyright",
    title: "Copyright",
    content: [
      "© Bloomberg Finance L.P. 2021. This publication is the copyright of Bloomberg Finance L.P. in connection with BloombergNEF. No portion of this document may be photocopied, reproduced, scanned into an electronic system or transmitted, forwarded or distributed in any way without prior consent of BloombergNEF.",
    ],
  },
  {
    key: "disclaimer",
    title: "Disclaimer",
    content: [
      "The BloombergNEF (“BNEF”), service/information is derived from selected public sources. Bloomberg Finance L.P. and its affiliates, in providing the service/information, believe that the information it uses comes from reliable sources, but do not guarantee the accuracy or completeness of this information, which is subject to change without notice, and nothing in this document shall be construed as such a guarantee. The statements in this service/document reflect the current judgment of the authors of the relevant articles or features, and do not necessarily reflect the opinion of Bloomberg Finance L.P., Bloomberg L.P. or any of their affiliates (“Bloomberg”). Bloomberg disclaims any liability arising from use of this document, its contents and/or this service. Nothing herein shall constitute or be construed as an offering of financial instruments or as investment advice or recommendations by Bloomberg of an investment or other strategy (e.g., whether or not to “buy”, “sell”, or “hold” an investment). The information available through this service is not based on consideration of a subscriber’s individual circumstances and should not be considered as information sufficient upon which to base an investment decision. You should determine on your own whether you agree with the content. This service should not be construed as tax or accounting advice or as a service designed to facilitate any subscriber’s compliance with its tax, accounting or other legal obligations. Employees involved in this service may hold positions in the companies mentioned in the services/information.",
      "The data included in these materials are for illustrative purposes only. The BLOOMBERG TERMINAL service and Bloomberg data products (the “Services”) are owned and distributed by Bloomberg Finance L.P. (“BFLP”) except (i) in Argentina, Australia and certain jurisdictions in the Pacific islands, Bermuda, China, India, Japan, Korea and New Zealand, where Bloomberg L.P. and its subsidiaries (“BLP”) distribute these products, and (ii) in Singapore and the jurisdictions serviced by Bloomberg’s Singapore office, where a subsidiary of BFLP distributes these products. BLP provides BFLP and its subsidiaries with global marketing and operational support and service. Certain features, functions, products and services are available only to sophisticated investors and only where permitted. BFLP, BLP and their affiliates do not guarantee the accuracy of prices or other information in the Services. Nothing in the Services shall constitute or be construed as an offering of financial instruments by BFLP, BLP or their affiliates, or as investment advice or recommendations by BFLP, BLP or their affiliates of an investment strategy or whether or not to “buy”, “sell” or “hold” an investment. Information available via the Services should not be considered as information sufficient upon which to base an investment decision. The following are trademarks and service marks of BFLP, a Delaware limited partnership, or its subsidiaries: BLOOMBERG, BLOOMBERG ANYWHERE, BLOOMBERG MARKETS, BLOOMBERG NEWS, BLOOMBERG PROFESSIONAL, BLOOMBERG TERMINAL and BLOOMBERG.COM. Absence of any trademark or service mark from this list does not waive Bloomberg’s intellectual property rights in that name, mark or logo. All rights reserved. © 2020 Bloomberg. © Bloomberg Finance L.P.2021",
      "No portion of this document may be reproduced, scanned into an electronic system, distributed, publicly displayed or used as the basis of derivative works without the prior written consent of Bloomberg Finance L.P. For more information on terms of use, please contact sales.bnef@bloomberg.net. Copyright and Disclaimer notice on page 5 applies throughout.",
    ],
  },
]

export default function BestPracticePage({ source }) {
  const { frontmatter } = source
  const tags = frontmatter.tags || []

  // const authors = frontmatter?.author || []

  const searchTerms = useStore((state) => state.searchTerms)

  const backLink = searchTerms.length
    ? `/best-practices?filters=${encodeURIComponent(searchTerms.join(","))}`
    : `/best-practices`

  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <Stack as="main" spacing={12} pb={24}>
        <PageHeader bg="white" color="black" pb={12}>
          <PageHeaderSubnavigation borderTopColor="gray.200">
            <PageHeaderBackLink href={backLink}>
              {"All best practices"}
            </PageHeaderBackLink>
            <PageHeaderShareButton />
          </PageHeaderSubnavigation>
          <Stack
            gridColumn={["1 / -1", null, "1 / -2", "1 / -3", "2 / -3"]}
            spacing={6}
          >
            <Heading
              as="h1"
              fontSize={["3xl", "4xl", "5xl", "6xl"]}
              lineHeight="shorter"
            >
              {frontmatter.title}
            </Heading>
            {frontmatter.description && (
              <Text fontSize="2xl" color="gray.500">
                {frontmatter.description}
              </Text>
            )}
            <HStack spacing={3}>
              {/* <HStack
                spacing={0}
                divider={
                  <Box border="none" fontSize="lg" fontWeight={600}>
                    {","}&nbsp;
                  </Box>
                }
              >
                {authors.map((author) => {
                  return (
                    <Text
                      key={author.name}
                      fontSize="lg"
                      fontWeight={600}
                      color="gray.500"
                    >
                      <Text as="span" color="black" fontWeight={600}>
                        {author.name}
                      </Text>
                      {author.organization && (
                        <>
                          {" at "}
                          <Text as="span" color="blue.500" fontWeight={600}>
                            {author.organization}
                          </Text>
                        </>
                      )}
                    </Text>
                  )
                })}
              </HStack> */}
              {/* <Box fontWeight={600} h={5} w={0.5} bg="gray.500" /> */}
              {frontmatter.date && (
                <Text fontSize="lg" fontWeight={600} color="blue.500">
                  {`Updated on ${day(frontmatter.date).format(
                    "MMMM DD, YYYY"
                  )}`}
                </Text>
              )}
            </HStack>
            <Wrap>
              {tags.map((d) => {
                return (
                  <WrapItem key={d}>
                    <Link
                      href={`/best-practices?filters=${encodeURIComponent(d)}`}
                      fontSize="lg"
                      lineHeight="shorter"
                      fontWeight={600}
                      color="gray.500"
                      bg="gray.100"
                      px={2}
                      py={0.5}
                      cursor="pointer"
                      _hover={{ color: "blue.500" }}
                      _active={{ bg: "gray.200" }}
                      _focusVisible={{
                        color: "blue.500",
                        outline: "0.125rem solid",
                        outlineColor: "blue.500",
                        outlineOffset: "0.125rem",
                      }}
                    >
                      {d}
                    </Link>
                  </WrapItem>
                )
              })}
            </Wrap>
          </Stack>
          <Box
            gridColumn="-3 / -1"
            color="gray.400"
            display={["none", null, null, "block"]}
          >
            <DotGrid xTiles={3} yTiles={2} />
          </Box>
        </PageHeader>

        <Container>
          <Box px={5}>
            <Divider />
          </Box>
        </Container>

        <Container>
          <SimpleGrid
            columns={8}
            spacing={6}
            px={5}
            position="relative"
            pb={20}
          >
            {/* <Box
              gridColumn="-2 / -1"
              gridRow="1 / span 1"
              zIndex={999}
              position="relative"
            >
              <Stack position="sticky" top={6} spacing={3}>
                <Text>{"Overview"}</Text>
                <Text>{"Impact"}</Text>
                <Text>{"Opportunity"}</Text>
              </Stack>
            </Box> */}
            <SimpleGrid
              columns={8}
              gridColumn="1 / -1"
              gridRow="1 / span 1"
              spacing={6}
            >
              <MDXRemote {...source} components={bestPracticeComponents} />
              <Box gridColumn="2 / -3">
                <Accordion allowMultiple>
                  {layoutSections.map((d) => {
                    return (
                      <AccordionItem key={d.key}>
                        <AccordionButton
                          fontWeight={700}
                          fontSize="3xl"
                          lineHeight="shorter"
                          letterSpacing="-0.015em"
                          textAlign="left"
                          px={0}
                          py={6}
                        >
                          <Box flex={1}>{d.title}</Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel px={0} pt={0} pb={6}>
                          <Stack spacing={6}>
                            {d.content.map((dd, i) => {
                              return (
                                <Text key={i} fontSize="lg">
                                  {dd}
                                </Text>
                              )
                            })}
                          </Stack>
                        </AccordionPanel>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </Box>
            </SimpleGrid>
          </SimpleGrid>
        </Container>

        <Container>
          <Box px={5}>
            <Divider />
          </Box>
        </Container>

        <Section>
          <SectionHeader>
            <SectionHeaderContent>
              <SectionHeaderTitle>{"Related Best Practice"}</SectionHeaderTitle>
            </SectionHeaderContent>
          </SectionHeader>
          <SectionBody>
            <Stack spacing={3}>
              {frontmatter.related.slice(0, 1).map((d) => {
                return <BestPracticeListingItem key={d.slug} {...d} />
              })}
            </Stack>
          </SectionBody>
        </Section>
      </Stack>
    </>
  )
}

export async function getStaticProps({ params }) {
  const navigation = await getNavigation()
  const { slug } = params
  const source = await getPage({ slug, pageType: "best-practices" })
  return { props: { source, navigation } }
}

export async function getStaticPaths() {
  const pages = await getPages({ pageType: "best-practices" })
  return {
    paths: pages.map((page) => ({
      params: { slug: basename(page.slug) },
    })),
    fallback: false,
  }
}

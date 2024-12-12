import { SimpleGrid } from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"

import { ArrowRightIcon } from "@/components/Icon"
import { ButtonLink } from "@/components/Link"
import {
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionHeaderSubtitle,
  SectionHeaderLinks,
  Section,
  SectionBody,
} from "@/components/Section"
import { BestPracticeListingItem } from "@/components/BestPracticeListing"

export default function LatestBestPractices({
  title = "Latest best practices",
  description = "In the race to reduce carbon emissions, regional, national and international policymakers don’t have time to wait",
  bestPractices,
}) {
  return (
    <Section spacing={16} py={12}>
      <SectionHeader>
        <SectionHeaderContent>
          <SectionHeaderTitle>{title}</SectionHeaderTitle>
          <SectionHeaderSubtitle>{description}</SectionHeaderSubtitle>
        </SectionHeaderContent>
        <SectionHeaderLinks>
          <ButtonLink
            href="/best-practices"
            size="2xl"
            variant="ghostLink"
            rightIcon={
              <ArrowRightIcon
                size="2rem"
                strokeWidth={2.5}
                isAnimated="right"
              />
            }
          >
            {"All best practices"}
          </ButtonLink>
        </SectionHeaderLinks>
      </SectionHeader>
      <SectionBody>
        <SimpleGrid columns={[1, null, null, null, 2]} spacing={6}>
          {bestPractices.map((bestPractice) => {
            return (
              <BestPracticeListingItem
                key={bestPractice.slug}
                slug={bestPractice.slug}
                title={bestPractice.title}
                date={bestPractice.date}
              />
            )
          })}
        </SimpleGrid>
      </SectionBody>
    </Section>
  )
}

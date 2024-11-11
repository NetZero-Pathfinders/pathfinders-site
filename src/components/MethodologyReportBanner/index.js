import { Heading } from "@chakra-ui/react"

import {
  Banner,
  BannerHeader,
  BannerBody,
  BannerGrid,
} from "@/components/Banner"

import { ButtonLink } from "@/components/Link"
import { DownloadIcon } from "@/components/Icon"

export default function MethodologyReportBanner() {
  return (
    <Banner
      borderBottom="none"
      bg="black"
      bgImage="/images/banner.jpg"
      color="white"
      py={0}
    >
      <BannerHeader borderColor="transparent">
        <Heading fontSize={["3xl", null, "4xl", "5xl"]} fontWeight={600}>
          {"For more detailed information, "} <br />{" "}
          {"explore Delivering Net Zero: A Framework for Policymakers."}
        </Heading>
      </BannerHeader>
      <BannerGrid />
      <BannerBody py={6}>
        <ButtonLink
          href="https://www.netzeropathfinders.com/downloads/Netzero%20Pathfinders%20Delivering%20Net%20Zero%20-%20A%20Framework%20for%20Policymakers.pdf"
          target="blank"
          rel="noopener noreferrer"
          size="2xl"
          color="white"
          bg="whiteAlpha.300"
          _hover={{ bg: "whiteAlpha.400" }}
          _focusVisible={{
            bg: "whiteAlpha.400",
            outline: "0.125rem solid",
            outlineOffset: "0.125rem",
          }}
          _active={{ bg: "whiteAlpha.500" }}
          rightIcon={<DownloadIcon size="2rem" strokeWidth={2.5} />}
        >
          {"Download report"}
        </ButtonLink>
      </BannerBody>
    </Banner>
  )
}

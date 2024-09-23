import { useRouter } from "next/router"

import { ButtonLink } from "@/components/Link"

const siteUrl = "https://www.netzeropathfinders.com/"

const ShareButton = ({
  children,
  colorScheme = "gray",
  platformName = "twitter",
}) => {
  const router = useRouter()
  const shareLinks = getShareLinks(router.asPath)
  const shareUrl = shareLinks[platformName]
  return (
    <ButtonLink
      w="3rem"
      h="3rem"
      px={0}
      borderRadius="full"
      variant="ghost"
      _hover={{ color: `${platformName}.500`, bg: "gray.50" }}
      _focus={{ color: `${platformName}.500`, bg: "gray.50" }}
      _active={{ color: `${platformName}.500`, bg: "gray.50" }}
      href={shareUrl}
      colorScheme={colorScheme}
    >
      {children}
    </ButtonLink>
  )
}

export function useShareButton(opts) {
  const { platform } = opts || {}
  const router = useRouter()
  const shareLinks = getShareLinks(router.asPath)
  return platform ? shareLinks[platform] || "" : shareLinks
}

function getShareUrl(siteUrl, asPath) {
  const [a, b] = siteUrl.split("//")
  return `${a}//${b
    .split("/")
    .filter((d) => d)
    .join("/")}${asPath}`
}

function getShareLinks(asPath) {
  const twitterRoot = "http://twitter.com/intent/tweet"
  const facebookRoot = "http://facebook.com/sharer/sharer.php"
  const linkedinRoot = "http://linkedin.com/shareArticle"

  const shareUrl = getShareUrl(siteUrl, asPath)

  const twitterShareText = `A collection of best practices that illustrate effective policies to help solve critical climate challenges curated by @BloombergNEF`
  const facebookShareText = `${shareUrl}`
  const emailSubject = `NetZero Pathfinders`
  const emailBody = `${shareUrl}`

  const encodedTwitterShareText = encodeURIComponent(twitterShareText)
  const encodedFacebookShareText = encodeURIComponent(facebookShareText)

  const twitterShareUrl = `${twitterRoot}?url=${shareUrl}&text=${encodedTwitterShareText}&original_referer=${shareUrl}`
  const facebookShareUrl = `${facebookRoot}?u=${shareUrl}&text=${encodedFacebookShareText}&original_referer=${shareUrl}`
  const linkedinShareUrl = `${linkedinRoot}?url=${shareUrl}`
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    emailSubject
  )}&body=${emailBody}`

  return {
    twitter: twitterShareUrl,
    facebook: facebookShareUrl,
    linkedin: linkedinShareUrl,
    email: emailShareUrl,
  }
}

export default ShareButton

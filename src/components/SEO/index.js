import Head from "next/head"
import { useRouter } from "next/router"

const siteUrl = "https://www.netzeropathfinders.com/"

const SEO = ({
  title = "",
  description = "Delivering Net Zero - A Framework for Policymakers",
  cover = "social-cover.jpg",
  type = "website",
  lang = "en-US",
}) => {
  const { basePath, asPath } = useRouter()

  const fixedCover = cover

  const slugUrl =
    siteUrl + basePath + (asPath[0] === "/" ? asPath.slice(1) : asPath)
  const coverImg = fixedCover ? siteUrl + basePath + "images/" + fixedCover : ""

  const combinedTitle = title
    ? `NetZero Pathfinders | ${title}`
    : `NetZero Pathfinders`

  return (
    <Head>
      <meta content={lang} httpEquiv="Content-Language" />

      <title>{combinedTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={slugUrl} />
      <meta property="og:title" content={combinedTitle} />
      <meta property="og:description" content={description} />
      {cover && <meta name="image" property="og:image" content={coverImg} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={slugUrl} />
      <meta name="twitter:title" content={combinedTitle} />
      <meta name="twitter:description" content={description} />
      {cover && <meta name="twitter:image" content={coverImg} />}

      <link rel="canonical" href={slugUrl} />
    </Head>
  )
}

export default SEO

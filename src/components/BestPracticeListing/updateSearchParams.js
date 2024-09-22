import _groupBy from "lodash/groupBy"

export default function updateSearchParams(
  searchTerms,
  router,
  pathname,
  searchParams
) {
  const params = new URLSearchParams(searchParams?.toString() || "")
  const searchTermsStr = searchTerms.join(",")
  const hasSearchTerms = searchTermsStr.length
  params.set("filters", searchTermsStr)
  const finalUrl = hasSearchTerms
    ? `${pathname}?${params.toString()}`
    : pathname
  router.replace(finalUrl, {
    shallow: true,
    scroll: false,
  })
}

import _groupBy from "lodash/groupBy"
import { matchSorter } from "match-sorter"

export default function recursiveSearch(
  items = [],
  searchTerms = [],
  searchConfig = {}
) {
  const options = {
    keys: [
      "title",
      "description",
      "categories",
      "policyLevel",
      "regions",
      "sectors",
      "stakeholders",
      "tags",
    ],
    ...searchConfig,
  }
  const cleanSearchTerms = searchTerms.filter((d) => d.trim())

  if (!cleanSearchTerms.length) return items
  return cleanSearchTerms.reduce((acc, cur, i) => {
    if (!i) acc = items
    return matchSorter(acc, cur, options)
  }, [])
}

import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"

export default function groupResults(inputValue, results) {
  const links = {
    "best-practice": "/best-practices",
  }

  const preGrouped = _groupBy(results, (o) => o.type)
  const entries = Object.entries(preGrouped)

  // Only sort by group to prioritise best practices, if
  // there is no input value. Otherwise use the sorting
  // from matchsorter...
  const sortedEntries = inputValue ? entries : _sortBy(entries, (o) => o[0])

  const groupedResults = results.length
    ? sortedEntries.flatMap(([label, items], i) => {
        return [
          {
            key: `group-start-${i}`,
            href: links[label] || "/search",
            label,
            type: "group-start",
          },
          ...items.slice(0, 4),
        ]
      })
    : [
        // {
        //   key: 0,
        //   label: "Something",
        //   href: "/sample",
        //   type: "best-practice",
        // },
      ]

  return [
    ...groupedResults,
    {
      key: "Final",
      href: `/search?q=${encodeURIComponent(inputValue)}`,
      label: "See all results",
      type: "group-end",
    },
  ]
}

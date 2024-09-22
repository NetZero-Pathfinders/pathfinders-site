import { useState, useEffect } from "react"
import { useCombobox } from "downshift"
import { matchSorter } from "match-sorter"
import { useRouter } from "next/navigation"
import _groupBy from "lodash/groupBy"
import _sortBy from "lodash/sortBy"

import fetchDataset from "@/utils/api/client/fetchDataset"
import groupResults from "./groupResults"

export default function useQuickSearch({
  customOptions = {},
  searchIndex = "lite",
}) {
  const [referenceItems, setReferenceItems] = useState([])
  const [inputItems, setInputItems] = useState([])

  const router = useRouter()

  function stateReducer(state, actionAndChanges) {
    const { type, changes, inputValue } = actionAndChanges
    const hasSelectedItem = !!changes.selectedItem

    switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        if (hasSelectedItem) router.push(changes.selectedItem.href || "/")
        else router.push(`/search?q=${encodeURIComponent(state.inputValue)}`)

        // Reset changes
        changes.inputValue = inputValue
        changes.selectedItem = null

        return changes
      case useCombobox.stateChangeTypes.ItemClick:
        router.push(changes.selectedItem.href || "/")

        // Reset changes
        changes.inputValue = inputValue
        changes.selectedItem = null

        return changes
      default:
        return changes // otherwise business as usual.
    }
  }

  const {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    // getLabelProps,
    getMenuProps,
    getInputProps,
    // getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (d) => d.label,
    stateReducer,
    onInputValueChange: ({ inputValue }) => {
      const results = matchSorter(referenceItems, inputValue, {
        keys: ["label", "type", "content"],
        threshold: matchSorter.rankings.CONTAINS,
      })
      const groupedItems = groupResults(inputValue, results)
      setInputItems(groupedItems)
    },
    ...customOptions,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const searchIndices = {
      lite: "/data/search-index-lite.txt",
      full: "/data/search-index-full.txt",
    }

    const searchIndexUrl = searchIndices[searchIndex] || searchIndices.lite

    Promise.all([
      fetchDataset(searchIndexUrl, "json"),
      fetchDataset(`/data/sectors/all.txt`, "json"),
      fetchDataset(`/data/stakeholders/all.txt`, "json"),
      fetchDataset(`/data/pillars/all.txt`, "json"),
      // fetch(searchIndexUrl).then((res) => res.json()),
      // fetch(`/data/sectors/all.json`).then((res) => res.json()),
      // fetch(`/data/stakeholders/all.json`).then((res) => res.json()),
      // fetch(`/data/pillars/all.json`).then((res) => res.json()),
    ]).then(
      ([bestPracticesIndex, sectorsIndex, stakeholdersIndex, pillarsIndex]) => {
        const correctedSearchIndex = [
          ...bestPracticesIndex.map((d) => ({
            label: d.title,
            href: `/best-practices/${d.name.split(".")[0]}`,
            type: "best-practice",
            content: d.content || "",
          })),
          ...sectorsIndex.map((d) => ({
            label: d.title,
            href: `/sectors/${d.title
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-")}`,
            type: "sector",
            content: "",
          })),
          ...stakeholdersIndex.map((d) => ({
            label: d.title,
            href: `/stakeholders/${d.title
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-")}`,
            type: "stakeholder",
            content: "",
          })),
          ...pillarsIndex.map((d) => ({
            label: d.title,
            href: `/pillars/pillar-${d.key}`,
            type: "pillar",
            content: "",
          })),
        ].map((d, i) => ({ key: i + 1, ...d }))

        setReferenceItems(correctedSearchIndex)
        setInputItems(correctedSearchIndex)

        const results = matchSorter(correctedSearchIndex, "", {
          keys: ["label", "type", "content"],
          threshold: matchSorter.rankings.CONTAINS,
        })

        const groupedItems = groupResults("", results)
        setInputItems(groupedItems)
      }
    )
  }, [searchIndex])

  return {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputItems,
    setInputItems,
    referenceItems,
    setReferenceItems,
    searchIndex,
  }
}

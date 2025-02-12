import { useState, useEffect, useRef } from "react"
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
  const isFetching = useRef(false)

  const referenceItemsCount = referenceItems.length

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
    if (typeof window === "undefined") return undefined
    if (referenceItemsCount > 0) return undefined
    if (!!isFetching.current) return undefined

    const searchIndices = {
      lite: "/data/search-index-lite.txt",
      full: "/data/search-index-full.txt",
    }

    const searchIndexUrl = searchIndices[searchIndex] || searchIndices.lite

    isFetching.current = true

    Promise.all([
      fetchDataset(searchIndexUrl, "json"),
      fetchDataset(`/data/sectors/all.txt`, "json"),
      fetchDataset(`/data/stakeholders/all.txt`, "json"),
      fetchDataset(`/data/pillars/all.txt`, "json"),
    ]).then(
      ([bestPracticesIndex, sectorsIndex, stakeholdersIndex, pillarsIndex]) => {
        isFetching.current = false
        const correctedSearchIndex = [
          ...(bestPracticesIndex?.map((d) => ({
            label: d.title,
            href: d.slug,
            type: "best-practice",
            content: d.content || "",
          })) || []),
          ...(sectorsIndex?.map((d) => ({
            label: d.title,
            href: d.slug,
            type: "sector",
            content: "",
          })) || []),
          ...(stakeholdersIndex?.map((d) => ({
            label: d.title,
            href: d.slug,
            type: "stakeholder",
            content: "",
          })) || []),
          ...(pillarsIndex?.map((d) => ({
            label: d.title,
            href: d.slug,
            type: "pillar",
            content: "",
          })) || []),
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
  }, [searchIndex, referenceItemsCount])

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

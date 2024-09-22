import { create } from "zustand"
import uniq from "lodash/uniq"
import _sortBy from "lodash/sortBy"
import _groupBy from "lodash/groupBy"

import {
  recursiveSearch,
  updateSearchParams,
} from "@/components/BestPracticeListing"

export const useStore = create((set, get) => ({
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),

  sidebarVisible: true,
  setSidebarVisible: (sidebarVisible) => set({ sidebarVisible }),
  toggleSidebar: () => {
    set((state) => {
      return { sidebarVisible: !state.sidebarVisible }
    })
  },

  searchIndex: [],
  setSearchIndex: (searchIndex) =>
    set((state) => {
      const params = new URLSearchParams(window.location.search.slice(1))
      const initialSearchTerms =
        params
          .get("filters")
          ?.split(",")
          ?.map((d) => d.trim()) || []
      const filteredItems = state.searchTerms.length
        ? recursiveSearch(searchIndex, state.searchTerms)
        : initialSearchTerms.length
        ? recursiveSearch(searchIndex, initialSearchTerms)
        : searchIndex
      return {
        searchTerms: initialSearchTerms,
        searchIndex,
        filteredItems,
        sorting: "relevance",
      }
    }),

  filteredItems: [],
  setFilteredItems: (filteredItems) =>
    set({ filteredItems, sorting: "relevance" }),

  searchTerms: [],
  setSearchTerms: (searchTerms) => {
    const searchIndex = get().searchIndex
    const filteredItems = recursiveSearch(searchIndex, searchTerms)
    set({ searchTerms, filteredItems, sorting: "relevance" })
  },

  addSearchTerm: (searchTerm, router, pathname, searchParams) => {
    if (!searchTerm) return
    const searchTerms = uniq([...get().searchTerms, searchTerm])
    const searchIndex = get().searchIndex
    const filteredItems = recursiveSearch(searchIndex, searchTerms)
    updateSearchParams(searchTerms, router, pathname, searchParams)
    set({ searchValue: "", searchTerms, filteredItems, sorting: "relevance" })
  },

  removeSearchTerm: (searchTerm, router, pathname, searchParams) => {
    if (!searchTerm) return
    const searchTerms = get().searchTerms.filter(
      (d) => d.toLowerCase() !== searchTerm.toLowerCase()
    )
    const searchIndex = get().searchIndex
    updateSearchParams(searchTerms, router, pathname, searchParams)
    set({
      sorting: "relevance",
      searchValue: "",
      searchTerms,
      filteredItems: !searchTerms.length
        ? searchIndex
        : recursiveSearch(searchIndex, searchTerms),
    })
  },

  sorting: "relevance",
  updateSorting: (sorting) => {
    set((state) => {
      switch (sorting) {
        case "relevance":
          return {
            sorting,
            filteredItems: recursiveSearch(
              state.searchIndex,
              state.searchTerms
            ),
          }
        case "latest":
          return {
            sorting,
            filteredItems: _sortBy(
              state.filteredItems,
              (o) => -parseInt(o.date.split("-").join(""))
            ),
          }
        default:
          return { sorting }
      }
    })
  },
}))

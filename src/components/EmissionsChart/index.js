import { useState, useEffect, useMemo } from "react"
import {
  Box,
  Stack,
  HStack,
  Text,
  useTheme,
  Input,
  Select,
} from "@chakra-ui/react"
import _sortBy from "lodash/sortBy"
import { motion, AnimatePresence } from "framer-motion"

import fetchDataset from "@/utils/api/client/fetchDataset"

export default function EmissionsChart() {
  const [sortByValue, setSortByValue] = useState("")
  const [markets, setMarkets] = useState("")
  const [sectors, setSectors] = useState("")

  const sortingOptions = [
    { value: "", label: "None" },
    { value: "alphabetic", label: "Alphabetic (asc)" },
    { value: "-alphabetic", label: "Alphabetic (dsc)" },
    ...sectors
      .split(",")
      .filter((d) => d)
      .map((sector) => {
        return [
          { value: sector.trim(), label: `${sector.trim()} (dsc)` },
          { value: `-${sector.trim()}`, label: `${sector.trim()} (asc)` },
        ]
      }),
  ].flat()

  const preparedMarkets = markets
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d)

  const preparedSectors = sectors
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d)

  return (
    <Box>
      <HStack spacing={3} mb={5}>
        <Box>
          <Select
            onChange={(e) => {
              console.log(e.target.value)
              setSortByValue(e.target.value)
            }}
          >
            {sortingOptions.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          {/* <Input
            value={sectors}
            placeholder="sectors"
            onChange={(e) => setSectors(e.target.value)}
          /> */}
          <Select value={sectors} onChange={(e) => setSectors(e.target.value)}>
            <option value="">{"All sectors"}</option>
            <option value="power and buildings">{"Power and buildings"}</option>
            <option value="materials and industry">
              {"Materials and industry"}
            </option>
            <option value="transport">{"Transport"}</option>
            <option value="agriculture and nature">
              {"Agriculture and nature"}
            </option>
          </Select>
        </Box>
        <Box>
          <Input
            value={markets}
            placeholder="markets"
            onChange={(e) => setMarkets(e.target.value)}
          />
        </Box>
      </HStack>
      {/* <Box p={5} bg="gray.100" fontFamily="mono" mb={5}>
        {`<EmissionsChart ${
          !preparedSectors.length && !preparedMarkets.length && !sortByValue
            ? "/>"
            : ""
        }`}
        <Box pl={3}>
          {preparedMarkets.length
            ? ` markets={[${preparedMarkets.map((d) => `"${d}"`)}]}`
            : ""}
        </Box>
        <Box pl={3}>
          {preparedSectors.length
            ? ` sectors={[${preparedSectors.map((d) => `"${d}"`)}]}`
            : ""}
        </Box>
        <Box pl={3}>{sortByValue ? ` sortBy={"${sortByValue}"}` : ""}</Box>
        {preparedSectors.length || preparedMarkets.length || sortByValue
          ? ` />`
          : ""}
      </Box> */}
      <EmissionsChartListing
        markets={preparedMarkets}
        sectors={preparedSectors}
        sortBy={sortByValue}
      />
    </Box>
  )
}

export function EmissionsChartListing({ markets, sectors, sortBy = "" }) {
  const { colors } = useTheme()
  const [data, setData] = useState([])

  useEffect(() => {
    if (typeof window === "undefined" || data.length) return

    fetchDataset("/data/emissions/all.txt", "json")
      // fetch("/data/emissions/all.json")
      // .then((res) => res.json())
      .then((d) =>
        setData(
          d.filter((dd) => {
            return dd.id && dd.values.length && !!dd.values[0].total
          })
        )
      )
  }, [])

  const marketFilters = markets ? [markets].flat() : []
  const sectorFilters = sectors ? [sectors].flat() : []

  const finalData = useMemo(() => {
    if (!marketFilters && !sectorFilters) return data

    const prefiltered = marketFilters.length
      ? data.filter((d) => marketFilters.includes(d.id))
      : data

    const filtered = sectorFilters.length
      ? prefiltered.reduce((acc, cur) => {
          const values = cur.values.filter((d) =>
            sectorFilters.includes(d.sector)
          )
          acc.push({ ...cur, values })
          return acc
        }, [])
      : prefiltered

    const sortPrefix = sortBy[0] === "-" ? "-" : ""
    const isAlphabetic = sortBy.includes("alphabetic")

    const sortKey = sortPrefix ? sortBy.slice(1) : sortBy

    return sortBy
      ? isAlphabetic
        ? sortPrefix === "-"
          ? _sortBy(filtered, (o) => o.name).reverse()
          : _sortBy(filtered, (o) => o.name)
        : _sortBy(filtered, (o) => {
            return sortPrefix === "-"
              ? o.values.find((s) => s.sector === sortKey)?.valuePercent
              : -o.values.find((s) => s.sector === sortKey)?.valuePercent
          })
      : filtered
  }, [marketFilters, sectorFilters, data, sortBy])

  return (
    <Stack spacing={3}>
      {finalData.map((d) => {
        return (
          <Stack key={d.id} onClick={() => console.log(d)} spacing={1}>
            <Text fontSize="sm">{d.name}</Text>

            <HStack spacing={0} bg="gray.100">
              <AnimatePresence>
                {d.values.map(({ sector, valuePercent }) => {
                  const backgroundColor = colors[sector][400]
                  return (
                    <motion.div
                      key={`${d.id}-${sector}`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${valuePercent || 0}%` }}
                      exit={{ width: "0%" }}
                      style={{
                        backgroundColor,
                        flex: "none",
                        height: "1rem",
                        boxShadow: "-0.0625rem 0 0 0 #FFFFFF",
                      }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                    />
                  )
                })}
              </AnimatePresence>
            </HStack>
          </Stack>
        )
      })}
    </Stack>
  )
}

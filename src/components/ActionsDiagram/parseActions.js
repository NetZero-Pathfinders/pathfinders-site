import _groupBy from "lodash/groupBy"

export default function parseActions(d) {
  return d.map((dd) => {
    const id = `${dd.id}`
    return {
      ...dd,
      id,
      name: dd.title || dd.name || "",
      pillar: parseInt(id[0]) || "",
      sectorIds: dd.sectors.map((ddd) => ddd.key),
      stakeholderIds: dd.stakeholders.map((ddd) => ddd.key),
    }
  })
}

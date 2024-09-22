import { Button } from "@chakra-ui/react"

import { FiltersIcon } from "@/components/Icon"
import { useStore } from "@/components/BestPracticeListing"

export default function SidebarOpen(props) {
  const toggleSidebar = useStore((state) => state.toggleSidebar)
  return (
    <Button onClick={() => toggleSidebar()} variant="ghost" px={0} {...props}>
      <FiltersIcon size="2rem" />
    </Button>
  )
}

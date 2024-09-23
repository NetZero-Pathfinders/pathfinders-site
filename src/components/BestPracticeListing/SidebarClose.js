import { Button } from "@chakra-ui/react"

import { ChevronLeftIcon } from "@/components/Icon"
import { useStore } from "@/components/BestPracticeListing"

export default function SidebarClose(props) {
  const toggleSidebar = useStore((state) => state.toggleSidebar)
  return (
    <Button onClick={() => toggleSidebar()} variant="ghost" px={0} {...props}>
      <ChevronLeftIcon size="2rem" />
    </Button>
  )
}

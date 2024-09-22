import { useEffect, useRef } from "react"
import _sortBy from "lodash/sortBy"
import _debounce from "lodash/debounce"

export const useResizeObserver = (setDimensions) => {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const resize = _debounce(() => {
      const { width, height } = ref.current.getBoundingClientRect()
      console.log(width, height)
      setDimensions(width, height)
    }, 300)
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [setDimensions])

  return { ref }
}

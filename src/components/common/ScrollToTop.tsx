import { useEffect } from "react"
import { useLocation, useInRouterContext } from "react-router-dom"

export default function ScrollToTop() {
  const inRouter = useInRouterContext()

  if (!inRouter) return null

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

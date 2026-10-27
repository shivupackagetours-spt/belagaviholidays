/* One reveal for the whole site: a caller holds a ref on the element it wants
   watched and gets back whether it has arrived. IntersectionObserver fires
   once — a band that fades in again every time it scrolls past is a page
   showing off rather than a page telling you something. Where observers are
   missing, or the visitor has asked for less motion, the element starts shown:
   the animation is never the reason content is invisible. */
import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export function useReveal<T extends Element>(ref: RefObject<T | null>, rootMargin = '0px 0px -12% 0px') {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])

  return shown
}

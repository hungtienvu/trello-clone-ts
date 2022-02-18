import { useRef, useEffect } from "react"

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null)

  //if any component use this hook mounted
  //focus will be triggered on the ref input
  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}

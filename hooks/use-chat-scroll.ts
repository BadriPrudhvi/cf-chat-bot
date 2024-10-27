import { useEffect, useRef } from 'react'

export function useChatScroll<T>(dep: T): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = ref.current
    if (div) {
      div.scrollTop = div.scrollHeight
    }
  }, [dep])

  return ref
}

import { useEffect, useState } from 'react'

/**
 * Custom hook that tells you whether a given media query is active.
 *
 * Inspired by https://usehooks.com/useMedia/
 * https://gist.github.com/gragland/ed8cac563f5df71d78f4a1fefa8c5633
 *
 * ref: https://dev.to/justincy/4-patterns-for-responsive-props-in-react-39ak#responsive-props
 */
// TODO: replace with applicable better approach
export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query)
      setMatches(mediaQuery.matches)
      const handler = (event: {
        matches: boolean | ((prevState: boolean) => boolean)
      }) => setMatches(event.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    },
    [], // Empty array ensures effect is only run on mount and unmount
  )
  return matches
}

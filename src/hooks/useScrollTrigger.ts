import * as React from 'react'

enum Direction {
  UP,
  DOWN,
}
type StoreRef = React.MutableRefObject<{
  scroll: number
  direction: Direction
  isHolding: boolean
}>

interface Options {
  getTrigger: typeof defaultTrigger
  threshold: number
  disableHysteresis: boolean
  target: Window
}

function defaultTrigger(store: StoreRef, options: Partial<Options>) {
  const { threshold = 48, target } = options
  const direction = store.current.direction
  const isHolding = store.current.isHolding
  const previous = store.current.scroll
  const currentScroll = target ? target.pageYOffset : 0

  if (target && !isHolding) {
    // Set vertical scroll
    store.current.scroll = currentScroll
  }

  if (previous !== undefined) {
    if (currentScroll > previous) {
      if (direction === Direction.UP) store.current.isHolding = true
      store.current.direction = Direction.DOWN
    } else if (currentScroll < previous) {
      if (direction === Direction.DOWN) store.current.isHolding = true
      store.current.direction = Direction.UP
    }

    // if (store.current.scroll < lastPosition - threshold) {
    //   store.current.lastPosition = undefined
    //   return false
    // } else if (store.current.scroll > lastPosition + threshold) {
    //   store.current.lastPosition = undefined
    //   return true
    // }
  }

  return store.current.scroll > threshold
}

const defaultTarget = typeof window !== 'undefined' ? window : null

const useScrollTrigger = (options: Partial<Options> = {}) => {
  const {
    getTrigger = defaultTrigger,
    target = defaultTarget,
    ...other
  } = options
  const store = React.useRef({
    scroll: undefined,
    direction: undefined,
    isHolding: false,
  })
  const [trigger, setTrigger] = React.useState(() => getTrigger(store, other))

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger(store, { target }))
    }

    handleScroll() // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll)
    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [target, getTrigger])

  return trigger
}

export default useScrollTrigger

import * as React from 'react'

interface Options {
  getTrigger: typeof defaultTrigger
  target: Window
}

const defaultTarget = typeof window !== 'undefined' ? window : null

function defaultTrigger(options: Partial<Options>) {
  const { target } = options
  const currentScroll = target ? target.pageYOffset : 0

  return currentScroll > 0
}

const useAppBarScrollTrigger = (options: Partial<Options> = {}) => {
  const { getTrigger = defaultTrigger, target = defaultTarget } = options
  const [trigger, setTrigger] = React.useState(() => getTrigger({ target }))

  React.useEffect(() => {
    const handleScroll = () => {
      setTrigger(getTrigger({ target }))
    }

    handleScroll() // Re-evaluate trigger when dependencies change
    target.addEventListener('scroll', handleScroll)
    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [target, getTrigger])

  return trigger
}

export default useAppBarScrollTrigger

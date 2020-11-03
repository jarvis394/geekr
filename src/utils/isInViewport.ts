import React from 'react'

export default (ref: React.MutableRefObject<Element>, offset = 0) => {
  if (!ref.current) return false
  const top = ref.current.getBoundingClientRect().top
  return top + offset >= 0 && top - offset <= window.innerHeight
}

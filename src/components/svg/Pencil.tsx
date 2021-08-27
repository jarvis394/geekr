import React from 'react'

const Pencil = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg id="pencil-small" viewBox="0 0 12 12" {...props}>
      <path d="M2 10H4.1715L9.1715 5L7 2.8285L2 7.8285V10ZM0 7L7 0L12 5L5 12H0V7Z"></path>
    </svg>
  )
}

export default Pencil

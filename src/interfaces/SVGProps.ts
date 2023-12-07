import React from 'react'
export default interface Props {
  svgProps?: React.SVGProps<SVGSVGElement>
  className?: string
  theme?: 'light' | 'dark'
}

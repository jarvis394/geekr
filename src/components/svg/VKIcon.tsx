import React from 'react'
import { useTheme } from '@material-ui/core/styles'

const VKIcon = () => {
  const theme = useTheme()

  return (
    <svg
      viewBox="70.5 70.5 142.5 142.5"
      style={{
        fill: 'currentColor',
        width: '1em',
        height: '1em',
        display: 'inline-block',
        fontSize: '1.5rem',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <path
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: theme.palette.type === 'light' ? '#0000008a' : 'white',
        }}
        d="M120,70.9h43.5c39.7,0,49.1,9.4,49.1,49.1v43.5c0,39.7-9.4,49.1-49.1,49.1H120c-39.7,0-49.1-9.4-49.1-49.1V120
	C70.9,80.3,80.3,70.9,120,70.9"
      />
      <path
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: theme.palette.background.paper,
        }}
        d="M186.9,119.7c0.7-2.2,0-3.8-3.1-3.8h-10.3c-2.6,0-3.8,1.4-4.5,2.9c0,0-5.3,12.8-12.7,21.1
	c-2.4,2.4-3.5,3.2-4.8,3.2c-0.7,0-1.6-0.8-1.6-3v-20.5c0-2.6-0.8-3.8-3-3.8h-16.2c-1.6,0-2.6,1.2-2.6,2.4c0,2.5,3.7,3.1,4.1,10.1
	v15.2c0,3.3-0.6,3.9-1.9,3.9c-3.5,0-12-12.9-17.1-27.6c-1-2.9-2-4-4.6-4H98.2c-3,0-3.5,1.4-3.5,2.9c0,2.7,3.5,16.3,16.3,34.3
	c8.5,12.3,20.6,18.9,31.5,18.9c6.6,0,7.4-1.5,7.4-4v-9.3c0-3,0.6-3.5,2.7-3.5c1.5,0,4.2,0.8,10.3,6.7c7,7,8.2,10.2,12.1,10.2h10.3
	c3,0,4.4-1.5,3.6-4.4c-0.9-2.9-4.3-7.1-8.7-12.1c-2.4-2.8-6-5.9-7.1-7.4c-1.5-2-1.1-2.8,0-4.6C173,143.5,185.6,125.7,186.9,119.7"
      />
    </svg>
  )
}

export default React.memo(VKIcon)

import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

const c = ({ children }) => {
  return (
    <Scrollbars>{children}</Scrollbars>
  )
}

export default c

import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

const Scrollbar = ({ children }) => {
  return (
    <Scrollbars>
      {children}
    </Scrollbars>
  )
}

export default Scrollbar

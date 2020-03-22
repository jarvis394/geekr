import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

const Scrollbar = ({ children, ...props }) => (
  <Scrollbars {...props}>{children}</Scrollbars>
)

export default Scrollbar

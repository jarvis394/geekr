import React from 'react'

export default interface TabObject {
  label: string
  icon: React.ReactElement
  to: () => string
  match: string[] | string
  tab: string
}

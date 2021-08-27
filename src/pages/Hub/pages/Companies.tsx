import React from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'

const Companies = () => {
  return (
    <OutsidePage
      headerText="Компании"
      hidePositionBar
      disableShrinking
    ></OutsidePage>
  )
}

export default React.memo(Companies)

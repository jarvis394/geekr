import { Button, ListItem } from '@material-ui/core'
import React, { useState } from 'react'
import BottomDrawerMargin from 'src/components/blocks/BottomDrawerMargin'

const Favorites: React.FC<{ page: 'articles' | 'comments' }> = () => {
  const [isModeDrawerOpen, setModeDrawerOpen] = useState(false)

  return (
    <div>
      <BottomDrawerMargin isOpen={isModeDrawerOpen} setOpen={setModeDrawerOpen}>
        {/* <List> */}
        <ListItem button>asd</ListItem>
        {/* </List> */}
      </BottomDrawerMargin>
      <Button onClick={() => setModeDrawerOpen(true)}>open</Button>
    </div>
  )
}

export default React.memo(Favorites)

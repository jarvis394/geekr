import { Button, ListItem, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import BottomDrawerMargin from 'src/components/blocks/BottomDrawerMargin'

const useStyles = makeStyles((theme) => ({
  drawerRoot: {
    padding: theme.spacing(1.5, 0) + ' !important',
  },
}))

const Favorites: React.FC<{ page: 'articles' | 'comments' }> = ({ page }) => {
  const [isModeDrawerOpen, setModeDrawerOpen] = useState(false)
  const classes = useStyles()

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

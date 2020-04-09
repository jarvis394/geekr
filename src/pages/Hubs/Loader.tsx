import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

const Item = () => (
  <ListItem dense>
    <ListItemAvatar>
      <Skeleton variant="circle" height={40} width={40} />
    </ListItemAvatar>
    <ListItemText
      primary={<Skeleton variant="text" width={200} />}
      secondary={<Skeleton variant="text" width={164} />}
    />
  </ListItem>
)

const Loader = () => (
  <>
    {[...new Array(10)].map((_, i) => (
      <Item key={i} />
    ))}
  </>
)

export default Loader

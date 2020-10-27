import React from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Hub } from 'src/interfaces'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
  },
  primaryText: {
    color: theme.palette.primary.main,
  },
}))

const Item = ({ data }: { data: Hub.Hub }) => {
  const classes = useStyles()

  return (
    <ListItem
      dense
      button
      className={classes.root}
      component={Link}
      to={'/hub/' + data.alias}
    >
      <ListItemAvatar>
        <Avatar src={data.imageUrl} alt={data.titleHtml} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ className: classes.primaryText }}
        primary={data.titleHtml}
        secondary={data.descriptionHtml}
      />
    </ListItem>
  )
}

export default React.memo(Item)

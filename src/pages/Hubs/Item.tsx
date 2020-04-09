import React from 'react'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HubObject } from 'src/interfaces'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
  },
  primaryText: {
    color: theme.palette.primary.main
  },
}))

const Item = ({ data }: { data: HubObject }) => {
  // const [isHovered, setHoveredState] = useState<boolean>(false)
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
        <Avatar src={data.icon} alt={data.title} />
      </ListItemAvatar>
      <ListItemText
        id="hubs_primaryText"
        primaryTypographyProps={{ className: classes.primaryText }}
        primary={data.title}
        secondary={data.about_small}
      />
    </ListItem>
  )
}

export default Item

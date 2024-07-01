import { List, ListItem, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Icon28CommentOutline,
  Icon20BookmarkOutline,
  Icon28ArticleOutline,
} from '@vkontakte/icons'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles(() => ({
  root: {},
}))

const useListLinkStyles = makeStyles((theme) => ({
  root: {
    '-webkit-tap-highlight-color': 'transparent !important',
    padding: theme.spacing(1.25, 2),
  },
  icon: {
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.light,
  },
}))

interface ListLinkProps {
  to: string
  title: string
  icon: typeof Icon28ArticleOutline
}

const ListLinkUnmemoized: React.FC<ListLinkProps> = ({
  to,
  title,
  icon: Icon,
}) => {
  const classes = useListLinkStyles()

  return (
    <ListItem button component={Link} to={to} className={classes.root}>
      <Icon width={28} height={28} className={classes.icon} />
      <Typography>{title}</Typography>
    </ListItem>
  )
}
const ListLink = React.memo(ListLinkUnmemoized)

const Links = () => {
  const classes = useStyles()
  const user = useSelector((store) => store.auth.me.data)
  const alias = user?.alias

  return (
    <List className={classes.root}>
      <ListLink
        to={'/user/' + alias + '/articles/p/1'}
        title={'Статьи'}
        icon={Icon28ArticleOutline}
      />
      <ListLink
        to={'/user/' + alias + '/comments/p/1'}
        title={'Комментарии'}
        icon={Icon28CommentOutline}
      />
      <ListLink
        to={'/user/' + alias + '/favorites/articles/p/1'}
        title={'Закладки'}
        icon={Icon20BookmarkOutline}
      />
    </List>
  )
}

export default React.memo(Links)

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Badge, Button, Typography } from '@material-ui/core'
import { Icon28CommentOutline } from '@vkontakte/icons'
import { Icon20BookmarkOutline } from '@vkontakte/icons'
import { Icon28ArticleOutline } from '@vkontakte/icons'
import { useHistory, useLocation } from 'react-router-dom'
import OutsidePageLocationState from 'src/interfaces/OutsidePageLocationState'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: '1px solid ' + theme.palette.divider,
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: theme.spacing(1.5, 0),
    borderRadius: 8,
    display: 'flex',
    width: '100%',
  },
  buttonLabel: {
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    textTransform: 'none',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: theme.spacing(0.5),
    fontFamily: 'Google Sans',
  },
  badge: {
    top: 3,
  },
}))

const ProfileLinks = () => {
  const location = useLocation()
  const history = useHistory<OutsidePageLocationState>()
  const profile = useSelector((state) => state.profile.profile.card.data)
  const classes = useStyles()
  const buttons = [
    {
      icon: Icon28ArticleOutline,
      to: location.pathname + '/articles/p/1',
      text: 'Публикации',
      badgeContent: profile.counterStats.postCount,
    },
    {
      icon: Icon28CommentOutline,
      to: location.pathname + '/comments/p/1',
      text: 'Комментарии',
      style: { transform: 'scale(1.1)' },
      badgeContent: profile.counterStats.commentCount,
    },
    {
      icon: Icon20BookmarkOutline,
      to: location.pathname + '/favorites/articles/p/1',
      text: 'Закладки',
      badgeContent: profile.counterStats.favoriteCount,
    },
  ]

  return (
    <div className={classes.root}>
      {buttons.map(({ icon: Icon, text, style, to, badgeContent }, i) => (
        <Button
          key={i}
          classes={{ root: classes.button, label: classes.buttonLabel }}
          onClick={() =>
            history.push(to, {
              from: location.pathname,
              scroll: window.pageYOffset,
            })
          }
        >
          <Badge
            classes={{ badge: classes.badge }}
            badgeContent={badgeContent}
            color="primary"
            invisible={badgeContent === 0}
          >
            <Icon width={28} height={28} style={style} />
          </Badge>
          <Typography className={classes.buttonText}>{text}</Typography>
        </Button>
      ))}
    </div>
  )
}

export default React.memo(ProfileLinks)

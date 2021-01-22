import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { Icon28CommentOutline } from '@vkontakte/icons'
import { Icon20BookmarkOutline } from '@vkontakte/icons'
import { Icon28ArticleOutline } from '@vkontakte/icons'
import { useHistory, useLocation } from 'react-router-dom'

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
}))

const ProfileLinks = () => {
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const buttons = [
    {
      icon: Icon28ArticleOutline,
      to: location.pathname + '/articles/1',
      text: 'Публикации',
    },
    {
      icon: Icon28CommentOutline,
      to: location.pathname + '/comments/1',
      text: 'Комментарии',
      style: { transform: 'scale(1.1)' },
    },
    {
      icon: Icon20BookmarkOutline,
      to: location.pathname + '/favorites/1',
      text: 'Закладки',
    },
  ]

  return (
    <div className={classes.root}>
      {buttons.map(({ icon: Icon, text, style, to }, i) => (
        <Button
          key={i}
          classes={{ root: classes.button, label: classes.buttonLabel }}
          onClick={() => history.push(to)}
        >
          <Icon width={28} height={28} style={style} />
          <Typography className={classes.buttonText}>{text}</Typography>
        </Button>
      ))}
    </div>
  )
}

export default ProfileLinks

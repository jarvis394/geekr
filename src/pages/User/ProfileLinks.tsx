import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { Container, Button } from '@material-ui/core'
import { Icon28CommentOutline } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: '1px solid ' + theme.palette.divider,
    marginTop: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(2),
    borderRadius: 8,
  },
  icon: {
    color: theme.palette.primary.main,
  },
}))

const ProfileLinks = () => {
  const user = useSelector((store) => store.profile.profile.user.data)
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Button className={classes.button}>
        <Icon28CommentOutline width={36} height={36} className={classes.icon} />
      </Button>
    </Container>
  )
}

export default ProfileLinks

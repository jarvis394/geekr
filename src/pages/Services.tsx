import React from 'react'
import { Button as MUIButton, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { blue, orange, deepOrange, lightGreen } from '@material-ui/core/colors'

import { Icon36Newsfeed } from '@vkontakte/icons'
import { Icon36Users3Outline } from '@vkontakte/icons'
import { Icon28CompassOutline } from '@vkontakte/icons'
import { Icon28WorkOutline } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const useCardStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 0),
    borderRadius: 8,
    display: 'flex',
    width: '100%',
  },
  rootLabel: {
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    textTransform: 'none',
  },
  text: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: theme.spacing(0.5),
    fontFamily: 'Google Sans',
    color: theme.palette.text.secondary,
  },
}))

interface ButtonProps {
  text: string
  icon: typeof Icon36Newsfeed
  color: string
}

const Button = ({ text, icon: Icon, color }: ButtonProps) => {
  const classes = useCardStyles()

  return (
    <MUIButton classes={{ root: classes.root, label: classes.rootLabel }}>
      <Icon width={32} height={32} fill={color} />
      <Typography className={classes.text}>{text}</Typography>
    </MUIButton>
  )
}

const Services = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Хабы</Typography>
      <Grid container>
        <Grid item xs={6}>
          <Button icon={Icon36Newsfeed} text="Новости" color={blue.A200} />
        </Grid>
        <Grid item xs={6}>
          <Button icon={Icon28CompassOutline} text="Хабы" color={orange.A200} />
        </Grid>
        <Grid item xs={6}>
          <Button
            icon={Icon36Users3Outline}
            text="Авторы"
            color={deepOrange.A200}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            icon={Icon28WorkOutline}
            text="Компании"
            color={lightGreen[500]}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Services

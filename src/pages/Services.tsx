import React from 'react'
import {
  Button as MUIButton,
  Divider,
  Grid,
  Typography,
  ButtonBase,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { blue, orange, deepOrange, lightGreen } from '@material-ui/core/colors'

import { Icon36Newsfeed } from '@vkontakte/icons'
import { Icon36Users3Outline } from '@vkontakte/icons'
import { Icon28CompassOutline } from '@vkontakte/icons'
import { Icon28WorkOutline } from '@vkontakte/icons'
import { Icon24CubeBoxOutline } from '@vkontakte/icons'
import { Icon24ChevronCompactRight } from '@vkontakte/icons'
import { Icon28Users3Outline } from '@vkontakte/icons'
import { Icon24EducationOutline } from '@vkontakte/icons'
import { Icon28FireOutline } from '@vkontakte/icons'
import { useHistory, useLocation } from 'react-router'

const makeCardTextColor = (theme: Theme, hasSubtext: boolean) => {
  if (theme.palette.type === 'dark') {
    return theme.palette.text[hasSubtext ? 'secondary' : 'hint']
  } else {
    return theme.palette.text[hasSubtext ? 'primary' : 'secondary']
  }
}

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
  divider: {
    margin: theme.spacing(0, 1),
    marginTop: theme.spacing(0.5),
  },
  button: {},
  buttonLabel: {
    textTransform: 'none',
  },
}))

const useButtonStyles = makeStyles((theme) => ({
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

const useCardStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1.5),
    borderRadius: 8,
    display: 'flex',
    alignItems: 'initial',
    flexDirection: 'column',
    textAlign: 'left',
    background: (s) => theme.palette.background[s ? 'paper' : 'default'],
    marginTop: theme.spacing(1),
    margin: theme.spacing(0, 1),
  },
  text: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    fontFamily: 'Google Sans',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: (s) => makeCardTextColor(theme, s as boolean),
  },
  headerIcon: {
    marginRight: -8,
  },
  subtext: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: theme.spacing(0.5),
    fontFamily: 'Google Sans',
    color:
      theme.palette.text[theme.palette.type === 'dark' ? 'hint' : 'secondary'],
  },
}))

interface ButtonProps {
  text: string
  icon: typeof Icon36Newsfeed
  color: string
  to: string
}

interface CardProps {
  text: string
  icon: typeof Icon36Newsfeed
  subtext?: string
  to: string
}

const Button = ({ text, icon: Icon, color, to }: ButtonProps) => {
  const classes = useButtonStyles()
  const history = useHistory()

  return (
    <MUIButton
      onClick={() => history.push(to)}
      classes={{ root: classes.root, label: classes.rootLabel }}
    >
      <Icon width={32} height={32} fill={color} />
      <Typography className={classes.text}>{text}</Typography>
    </MUIButton>
  )
}

const Card = ({ text, subtext, icon: Icon, to }: CardProps) => {
  const classes = useCardStyles(!!subtext)
  const history = useHistory()
  const location = useLocation()

  return (
    <ButtonBase
      onClick={() =>
        history.push(to, {
          from: location.pathname,
        })
      }
      className={classes.root}
    >
      <div className={classes.header}>
        <Icon width={24} height={24} />
        <Typography className={classes.text}>{text}</Typography>
        {subtext && (
          <Icon24ChevronCompactRight
            width={24}
            height={24}
            className={classes.headerIcon}
          />
        )}
      </div>
      {subtext && (
        <Typography className={classes.subtext}>{subtext}</Typography>
      )}
    </ButtonBase>
  )
}

const Services = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Button
            to="/news/p/1"
            icon={Icon36Newsfeed}
            text="Новости"
            color={blue.A200}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            to="/hubs/p/1"
            icon={Icon28CompassOutline}
            text="Хабы"
            color={orange.A200}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            icon={Icon36Users3Outline}
            text="Авторы"
            to="/authors/p/1"
            color={deepOrange.A200}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            icon={Icon28WorkOutline}
            text="Компании"
            to="/companies/p/1"
            color={lightGreen[500]}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Card
        to="/megaprojects/p/1"
        text="Мегапроекты"
        icon={Icon28FireOutline}
        subtext="Проекты, созданные контент-студией Хабра"
      />
      <Card
        to="/sandbox/p/1"
        text="Песочница"
        icon={Icon24CubeBoxOutline}
        subtext="Статьи, ожидающие одобрения от сообщества"
      />
      <Card
        to="/how-to-become-an-author"
        text="Как стать автором"
        icon={Icon28Users3Outline}
        subtext="Справка о том, как написать первую статью"
      />
      <Card to="/habra-about" text="О сайте" icon={Icon24EducationOutline} />
      <Grid container>
        <Grid item xs={6}>
          <Card
            to="/habra-about"
            text="О сайте"
            icon={Icon24EducationOutline}
          />
        </Grid>
        <Grid item xs={6}>
          <Card
            to="/habra-about"
            text="О сайте"
            icon={Icon24EducationOutline}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Services

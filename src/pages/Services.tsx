import React from 'react'
import {
  Button as MUIButton,
  Grid,
  Typography,
  ButtonBase,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { blue, orange, red, green } from '@material-ui/core/colors'
import { Icon24Fire } from '@vkontakte/icons'
import { Icon36Newsfeed } from '@vkontakte/icons'
import { Icon36Users3Outline } from '@vkontakte/icons'
import { Icon28CompassOutline } from '@vkontakte/icons'
import { Icon28WorkOutline } from '@vkontakte/icons'
import { Icon24CubeBoxOutline } from '@vkontakte/icons'
import { Icon24ChevronCompactRight } from '@vkontakte/icons'
import { Icon28Users3Outline } from '@vkontakte/icons'
import { Icon28LogoVkOutline } from '@vkontakte/icons'
import { useHistory, useLocation } from 'react-router'
import { Icon24InfoCircleOutline } from '@vkontakte/icons'
import GitHubIcon from '@material-ui/icons/GitHub'
import useMediaExtendedQuery from 'src/hooks/useMediaExtendedQuery'
import { MIDDLE_WIDTH, MIN_WIDTH } from 'src/config/constants'
import RUVDSLogo from 'src/components/svg/RUVDSLogo'

const makeCardTextColor = (theme: Theme, hasSubtext: boolean) => {
  if (theme.palette.type === 'dark') {
    return theme.palette.text[hasSubtext ? 'secondary' : 'hint']
  } else {
    return theme.palette.text[hasSubtext ? 'primary' : 'secondary']
  }
}

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  root: {
    paddingTop: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up(MIDDLE_WIDTH)]: {
      marginTop: theme.spacing(1),
    },
    maxWidth: MIN_WIDTH,
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
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
    marginTop: theme.spacing(0.5),
  },
  wrapper: {
    marginTop: theme.spacing(1),
  },
  buttonLabel: {
    textTransform: 'none',
  },
  dividerTitle: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.hint,
  },
}))

const useButtonStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 2),
    borderRadius: 8,
    display: 'flex',
    width: `calc(50% - ${theme.spacing(1)}px)`,
    background: theme.palette.background.paper,
    position: 'relative',
    '&:hover': {
      background: theme.palette.background.paper,
    },
    alignItems: 'flex-start',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 12,
      width: '100%',
      maxWidth: 164,
    },
  },
  rootLabel: {
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    textTransform: 'none',
  },
  text: {
    fontSize: 18,
    fontWeight: 500,
    marginTop: theme.spacing(0.5),
    fontFamily: 'Google Sans',
    color: theme.palette.text.primary,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      fontSize: 20,
      marginTop: theme.spacing(1),
    },
  },
  icon: {
    marginTop: theme.spacing(0.5),
  },
}))

const useCardLinkStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'initial',
    flexDirection: 'column',
    textAlign: 'left',
    background: (s) => theme.palette.background[s ? 'paper' : 'default'],
    marginTop: theme.spacing(1),
  },
  a: {
    padding: theme.spacing(1, 1.5),
    textDecoration: 'none',
    color: 'initial',
    '-webkit-tap-highlight-color': 'transparent',
  },
  text: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
    fontWeight: 500,
    fontFamily: 'Google Sans',
    flexGrow: 1,
    position: 'relative',
    top: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: (s) => makeCardTextColor(theme, s as boolean),
  },
  headerIcon: {
    marginRight: -8,
    width: 24,
    height: 24,
  },
}))

const useSponsorCardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'initial',
    flexDirection: 'column',
    textAlign: 'left',
    background: (s) => theme.palette.background[s ? 'paper' : 'default'],
    marginTop: theme.spacing(1),
  },
  a: {
    padding: theme.spacing(1.5, 2),
    textDecoration: 'none',
    color: 'initial',
    '-webkit-tap-highlight-color': 'transparent',
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'Google Sans',
    flexGrow: 1,
    position: 'relative',
    marginTop: theme.spacing(1)
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.text.primary,
  },
}))

const useCardStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1.5),
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'initial',
    flexDirection: 'column',
    textAlign: 'left',
    background: (s) => theme.palette.background[s ? 'paper' : 'default'],
    marginTop: theme.spacing(1),
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
    width: 24,
    height: 24,
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
  icon: typeof Icon36Newsfeed | typeof GitHubIcon
  subtext?: string
  to: string
  paper?: boolean
}

interface SponsorCardProps extends CardProps {
  fill?: string
}

const Button = ({ text, icon: Icon, color, to }: ButtonProps) => {
  const classes = useButtonStyles()
  const history = useHistory()
  const match = useMediaExtendedQuery()

  return (
    <MUIButton
      onClick={() =>
        history.push(to, {
          from: location.pathname,
        })
      }
      classes={{ root: classes.root, label: classes.rootLabel }}
    >
      <Icon
        width={match ? 48 : 36}
        height={match ? 48 : 36}
        fill={color}
        className={classes.icon}
      />
      <Typography className={classes.text}>{text}</Typography>
    </MUIButton>
  )
}

const Card = ({ text, subtext, icon: Icon, to, paper }: CardProps) => {
  const classes = useCardStyles(paper || !!subtext)
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

const CardLink = ({ text, icon: Icon, to }: CardProps) => {
  const classes = useCardLinkStyles()

  return (
    <ButtonBase className={classes.root}>
      <a href={to} target="_blank" rel="noreferrer" className={classes.a}>
        <div className={classes.header}>
          <Icon width={24} height={24} />
          <Typography className={classes.text}>{text}</Typography>
        </div>
      </a>
    </ButtonBase>
  )
}

const SponsorCard = ({ text, icon: Icon, to, fill }: SponsorCardProps) => {
  const classes = useSponsorCardStyles()

  return (
    <ButtonBase className={classes.root}>
      <a href={to} target="_blank" rel="noreferrer" className={classes.a}>
        <div className={classes.header}>
          <Icon width={40} height={40} fill={fill} />
          <Typography className={classes.text}>{text}</Typography>
        </div>
      </a>
    </ButtonBase>
  )
}

const Services = () => {
  const classes = useStyles()

  return (
    <div className={classes.rootWrapper}>
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <Button
            to="/megaprojects/p/1"
            icon={Icon24Fire}
            text="Мегапроекты"
            color={red[600]}
          />
          <Button
            to="/hubs/p/1"
            icon={Icon28CompassOutline}
            text="Хабы"
            color={orange.A200}
          />
          <Button
            icon={Icon36Users3Outline}
            text="Авторы"
            to="/authors/p/1"
            color={blue[400]}
          />
          <Button
            icon={Icon28WorkOutline}
            text="Компании"
            to="/companies/p/1"
            color={green[400]}
          />
        </div>
        <div className={classes.wrapper}>
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
          <Card
            to="/geekr-about"
            paper
            text="О сайте"
            icon={Icon24InfoCircleOutline}
          />
        </div>
        <div className={classes.wrapper} style={{ marginTop: 6 }}>
          <Typography variant="caption" className={classes.dividerTitle}>
            Социальные сети
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <CardLink
                to="https://vk.com/tarnatovski"
                text="ВКонтакте"
                icon={Icon28LogoVkOutline}
              />
            </Grid>
            <Grid item xs={6}>
              <CardLink
                to="https://github.com/jarvis394/geekr"
                text="GitHub"
                icon={GitHubIcon}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.wrapper} style={{ marginTop: 6 }}>
          <Typography variant="caption" className={classes.dividerTitle}>
            Спонсоры
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <SponsorCard
                to="https://ruvds.com/ru-rub"
                text="RUVDS"
                icon={RUVDSLogo}
                fill={'#4bb0ff'}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Services)

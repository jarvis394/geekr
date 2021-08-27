import React from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { fade, makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import {
  ListItem,
  ListItemText,
  Switch,
  Typography,
  useTheme,
} from '@material-ui/core'
import { setSettings } from 'src/store/actions/settings'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
    position: 'relative',
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    paddingBottom: 0,
    padding: theme.spacing(1.8, 2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.light,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  padding: {
    padding: theme.spacing(1.8, 2),
  },
}))

const Privacy = () => {
  const theme = useTheme()
  const classes = useStyles()
  const cookiesPreferences = useSelector(
    (store) => store.settings.cookiesPreferences
  )
  const dispatch = useDispatch()
  const switchDisableCookies = () => {
    dispatch(
      setSettings({
        cookiesPreferences: {
          ...cookiesPreferences,
          disableCookies: !cookiesPreferences.disableCookies,
        },
      })
    )
  }

  return (
    <OutsidePage
      headerText={'Приватность'}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Аналитика</Typography>
          <ListItem button onClick={switchDisableCookies}>
            <ListItemText
              primary={'Отключить куки'}
              secondary={
                'Отключает создание куки со стороны Matomo (Piwik). Перезагрузите страницу, чтобы изменения вступили в силу.'
              }
            />
            <Switch
              disableRipple
              checked={cookiesPreferences.disableCookies}
              color="primary"
            />
          </ListItem>
          <div className={classes.padding}>
            <Typography variant="body2">
              Мы используем{' '}
              <a
                className={classes.link}
                target="_blank"
                rel="noreferrer"
                href="https://matomo.org/"
              >
                Matomo
              </a>
              , чтобы собирать статистику посещений приложения.
            </Typography>
            <Typography style={{ marginTop: 4 }} variant="body2">
              На серевере включена{' '}
              <a
                className={classes.link}
                target="_blank"
                rel="noreferrer"
                href="https://matomo.org/docs/privacy-how-to/#step-1-automatically-anonymize-visitor-ips"
              >
                анонимизация IP-адресов
              </a>
              . Ваши данные никогда не будут передаваться третьим лицам.
            </Typography>
          </div>
        </div>
      </div>
    </OutsidePage>
  )
}

export default React.memo(Privacy)

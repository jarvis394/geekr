import React, { useMemo } from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { fade, makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH, THREAD_LEVEL } from 'src/config/constants'
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
}))

const SwitchButton: React.FC<{
  primary: string
  secondary: string
  checked: boolean
  onChange: () => void
}> = ({ primary, secondary, checked, onChange }) => {
  return (
    <ListItem button onClick={() => onChange()}>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch disableRipple checked={checked} color="primary" />
    </ListItem>
  )
}

const Interface = () => {
  const classes = useStyles()
  const theme = useTheme()
  const userSettings = useSelector((store) => store.settings)
  const dispatch = useDispatch()
  const setInterfaceSettings = (
    field: 'interfaceFeed' | 'interfaceComments',
    type: string,
    value: unknown
  ) => {
    dispatch(
      setSettings({
        [field]: {
          ...userSettings[field],
          [type]: value,
        },
      })
    )
  }

  return (
    <OutsidePage
      headerText={'Настройки интерфейса'}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Лента</Typography>
          <SwitchButton
            primary={'Компактный вид ленты'}
            secondary={'В блоках не будет показан текст до ката'}
            checked={userSettings.interfaceFeed.isCompact}
            onChange={() =>
              setInterfaceSettings(
                'interfaceFeed',
                'isCompact',
                !userSettings.interfaceFeed.isCompact
              )
            }
          />
          <SwitchButton
            primary={'Скрыть мегапосты'}
            secondary={
              'На главной странице не будет отображаться блок с мегапостами'
            }
            checked={userSettings.interfaceFeed.hideMegaposts}
            onChange={() =>
              setInterfaceSettings(
                'interfaceFeed',
                'hideMegaposts',
                !userSettings.interfaceFeed.hideMegaposts
              )
            }
          />
          <SwitchButton
            primary={'Скрыть новости'}
            secondary={
              'На главной странице не будет отображаться блок с новостями'
            }
            checked={userSettings.interfaceFeed.hideNewsBlock}
            onChange={() =>
              setInterfaceSettings(
                'interfaceFeed',
                'hideNewsBlock',
                !userSettings.interfaceFeed.hideNewsBlock
              )
            }
          />
        </div>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Комментарии</Typography>
          <SwitchButton
            primary={'Включить ветки'}
            secondary={`Комментарии, чья степень вложенности больше ${THREAD_LEVEL}, будут спрятаны в ветку`}
            checked={userSettings.interfaceComments.showThreads}
            onChange={() =>
              setInterfaceSettings(
                'interfaceComments',
                'showThreads',
                !userSettings.interfaceComments.showThreads
              )
            }
          />
        </div>
      </div>
    </OutsidePage>
  )
}

export default React.memo(Interface)

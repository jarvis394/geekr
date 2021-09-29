import React, { useRef } from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'
import { useDispatch } from 'react-redux'
import { Button, TextField, Typography, useTheme } from '@material-ui/core'
import { setSettings } from 'src/store/actions/settings'
import { useSnackbar } from 'notistack'
import { UserSettings } from 'src/interfaces'
import * as userSettings from 'src/utils/userSettings'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.8, 2),
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
    paddingBottom: theme.spacing(1.8),
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
  const storeSettings = userSettings.get()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const inputRef = useRef<HTMLInputElement>()
  const settingsString = btoa(JSON.stringify(storeSettings))
  const handleApplyClick = () => {
    const value = inputRef.current.value
    let newSettings = value

    try {
      newSettings = JSON.parse(atob(newSettings))
    } catch (e) {
      enqueueSnackbar('Неправильный формат настроек', {
        variant: 'error',
        autoHideDuration: 4000,
      })
      return
    }

    dispatch(setSettings(newSettings as Partial<UserSettings>))

    enqueueSnackbar('Настройки импортированы', {
      variant: 'info',
      autoHideDuration: 4000,
    })
  }

  return (
    <OutsidePage
      headerText={'Импорт настроек'}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Экспорт</Typography>
          <TextField
            contentEditable={false}
            fullWidth
            variant="outlined"
            value={settingsString}
          />
          <Typography
            style={{ marginTop: 12 }}
            variant="body2"
            color="textSecondary"
          >
            Эту строку надо запомнить. Шутка!
          </Typography>
        </div>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Импорт</Typography>
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            placeholder="Вставь сюда экспортированную строчку"
          />
          <Button
            onClick={handleApplyClick}
            style={{ marginTop: 12 }}
            variant="contained"
            color="primary"
            disableElevation
          >
            Применить
          </Button>
          <Typography
            style={{ marginTop: 12 }}
            variant="body2"
            color="textSecondary"
          >
            После нажатия кнопки &quot;Применить&quot;, пути назад уже не будет
          </Typography>
        </div>
      </div>
    </OutsidePage>
  )
}

export default React.memo(Privacy)

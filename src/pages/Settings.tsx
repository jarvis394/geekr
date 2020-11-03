import * as React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import numToWord from 'number-to-words-ru'
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton,
  Button,
  Paper,
  InputBase,
  DialogActions,
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { useDispatch } from 'react-redux'
import {
  setHiddenAuthors,
  setHiddenCompanies,
  setTheme,
} from 'src/store/actions/settings'
import { THEMES, PaletteType, THEME_NAMES } from 'src/config/constants'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import BackRoundedIcon from '@material-ui/icons/ArrowBackRounded'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%', height: '100%', maxWidth: '100vw' },
  title: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: theme.palette.background.default,
    '& p': {
      fontFamily: 'Google Sans',
      fontWeight: 500,
      fontSize: 24,
    },
  },
  list: {
    '& span': { fontSize: 16 },
    '& p': { fontSize: 14 },
    height: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  dialogInputPaper: {
    backgroundColor: theme.palette.background.default,
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  dialogInputRoot: {
    color: 'inherit',
    width: '100%',
    flex: 1,
  },
  dialogInput: {
    padding: theme.spacing(1, 1, 1, 2),
    width: '100%',
  },
  dialogInputAddButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 16,
  },
  nothingHere: {
    color: theme.palette.text.hint,
    textAlign: 'center',
    fontWeight: 500,
    fontFamily: 'Google Sans',
    fontSize: 24,
    marginTop: theme.spacing(4),
  },
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const HiddenArticlesDialogComponent = ({
  primaryText,
  secondaryText,
  dialogContentText,
  inputPlaceholder,
  data,
  action,
}) => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleBannedItemAdd = (e) => {
    e.preventDefault()
    const inputValue = e.target.input.value

    if (inputValue === '' || !inputValue) return
    else {
      if (data.some((e: string) => e === inputValue)) return
      dispatch(action([...data, inputValue]))
      e.target.input.value = ''
    }
  }

  const BannedListItem = ({ text }: { text: string }) => {
    const [alertDialogOpen, setAlertOpen] = React.useState(false)
    const handleBannedItemClick = () => setAlertOpen(true)
    const handleAlertClose = () => setAlertOpen(false)
    const handleAlertCloseWithDeletion = () => {
      const newData = data.filter((e) => e !== text)
      dispatch(action(newData))
      setAlertOpen(false)
    }

    return (
      <>
        <ListItem>
          <ListItemText>{text}</ListItemText>
          <IconButton onClick={handleBannedItemClick}>
            <CloseRoundedIcon />
          </IconButton>
        </ListItem>
        <Dialog open={alertDialogOpen} onClose={handleAlertClose}>
          <DialogTitle id="alert-dialog-title">Подтверждение</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Точно хочешь удалить из списка <b>{text}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color="default">
              Нет, оставить
            </Button>
            <Button
              onClick={handleAlertCloseWithDeletion}
              color="primary"
              variant="contained"
              disableElevation
              autoFocus
            >
              Да, удалить
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText primary={primaryText} secondary={secondaryText} />
      </ListItem>
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <IconButton onClick={handleClose} style={{ marginRight: 8 }}>
            <BackRoundedIcon />
          </IconButton>
          <Typography variant="h6">{primaryText}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
          <form method="POST" onSubmit={(e) => handleBannedItemAdd(e)}>
            <Paper elevation={0} className={classes.dialogInputPaper}>
              <InputBase
                placeholder={inputPlaceholder}
                classes={{
                  root: classes.dialogInputRoot,
                  input: classes.dialogInput,
                }}
                name="input"
              />
              <Button
                disableElevation
                type="submit"
                color="primary"
                variant="contained"
                className={classes.dialogInputAddButton}
              >
                Добавить
              </Button>
            </Paper>
          </form>

          {/** List for banned items */}
          {data.length !== 0 ? (
            <List>
              {data.map((e: string, i: number) => (
                <BannedListItem key={i} text={e} />
              ))}
            </List>
          ) : (
            <Typography className={classes.nothingHere}>Пусто!</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const HiddenAuthorsListItem = () => {
  const hiddenAuthors = useSelector((state) => state.settings.hiddenAuthors)
  const hiddenAuthorsCount = numToWord.convert(hiddenAuthors.length, {
    currency: {
      currencyNameCases: ['автор', 'автора', 'авторов'],
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })

  return (
    <HiddenArticlesDialogComponent
      data={hiddenAuthors}
      action={setHiddenAuthors}
      inputPlaceholder="Имя автора"
      primaryText="Скрыть авторов"
      secondaryText={
        hiddenAuthors.length === 0
          ? ''
          : `Больше не показывается ${hiddenAuthorsCount}`
      }
      dialogContentText="Здесь находятся те авторы, которых ты не любишь. Они пропадут из новостной ленты, а вместо них появится табличка о том, что здесь был тролль."
    />
  )
}

const HiddenCompaniesListItem = () => {
  const hiddenCompanies = useSelector((state) => state.settings.hiddenCompanies)
  const hiddenCompaniesCount = numToWord.convert(hiddenCompanies.length, {
    currency: {
      currencyNameCases: ['компания', 'компаний', 'компанию'],
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })

  return (
    <HiddenArticlesDialogComponent
      data={hiddenCompanies}
      action={setHiddenCompanies}
      inputPlaceholder="Название компании"
      primaryText="Скрыть компании"
      secondaryText={
        hiddenCompanies.length === 0
          ? ''
          : `Больше не показывается ${hiddenCompaniesCount}`
      }
      dialogContentText="Здесь находятся те компании, которых ты не любишь. Они пропадут из новостной ленты, а вместо них появится табличка о том, что здесь был тролль."
    />
  )
}

const ThemeMenuListItem = () => {
  const themeType = useSelector((state) => state.settings.themeType)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>()
  const themeName =
    THEME_NAMES[themeType][0].toLowerCase() + THEME_NAMES[themeType].slice(1)
  const dispatch = useDispatch()

  const themeChange = (themeType: PaletteType) => {
    dispatch(setTheme(themeType))
    localStorage.setItem('theme', themeType)
  }

  const handleThemeMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleThemeMenuItemClick = (
    _e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    themeChange(THEMES[index])
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ListItem
        aria-haspopup="true"
        aria-controls="theme-menu"
        button
        onClick={handleThemeMenuClick}
      >
        <ListItemText
          primary="Выбрать тему"
          secondary={`Сейчас ${
            themeType === 'sepia' ? 'выбран' : 'выбрана'
          } ${themeName}`}
        />
      </ListItem>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        id="theme-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {THEMES.map((option, index) => (
          <MenuItem
            style={{ minWidth: 256 }}
            key={option}
            selected={THEMES[index] === themeType}
            onClick={(event) => handleThemeMenuItemClick(event, index)}
          >
            {THEME_NAMES[option]}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const Settings = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      style={{ width: '100%', height: '100%' }}
    >
      <Grid item>
        <Container className={classes.title}>
          <Typography>Настройки</Typography>
        </Container>
        <Divider />
      </Grid>

      <Grid style={{ overflow: 'auto' }} item>
        <List style={{ overflow: 'auto' }} className={classes.list}>
          <ThemeMenuListItem />
          <HiddenAuthorsListItem />
          <HiddenCompaniesListItem />
        </List>
      </Grid>
    </Grid>
  )
}

export default React.memo(Settings)

import React, { useEffect, useRef, useState } from 'react'
import {
  AppBar,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  fade,
  FormControlLabel,
  Grid,
  IconButton,
  PaletteType,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import { Alert } from '@material-ui/lab'
import { MIN_WIDTH } from 'src/config/constants'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import BottomDrawer from 'src/components/blocks/BottomDrawer'
import { HexColorPicker } from 'react-colorful'
import { CustomTheme } from 'src/interfaces/UserSettings'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks'
import { setSettings } from 'src/store/actions/settings'
import { useSnackbar } from 'notistack'

interface PaletteGridItem {
  text: string
  color: string
}

interface PaletteItem {
  title: string
  items: PaletteGridItem[]
}

interface CurrentTheme {
  palette: Omit<CustomTheme, 'name'>
}

interface StyleProps {
  currentTheme: CurrentTheme
}

interface ColorPickerState {
  open: boolean
  color?: string
  item?: string
}

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      border: '1px solid ' + fade(theme.palette.divider, 0.05),
      borderRadius: 8,
    },
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1.5),
    paddingBottom: '0 !important',
  },
  padding: {
    padding: theme.spacing(1.8, 2),
  },
  infoAlert: {
    backgroundColor: 'rgb(0 107 204 / 7%)',
    marginTop: theme.spacing(1.8),
    borderRadius: 0,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  themeNameInput: {
    marginTop: theme.spacing(3),
  },
}))

const usePreviewStyles = makeStyles((theme) => ({
  box: {
    background: theme.palette.background.default,
    margin: theme.spacing(0, 2, 1.8, 2),
    borderRadius: 8,
    padding: theme.spacing(1.8, 2),
  },
  paper: {
    height: 128,
    marginBottom: theme.spacing(1.8),
  },
  button: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1.8),
  },
  appbar: {
    backgroundColor: theme.palette.background.paper,
    height: 49,
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    borderRadius: 8,
    zIndex: 1,
  },
  toolbar: {
    margin: 'auto',
    minHeight: 'unset',
    height: 48,
    padding: 0,
    maxWidth: MIN_WIDTH,
    width: '100%',
    flexDirection: 'column',
  },
  headerTitle: {
    fontWeight: 800,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Google Sans',
  },
  appbarContent: {
    display: 'flex',
    alignItems: 'center',
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    height: '100%',
  },
  dividerWrapper: {
    background: theme.palette.background.paper,
    display: 'flex',
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
  },
}))

const usePaletteGridItemStyles = makeStyles((theme) => ({
  gridItem: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
    borderRadius: 4,
    transition: 'all 250ms 0ms cubic-bezier(0.25, 1, 0.25, 1)',
  },
  box: {
    width: 48,
    height: 48,
    flexShrink: 0,
    marginRight: theme.spacing(1),
    borderRadius: 4,
  },
  gridItemTitle: {
    marginTop: theme.spacing(3),
  },
  textHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    flexGrow: 1,
  },
  iconHolder: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
  },
  icon: {
    transform: 'scale(0.5)',
    opacity: 0,
    transition: 'all 250ms 0ms cubic-bezier(0.25, 1, 0.25, 1)',
  },
  checked: {
    transform: 'scale(1)',
    opacity: 1,
  },
  checkedBackground: {
    background: fade(theme.palette.text.primary, 0.05),
  },
}))

const useColorPickerStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: getContrastPaperColor(theme),
    position: 'relative',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      border: '1px solid ' + fade(theme.palette.divider, 0.05),
      marginTop: theme.spacing(1.5),
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper,
    },
  },
  header: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1.5),
    paddingBottom: 0,
    padding: theme.spacing(1.5, 2),
  },
}))

const PaletteGridItem = ({
  title,
  items,
  setColorPickerState,
}: {
  title: string
  items: PaletteItem['items']
  setColorPickerState: React.Dispatch<React.SetStateAction<ColorPickerState>>
}) => {
  const theme = useTheme()
  const classes = usePaletteGridItemStyles()
  const handleClick = (item: PaletteGridItem) => {
    setColorPickerState({
      open: true,
      color: item.color,
      item: item.text,
    })
  }

  return (
    <>
      <Typography gutterBottom className={classes.gridItemTitle}>
        {title}
      </Typography>
      <Grid container spacing={1}>
        {items.map((e, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.gridItem}
            component={ButtonBase}
            onClick={() => handleClick(e)}
          >
            <div
              className={classes.box}
              style={{
                backgroundColor: e.color,
                border:
                  'background.paper' === e.text ||
                  'background.default' === e.text
                    ? '1px solid ' + theme.palette.divider
                    : null,
              }}
            />
            <div className={classes.textHolder}>
              <Typography variant="body2">{e.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                {e.color}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const paletteTextToThemeField = {
  'primary.light': (t: CurrentTheme, c: string) => {
    t.palette.primary.light = c
    return t
  },
  'primary.main': (t: CurrentTheme, c: string) => {
    t.palette.primary.main = c
    return t
  },
  'primary.dark': (t: CurrentTheme, c: string) => {
    t.palette.primary.dark = c
    return t
  },
  'background.paper': (t: CurrentTheme, c: string) => {
    t.palette.background.paper = c
    return t
  },
  'background.default': (t: CurrentTheme, c: string) => {
    t.palette.background.default = c
    return t
  },
  'text.primary': (t, c) => {
    t.palette.text.primary = c
    t.palette.text.secondary = fade(c, 0.54)
    t.palette.text.disabled = fade(c, 0.38)
    t.palette.text.hint = fade(c, 0.38)
    return t
  },
}

const ColorPicker = ({
  setState,
  state,
  setCurrentTheme,
}: {
  setState: React.Dispatch<React.SetStateAction<ColorPickerState>>
  state: ColorPickerState
  setCurrentTheme: React.Dispatch<React.SetStateAction<CurrentTheme>>
}) => {
  const classes = useColorPickerStyles()
  const [color, setColor] = useState(state.color)
  const handleSubmit = () => {
    setCurrentTheme((theme) =>
      paletteTextToThemeField[state.item](theme, color)
    )
    setState({
      open: false,
    })
  }

  useEffect(() => {
    state.open && setColor(state.color)
  }, [state.color])

  return (
    <BottomDrawer isOpen={state.open} headerText={'Выбор цвета'} disableClose>
      <HexColorPicker color={color} onChange={setColor} />
      {color ? color.toString() : 'null'}
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleSubmit}
      >
        Сохранить
      </Button>
    </BottomDrawer>
  )
}

const getPaletteItems = (theme: CurrentTheme) => [
  {
    title: 'Акцент',
    items: [
      {
        text: 'primary.light',
        color: theme.palette.primary.light,
      },
      {
        text: 'primary.main',
        color: theme.palette.primary.main,
      },
      {
        text: 'primary.dark',
        color: theme.palette.primary.dark,
      },
    ],
  },
  {
    title: 'Поверхности',
    items: [
      {
        text: 'background.paper',
        color: theme.palette.background.paper,
      },
      {
        text: 'background.default',
        color: theme.palette.background.default,
      },
    ],
  },
  {
    title: 'Текст',
    items: [
      {
        text: 'text.primary',
        color: theme.palette.text.primary,
      },
    ],
  },
]

const PreviewBox = ({ currentTheme }: { currentTheme: CurrentTheme }) => {
  const rootClasses = useStyles()
  const classes = usePreviewStyles()
  const buttonVariants: ['contained', 'outlined', 'text'] = [
    'contained',
    'outlined',
    'text',
  ]

  return (
    <ThemeProvider theme={createMuiTheme(currentTheme)}>
      <div className={rootClasses.section}>
        <Typography
          className={[rootClasses.sectionHeader, rootClasses.padding].join(' ')}
        >
          Предпросмотр
        </Typography>
        <div className={classes.box}>
          <Grid container spacing={2}>
            {[1, 3, 5].map((e, i) => (
              <Grid item key={i} xs={4}>
                <Paper elevation={e} className={classes.paper} />
              </Grid>
            ))}
          </Grid>
          <AppBar position="relative" className={classes.appbar} elevation={0}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.appbarContent}>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  className={classes.headerTitle}
                >
                  habra.
                </Typography>
              </div>
              <div className={classes.dividerWrapper}>
                <Divider style={{ width: '100%' }} />
              </div>
            </Toolbar>
          </AppBar>
          <Grid container alignItems="center">
            {buttonVariants.map((e, i) => (
              <Button
                className={classes.button}
                key={i}
                variant={e}
                color="primary"
                disableElevation
              >
                Кнопка
              </Button>
            ))}
          </Grid>
          <Typography color="textPrimary">
            У этого текста цвет text.primary
          </Typography>
          <Typography color="textSecondary">
            А у этого - text.secondary
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  )
}

const NewTheme = () => {
  const theme = useTheme()
  const [colorPickerState, setColorPickerState] = useState<ColorPickerState>({
    open: false,
    color: null,
    item: null,
  })
  const defaultTheme = {
    palette: {
      type: theme.palette.type,
      primary: {
        main: theme.palette.primary.main,
        light: theme.palette.primary.light,
        dark: theme.palette.primary.dark,
      },
      background: {
        paper: theme.palette.background.paper,
        default: theme.palette.background.default,
      },
      text: {
        primary: theme.palette.text.primary,
        secondary: theme.palette.text.secondary,
        hint: theme.palette.text.hint,
        disabled: theme.palette.text.disabled,
      },
    },
  }
  const [isTitleEditDialogOpen, setTitleEditDialogOpen] = useState(false)
  const [themeTitle, setThemeTitle] = useState('Новая тема')
  const titleInputRef = useRef<HTMLInputElement>()
  const [currentTheme, setCurrentTheme] = useState<CurrentTheme>(defaultTheme)
  const classes = useStyles()
  const customThemes = useSelector(store => store.settings.customThemes)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const paletteItems = React.useMemo(() => getPaletteItems(currentTheme), [
    JSON.stringify(currentTheme),
  ])

  const handleSaveClick = () => {
    const customTheme: CustomTheme = {
      ...currentTheme.palette,
      name: themeTitle
    }
    dispatch(setSettings({
      customThemes: customThemes.concat([customTheme])
    }))
    enqueueSnackbar('Тема сохранена', {
      variant: 'success',
      autoHideDuration: 3000,
    })
  }
  const handleTitleEditClick = () => {
    setTitleEditDialogOpen(true)
  }
  const handleTitleEditDialogClose = () => {
    if (titleInputRef.current.value) {
      setThemeTitle(titleInputRef.current.value)
      setTitleEditDialogOpen(false)
    }
  }
  const handleThemeTypeChange = (_event, type: string) => {
    setCurrentTheme((prev) => ({
      palette: {
        ...prev.palette,
        type: type as PaletteType,
      },
    }))
  }

  const toolbarIcons = (
    <>
      <IconButton onClick={handleTitleEditClick}>
        <EditRoundedIcon />
      </IconButton>
      <IconButton onClick={handleSaveClick}>
        <SaveRoundedIcon />
      </IconButton>
      <Dialog open={isTitleEditDialogOpen} onClose={handleTitleEditDialogClose}>
        <DialogTitle>Название темы</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Название новой темы должно быть уникально, оно будет отображаться в
            настройках рядом с темами по умолчанию. Это название можно будет
            поменять.
          </DialogContentText>
          <TextField
            inputRef={titleInputRef}
            autoFocus
            margin="dense"
            name="title"
            label="Название темы"
            type="text"
            autoComplete="off"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTitleEditDialogClose} color="primary">
            Отмена
          </Button>
          <Button color="primary" onClick={handleTitleEditDialogClose}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

  return (
    <OutsidePage
      hidePositionBar
      disableShrinking
      headerText={themeTitle}
      toolbarIcons={toolbarIcons}
    >
      <Alert severity="info" className={classes.infoAlert}>
        Чтобы поменять цвет в теме, нажмите на его поле, а затем выберите нужный
        цвет.
      </Alert>
      <PreviewBox currentTheme={currentTheme} />
      <div className={classes.section}>
        <div className={classes.padding}>
          <Typography className={classes.sectionHeader}>Палитра</Typography>
          <div>
            <Typography gutterBottom>Тип темы</Typography>
            <RadioGroup
              value={currentTheme.palette.type}
              onChange={handleThemeTypeChange}
            >
              <FormControlLabel
                value="light"
                control={<Radio color="primary" />}
                label={'Светлая'}
              />
              <FormControlLabel
                value="dark"
                control={<Radio color="primary" />}
                label={'Тёмная'}
              />
            </RadioGroup>
            {paletteItems.map((e, i) => (
              <PaletteGridItem
                key={i}
                items={e.items}
                title={e.title}
                setColorPickerState={setColorPickerState}
              />
            ))}
          </div>
        </div>
      </div>
      <ColorPicker
        setCurrentTheme={setCurrentTheme}
        state={colorPickerState}
        setState={setColorPickerState}
      />
    </OutsidePage>
  )
}

export default NewTheme

import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
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
  Fade,
  fade,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
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
import { Alert } from '@material-ui/lab'
import { MIN_WIDTH } from 'src/config/constants'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import BottomDrawer from 'src/components/blocks/BottomDrawer'
import { HexColorPicker } from 'react-colorful'
import { CustomTheme } from 'src/interfaces/UserSettings'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks'
import { setSettings } from 'src/store/actions/settings'
import { useSnackbar } from 'notistack'
import tinycolor from 'tinycolor2'
import {
  deepPurple,
  pink,
  red,
  purple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from '@material-ui/core/colors'
import { Redirect, useHistory, useParams } from 'react-router'

interface PaletteGridItem {
  text: string
  color: string
}

interface PaletteItem {
  title: string
  items: PaletteGridItem[]
}

interface ColorPickerState {
  open: boolean
  color?: string
  item?: string
}

const COLOR_PICKER_PRESET_COLORS = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
]

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
  deleteIcon: {
    transition: 'all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',
    marginRight: ({
      isAlreadySavedLocally = false,
    }: {
      isAlreadySavedLocally?: boolean
    }) => (isAlreadySavedLocally ? 0 : -48),
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
  picker: {
    width: '100% !important',
    height: '256px !important',
    '& .react-colorful': {
      width: '100%',
    },
  },
  swatches: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  swatch: {
    width: 32,
    height: 32,
    margin: 4,
    border: 'none !important',
    padding: 0,
    borderRadius: 4,
    outline: 'none',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': fade(theme.palette.divider, 0.3),
  },
  input: {
    color: theme.palette.text.primary,
    width: '100%',
    fontWeight: 500,
  },
  preview: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'start',
    borderRadius: 4,
    transition: 'all 250ms 0ms cubic-bezier(0.25, 1, 0.25, 1)',
    marginBottom: theme.spacing(2),
  },
  box: {
    width: 24,
    height: 24,
    flexShrink: 0,
    marginRight: theme.spacing(2),
    borderRadius: '50%',
  },
  inputHolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    flexGrow: 1,
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
  'primary.light': (t: CustomTheme, c: string) => {
    t.palette.primary.light = c
    return t
  },
  'primary.main': (t: CustomTheme, c: string) => {
    t.palette.primary.main = c
    return t
  },
  'primary.dark': (t: CustomTheme, c: string) => {
    t.palette.primary.dark = c
    return t
  },
  'background.paper': (t: CustomTheme, c: string) => {
    t.palette.background.paper = c
    return t
  },
  'background.default': (t: CustomTheme, c: string) => {
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

const CustomColorfulPicker = ({ color, presetColors, onChange, ...props }) => {
  const classes = useColorPickerStyles()
  const hexString = useMemo(() => {
    return color.startsWith('#') ? color : tinycolor(color).toHexString()
  }, [color])

  return (
    <>
      <HexColorPicker
        className={classes.picker}
        onChange={onChange}
        color={hexString}
        {...props}
      />
      <div className={classes.swatches}>
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className={classes.swatch}
            style={{ background: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </>
  )
}

const ColorPicker = ({
  setState,
  state,
  setCurrentTheme,
}: {
  setState: React.Dispatch<React.SetStateAction<ColorPickerState>>
  state: ColorPickerState
  setCurrentTheme: React.Dispatch<React.SetStateAction<CustomTheme>>
}) => {
  const classes = useColorPickerStyles()
  const theme = useTheme()
  const [color, setColor] = useState(state.color)
  const handleSubmit = () => {
    setCurrentTheme((theme) =>
      paletteTextToThemeField[state.item](theme, color)
    )
    setState({
      open: false,
    })
  }
  const handleCancel = () => {
    setState({
      open: false,
      item: state.item,
      color,
    })
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value)
  }

  useEffect(() => {
    state.open && setColor(state.color)
  }, [state.color])

  return (
    <BottomDrawer isOpen={state.open} disableClose headerText={'Выбор цвета'}>
      <div className={classes.preview}>
        <div
          className={classes.box}
          style={{
            backgroundColor: color,
            border:
              theme.palette.background.paper === color
                ? '1px solid ' + theme.palette.divider
                : null,
          }}
        />
        <div className={classes.inputHolder}>
          <InputBase
            endAdornment={<EditRoundedIcon color="disabled" />}
            value={color}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div>
      </div>
      <CustomColorfulPicker
        presetColors={COLOR_PICKER_PRESET_COLORS}
        color={color}
        onChange={setColor}
      />
      <Grid container direction="row" spacing={1}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="text"
            disableElevation
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </BottomDrawer>
  )
}

const getPaletteItems = (theme: CustomTheme) => [
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

const PreviewBox = ({ currentTheme }: { currentTheme: CustomTheme }) => {
  const rootClasses = useStyles({})
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

const NewTheme = ({ isEditMode = false }: { isEditMode?: boolean }) => {
  const theme = useTheme()
  const history = useHistory()
  const customThemes = useSelector((store) => store.settings.customThemes)
  const { themeType: paramsThemeType } = useParams<{ themeType: string }>()
  const editTheme =
    isEditMode && customThemes.find((e) => e.type === paramsThemeType)

  if (isEditMode && !editTheme) {
    return <Redirect to="/settings/appearance" />
  }

  const [colorPickerState, setColorPickerState] = useState<ColorPickerState>({
    open: false,
    color: null,
    item: null,
  })
  const defaultTheme = {
    name: 'Новая тема',
    type: Date.now().toString(),
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
  const titleInputRef = useRef<HTMLInputElement>()
  const [isTitleEditDialogOpen, setTitleEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false)
  const [hasBeenEdited, setHasBeenEdited] = useState<boolean>(false)
  const [currentTheme, setCurrentThemeUnwrapped] = useState<CustomTheme>(
    isEditMode ? editTheme : defaultTheme
  )
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const paletteItems = React.useMemo(() => getPaletteItems(currentTheme), [
    JSON.stringify(currentTheme),
  ])
  const isAlreadySavedLocally = React.useMemo(
    () => customThemes.some((e) => e.type === currentTheme.type),
    [customThemes]
  )
  const classes = useStyles({ isAlreadySavedLocally })
  const setCurrentTheme: React.Dispatch<React.SetStateAction<CustomTheme>> = (
    ...props
  ) => {
    !hasBeenEdited && setHasBeenEdited(true)
    setCurrentThemeUnwrapped(...props)
  }

  const handleSaveClick = () => {
    const newCustomThemes = [...customThemes]
    if (isAlreadySavedLocally) {
      const themeIndex = newCustomThemes.findIndex(
        (e) => e.type === currentTheme.type
      )
      newCustomThemes.splice(themeIndex, 1, currentTheme)
    } else {
      newCustomThemes.push(currentTheme)
    }

    dispatch(
      setSettings({
        customThemes: newCustomThemes,
      })
    )
    setHasBeenEdited(false)
    enqueueSnackbar('Тема сохранена', {
      variant: 'success',
      autoHideDuration: 3000,
    })
  }
  const handleSaveDialogCancel = () => setSaveDialogOpen(false)
  const handleSaveDialogSubmit = () => {
    handleSaveClick()
    setSaveDialogOpen(false)
    history.push('/settings/appearance')
  }
  const handleDeleteClick = () => setDeleteDialogOpen(true)
  const handleDeleteDialogCancel = () => setDeleteDialogOpen(false)
  const handleDeleteDialogSubmit = () => {
    const newCustomThemes = [...customThemes]
    const themeIndex = newCustomThemes.findIndex(
      (e) => e.type === currentTheme.type
    )
    newCustomThemes.splice(themeIndex, 1)
    dispatch(
      setSettings({
        customThemes: newCustomThemes,
        themeType: 'light',
      })
    )
    enqueueSnackbar('Тема удалена', {
      variant: 'success',
      autoHideDuration: 3000,
    })
    history.push('/settings/appearance')
    setDeleteDialogOpen(false)
  }
  const handleTitleEditClick = () => setTitleEditDialogOpen(true)
  const handleTitleEditDialogCancel = () => setTitleEditDialogOpen(false)
  const handleTitleEditDialogSubmit = () => {
    if (titleInputRef.current.value) {
      setCurrentTheme((prev) => ({
        ...prev,
        name: titleInputRef.current.value,
      }))
      setTitleEditDialogOpen(false)
    }
  }
  const handleThemeTypeChange = (_event, type: string) => {
    setCurrentTheme((prev) => ({
      ...prev,
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
      <IconButton onClick={handleSaveClick} disabled={!hasBeenEdited}>
        <SaveRoundedIcon />
      </IconButton>
      <Fade in={isAlreadySavedLocally}>
        <IconButton onClick={handleDeleteClick} className={classes.deleteIcon}>
          <DeleteRoundedIcon />
        </IconButton>
      </Fade>

      {/** Title edit Dialog */}
      <Dialog
        open={isTitleEditDialogOpen}
        onClose={handleTitleEditDialogCancel}
      >
        <DialogTitle>Название темы</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Название будет отображаться в настройках рядом с темами по
            умолчанию. Это название можно будет поменять.
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
          <Button onClick={handleTitleEditDialogCancel} color="primary">
            Отмена
          </Button>
          <Button color="primary" onClick={handleTitleEditDialogSubmit}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/** Delete theme Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogCancel}>
        <DialogTitle>Удалить тему</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Созданную тему будет невозможно восстановить. Вы точно хотите её
            удалить?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogCancel} color="primary">
            Отмена
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={handleDeleteDialogSubmit}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

  const onBackClick = (backLinkFunction: () => void) => {
    // We need to update current theme if it was edited, so colors will be updated
    if (hasBeenEdited && isEditMode) {
      dispatch(
        setSettings({
          themeType: currentTheme.type,
        })
      )
    }

    // If the theme was edited, but user wants to exit, show saving warning dialog
    if (hasBeenEdited) {
      setSaveDialogOpen(true)
    } else {
      // Otherwise, exit the page.
      backLinkFunction()
    }
  }

  return (
    <OutsidePage
      hidePositionBar
      disableShrinking
      headerText={currentTheme.name}
      toolbarIcons={toolbarIcons}
      onBackClick={onBackClick}
    >
      {/** Save theme Dialog */}
      <Dialog open={isSaveDialogOpen} onClose={handleSaveDialogCancel}>
        <DialogTitle>Cохранение</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Остались несохранённые изменения, сохранить?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveDialogCancel} color="primary">
            Отмена
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={handleSaveDialogSubmit}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

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

export default React.memo(NewTheme)

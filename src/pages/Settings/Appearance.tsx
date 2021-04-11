import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'
import { useSelector } from 'src/hooks'
import {
  BACKGROUND_COLORS_DEFAULT,
  BACKGROUND_COLORS_PAPER,
  MIN_WIDTH,
  PaletteType,
  THEMES,
  THEME_NAMES,
  THEME_PRIMARY_COLORS,
  THEME_TEXT_COLORS,
} from 'src/config/constants'
import {
  Radio,
  Typography,
  Grid,
  useTheme,
  GridSize,
  ButtonBase,
  FormControl,
  darken,
  lighten,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  fade,
  useMediaQuery,
} from '@material-ui/core'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import fadedLinearGradient from 'src/utils/fadedLinearGradient'
import useMediaExtendedQuery from 'src/hooks/useMediaExtendedQuery'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import getInvertedContrastPaperColor from 'src/utils/getInvertedContrastPaperColor'
import isMobile from 'is-mobile'
import isDarkTheme from 'src/utils/isDarkTheme'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 12,
    paddingBottom: theme.spacing(1.5),
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
    paddingBottom: 0,
    padding: theme.spacing(1.5, 2),
  },
  singleRowGrid: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  oneByTwoGrid: {
    display: 'none',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  previewContainer: {
    position: 'relative',
    background: fadedLinearGradient(theme),
  },
  themeCardsContainer: {
    whiteSpace: 'nowrap',
    flexDirection: 'row',
    alignItems: 'baseline',
    display: 'flex',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingTop: 1,
    // Do not change the scrollbar on mobile due to design flaws
    // If the -webkit-scrollbar is empty, any other scrollbar style will not be applied.
    '&::-webkit-scrollbar': !isMobile() && {
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.default, 0.03)
        : theme.palette.background.paper,
      border: '1px solid ' + darken(theme.palette.background.paper, 0.05),
      borderRadius: 4,
      height: 12,
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 12,
      borderRadius: 4,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
  newThemeButton: {
    marginRight: theme.spacing(2),
    display: 'inline-flex',
    marginLeft: theme.spacing(2),
    justifyContent: 'center',
    height: 128,
    width: 96,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'column',
    background: getInvertedContrastPaperColor(theme),
    boxShadow: '0 0 0 1px ' + theme.palette.divider,
  },
  newThemeButtonText: {
    fontSize: 14,
    marginTop: theme.spacing(0.5),
  },
}))

const usePaletteGridItemStyles = makeStyles((theme) => ({
  gridItem: {
    position: 'relative',
    alignItems: 'baseline',
    justifyContent: 'start',
    width: '100%',
    '&::before': {
      content: '""',
      paddingBottom: (p: number) => p * 100 + '%',
    },
  },
  floatText: {
    position: 'absolute',
    marginTop: 4,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 700,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 'calc(100% - ' + theme.spacing(2) + 'px)',
  },
  floatSubtext: {
    position: 'absolute',
    marginTop: 22,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    opacity: 0.8,
    maxWidth: 'calc(100% - ' + theme.spacing(2) + 'px)',
  },
  paletteSymbolContainer: {
    height: 30,
    left: '50%',
    position: 'absolute',
    top: '50%',
    width: 30,
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 700,
    background: theme.palette.getContrastText(theme.palette.primary.main),
    color: theme.palette.primary.main,
    borderRadius: '50%',
  },
}))

const useThemeCardStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    '&:last-child': {
      paddingRight: theme.spacing(2),
    },
  },
  border: {
    boxShadow: '0 0 0 1px ' + theme.palette.divider,
  },
  box: {
    height: 128,
    width: 96,
    borderRadius: 12,
    alignItems: 'baseline',
  },
  item: {
    height: '50%',
  },
  type: {
    fontSize: 14,
    marginTop: theme.spacing(0.5),
  },
  radioHolder: {
    height: '50%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    color: ({ color }: { color: string }) => color,
  },
  radioChecked: {
    color: theme.palette.primary.main,
  },
}))

const ThemeCard = ({ type }: { type: PaletteType }) => {
  const paper = BACKGROUND_COLORS_PAPER[type]
  const defaultColor = BACKGROUND_COLORS_DEFAULT[type]
  const primaryColor = THEME_PRIMARY_COLORS[type]
  const textColor = THEME_TEXT_COLORS[type]
  const dispatch = useDispatch()
  const classes = useThemeCardStyles({ color: textColor.primary })
  const themeType = useSelector((state) => state.settings.themeType)
  const isCurrent = themeType === type
  const changeTheme: React.MouseEventHandler<HTMLButtonElement> = (_event) => {
    if (!isCurrent) dispatch(setSettings({ themeType: type }))
  }

  return (
    <div className={classes.root}>
      <Grid
        component={ButtonBase}
        onClick={changeTheme}
        container
        justify="center"
        className={`${classes.box} ${isCurrent ? classes.border : ''}`}
        style={{ background: paper }}
      >
        <Grid
          item
          xs={6}
          style={{ background: primaryColor.main, borderTopLeftRadius: 12 }}
          className={classes.item}
        />
        <Grid
          item
          xs={6}
          style={{ background: defaultColor, borderTopRightRadius: 12 }}
          className={classes.item}
        />
        <div className={classes.radioHolder}>
          <Radio
            disableRipple
            value={type}
            color="primary"
            checked={isCurrent}
            classes={{
              colorPrimary: classes.radio,
            }}
          />
        </div>
      </Grid>
      <Typography className={classes.type}>{THEME_NAMES[type]}</Typography>
    </div>
  )
}

const PaletteGridItem = ({
  width,
  color,
  text,
  withSymbol,
  height = 1,
}: {
  width: number
  color: string
  text: string
  withSymbol?: boolean
  height?: number
}) => {
  const theme = useTheme()
  const classes = usePaletteGridItemStyles(height)

  return (
    <Grid
      item
      component={ButtonBase}
      xs={width as boolean | GridSize}
      className={classes.gridItem}
      style={{
        background: color,
        color: theme.palette.getContrastText(color),
      }}
    >
      <Typography className={classes.floatText}>{text}</Typography>
      <Typography className={classes.floatSubtext}>{color}</Typography>
      {withSymbol && <span className={classes.paletteSymbolContainer}>P</span>}
    </Grid>
  )
}

const Switcher = ({
  onClick: onSwitcherClick = null,
  primary,
  secondary,
  checked = false,
}) => {
  const [isChecked, setChecked] = useState(checked)
  const onClick = () => {
    setChecked(prev => !prev)
    onSwitcherClick()
  }

  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary={primary} secondary={secondary} />
      <Switch disableRipple checked={isChecked} color="primary" />
    </ListItem>
  )
}

const Appearance = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const autoChangeTheme = useSelector((state) => state.settings.autoChangeTheme)

  const oneByTwoGrid = (
    <div className={classes.oneByTwoGrid}>
      <Grid item xs={6}>
        <Grid container direction="column">
          <PaletteGridItem
            width={12}
            color={theme.palette.primary.main}
            text="main"
            height={0.5}
            withSymbol
          />
          <Grid container direction="row">
            <PaletteGridItem
              width={6}
              height={1}
              color={theme.palette.primary.light}
              text="light"
            />
            <PaletteGridItem
              width={6}
              height={1}
              color={theme.palette.primary.dark}
              text="dark"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <PaletteGridItem
            width={12}
            height={0.5}
            color={theme.palette.background.paper}
            text="paper"
          />
          <Grid container direction="row">
            <PaletteGridItem
              width={6}
              height={1}
              color={theme.palette.background.default}
              text="default"
            />
            <PaletteGridItem
              width={6}
              height={1}
              color={theme.palette.text.primary}
              text="text"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
  const singleRowGrid = (
    <Grid
      item
      xs={12}
      container
      direction="row"
      className={classes.singleRowGrid}
    >
      <PaletteGridItem
        width={2}
        height={1}
        color={theme.palette.primary.light}
        text="light"
      />
      <PaletteGridItem
        width={2}
        height={1}
        color={theme.palette.primary.main}
        text="main"
        withSymbol
      />
      <PaletteGridItem
        width={2}
        height={1}
        color={theme.palette.primary.dark}
        text="dark"
      />
      <PaletteGridItem
        width={2}
        height={1}
        color={theme.palette.background.default}
        text="default"
      />
      <PaletteGridItem
        width={2}
        height={1}
        color={theme.palette.background.paper}
        text="paper"
      />
      <PaletteGridItem
        width={2}
        height={1}
        color={theme.palette.text.primary}
        text="text"
      />
    </Grid>
  )

  return (
    <OutsidePage headerText={'Внешний вид'} disableShrinking>
      <Grid container className={classes.previewContainer} direction="row">
        <Typography className={classes.sectionHeader}>Палитра</Typography>
        {singleRowGrid}
        {oneByTwoGrid}
      </Grid>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>Темы</Typography>
        <FormControl
          component="fieldset"
          aria-label="theme-type"
          name="theme-type"
          className={classes.themeCardsContainer}
        >
          {THEMES.map((e, i) => (
            <ThemeCard type={e} key={i} />
          ))}
          <div style={{ display: 'inline-flex' }}>
            <ButtonBase className={classes.newThemeButton}>
              <AddCircleRoundedIcon />
              <Typography className={classes.newThemeButtonText}>
                Создать
              </Typography>
            </ButtonBase>
          </div>
        </FormControl>
      </div>
      <div className={classes.section}>
        <Typography
          className={classes.sectionHeader}
          style={{ marginBottom: 0 }}
        >
          Настройки
        </Typography>
        <Switcher
          primary="Использовать системную тему"
          secondary="Внешний вид приложения будет меняться автоматически при изменении темы на устройстве"
          checked={autoChangeTheme}
          onClick={() => {
            dispatch(
              setSettings({
                autoChangeTheme: !autoChangeTheme,
              })
            )
          }}
        />
        <ListItem button disabled={!autoChangeTheme}>
          <ListItemText
            primary={'Предпочитаемая светлая тема'}
            secondary={'Светлая'}
          />
        </ListItem>
        <ListItem button disabled={!autoChangeTheme}>
          <ListItemText
            primary={'Предпочитаемая темная тема'}
            secondary={'Тёмная'}
          />
        </ListItem>
      </div>
    </OutsidePage>
  )
}

export default Appearance

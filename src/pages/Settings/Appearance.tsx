import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { useDispatch } from 'react-redux'
import { setTheme } from 'src/store/actions/settings'
import { useSelector } from 'src/hooks'
import { PaletteType, THEMES, THEME_NAMES } from 'src/config/constants'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  useTheme,
  GridSize,
  ButtonBase,
} from '@material-ui/core'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'
import fadedLinearGradient from 'src/utils/fadedLinearGradient'
import useMediaExtendedQuery from 'src/hooks/useMediaExtendedQuery'

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(1.8, 2),
    backgroundColor: getContrastPaperColor(theme),
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1.5),
  },
  previewContainer: {
    position: 'relative',
    // padding: theme.spacing(1.5, 2),
    // background: fadedLinearGradient(theme),
  },
  border: {
    border: '1px solid ' + theme.palette.divider,
  },
  floatText: {
    position: 'absolute',
    marginTop: 4,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 700,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 'calc(100% - ' + theme.spacing(2) + 'px)',
  },
  darkText: {
    color: theme.palette.getContrastText(theme.palette.background.default),
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
  gridItem: {
    position: 'relative',
  },
}))

const Appearance = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isExtended = useMediaExtendedQuery()
  const dispatch = useDispatch()
  const themeType = useSelector((state) => state.settings.themeType)
  const changeTheme = (
    _event: React.ChangeEvent<HTMLInputElement>,
    themeType: string
  ) => {
    dispatch(setTheme(themeType as PaletteType))
  }

  const PaletteGridItem = ({
    width,
    color,
    text,
    darkText,
    withSymbol,
  }: {
    width: number
    color: string
    text: string
    darkText?: boolean
    withSymbol?: boolean
  }) => (
    <Grid
      item
      component={ButtonBase}
      xs={width as boolean | GridSize}
      style={{
        paddingBottom: '50%',
        background: color,
        color: theme.palette.getContrastText(color),
        position: 'relative',
        alignItems: 'baseline',
        justifyContent: 'start',
      }}
    >
      <Typography
        className={classes.floatText + (darkText ? ' ' + classes.darkText : '')}
      >
        {text}
      </Typography>
      {withSymbol && <span className={classes.paletteSymbolContainer}>P</span>}
    </Grid>
  )

  return (
    <OutsidePage headerText={'Внешний вид'} disableShrinking>
      <Grid container className={classes.previewContainer} direction="row">
        <Grid item xs={6}>
          <Grid container direction="column">
            <PaletteGridItem
              width={12}
              color={theme.palette.primary.main}
              text="main"
              withSymbol
            />
            <Grid container direction="row">
              <PaletteGridItem
                width={6}
                color={theme.palette.primary.light}
                text="light"
              />
              <PaletteGridItem
                width={6}
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
              color={theme.palette.background.paper}
              darkText
              text="paper"
            />
            <Grid container direction="row">
              <PaletteGridItem
                width={6}
                color={theme.palette.background.default}
                darkText
                text="default"
              />
              <PaletteGridItem
                width={6}
                color={theme.palette.text.primary}
                text="text"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>Темы</Typography>
        <RadioGroup
          aria-label="theme-type"
          name="theme-type"
          value={themeType}
          onChange={changeTheme}
        >
          {THEMES.map((e, i) => (
            <FormControlLabel
              key={i}
              value={e}
              control={<Radio color="primary" />}
              label={THEME_NAMES[e]}
            />
          ))}
        </RadioGroup>
      </div>
    </OutsidePage>
  )
}

export default Appearance

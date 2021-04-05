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
    width: '100%',
    margin: 0,
    padding: theme.spacing(1.5, 2),
    background: fadedLinearGradient(theme),
  },
  previewItem: {
    display: 'flex',
    alignItems: 'center',
  },
  previewBox: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: theme.spacing(1),
  },
  previewTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  border: {
    border: '1px solid ' + theme.palette.divider,
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
  const primaryPalette = [
    { text: 'palette.primary.light', color: theme.palette.primary.light },
    { text: 'palette.primary.main', color: theme.palette.primary.main },
    { text: 'palette.primary.dark', color: theme.palette.primary.dark },
  ]
  const surfacePalette = [
    {
      text: 'palette.background.default',
      color: theme.palette.background.default,
    },
    { text: 'palette.background.paper', color: theme.palette.background.paper },
  ]

  return (
    <OutsidePage headerText={'Внешний вид'} disableShrinking>
      <Grid container className={classes.previewContainer}>
        <Grid item xs={isExtended ? 6 : 12}>
          <Typography
            variant="body1"
            className={classes.previewTitle}
            style={{ marginTop: 0 }}
          >
            Акцент
          </Typography>
          <Grid container spacing={2}>
            {primaryPalette.map((e, i) => (
              <Grid key={i} item xs={12} className={classes.previewItem}>
                <div
                  className={classes.previewBox}
                  style={{ backgroundColor: e.color }}
                />
                <div>
                  <Typography variant="body2">{e.text}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {e.color}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={isExtended ? 6 : 12}>
          <Typography
            variant="body1"
            className={classes.previewTitle}
            style={{ [isExtended ? 'marginTop' : '']: 0 }}
          >
            Поверхности
          </Typography>
          <Grid container spacing={2}>
            {surfacePalette.map((e, i) => (
              <Grid key={i} item xs={12} className={classes.previewItem}>
                <div
                  className={[classes.previewBox, classes.border].join(' ')}
                  style={{ backgroundColor: e.color }}
                />
                <div>
                  <Typography variant="body2">{e.text}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {e.color}
                  </Typography>
                </div>
              </Grid>
            ))}
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

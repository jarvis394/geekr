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
} from '@material-ui/core'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(1.8, 2),
    backgroundColor: getContrastPaperColor(theme)
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1.5)
  }
}))

const Appearance = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const themeType = useSelector((state) => state.settings.themeType)
  const changeTheme = (
    _event: React.ChangeEvent<HTMLInputElement>,
    themeType: string
  ) => {
    dispatch(setTheme(themeType as PaletteType))
  }

  return (
    <OutsidePage headerText={'Внешний вид'}>
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

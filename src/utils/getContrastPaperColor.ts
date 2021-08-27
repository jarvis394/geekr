import { Theme, ThemeOptions } from '@material-ui/core'
import isDarkTheme from './isDarkTheme'

const getContrastPaperColor = (theme: Theme | ThemeOptions) =>
  theme.palette.background[isDarkTheme(theme) ? 'default' : 'paper']

export default getContrastPaperColor

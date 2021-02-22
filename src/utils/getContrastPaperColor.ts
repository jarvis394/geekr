import { Theme } from '@material-ui/core'
import isDarkTheme from './isDarkTheme'

const getContrastPaperColor = (theme: Theme) =>
  theme.palette.background[isDarkTheme(theme) ? 'default' : 'paper']

export default getContrastPaperColor

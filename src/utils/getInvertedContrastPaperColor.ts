import { Theme } from '@material-ui/core'
import isDarkTheme from './isDarkTheme'

const getInvertedContrastPaperColor = (theme: Theme) =>
  theme.palette.background[isDarkTheme(theme) ? 'paper' : 'default']

export default getInvertedContrastPaperColor

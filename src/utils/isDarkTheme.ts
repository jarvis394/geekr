import { Theme, ThemeOptions } from '@material-ui/core'

const isDarkTheme = (theme: Theme | ThemeOptions) =>
  theme.palette.type === 'dark'

export default isDarkTheme

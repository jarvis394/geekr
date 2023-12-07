import { Theme } from '@material-ui/core'

const isDarkTheme = (theme: Theme) => theme.palette.type === 'dark'

export default isDarkTheme

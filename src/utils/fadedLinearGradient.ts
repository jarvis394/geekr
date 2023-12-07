import { darken, alpha, Theme } from '@material-ui/core'
import isDarkTheme from './isDarkTheme'

export default (theme: Theme) => {
  const t =
    theme.palette.type === 'light'
      ? theme.palette.background.paper
      : darken(theme.palette.background.paper, 0.2)
  const colors = [
    t,
    alpha(t, 0.98),
    alpha(t, 0.94),
    alpha(t, 0.88),
    alpha(t, 0.8),
    alpha(t, 0.71),
    alpha(t, 0.61),
    alpha(t, 0.5),
    alpha(t, 0.39),
    alpha(t, 0.29),
    alpha(t, 0.2),
    alpha(t, 0.12),
    alpha(t, 0.06),
    alpha(t, 0.02),
    alpha(t, 0),
  ]

  return `linear-gradient(to top, ${(isDarkTheme(theme)
    ? colors
    : colors.reverse()
  ).join(',')})`
}

import { darken, fade, lighten, Theme } from '@material-ui/core'

export default (theme: Theme) => {
  const t =
    theme.palette.type === 'light'
      ? lighten(theme.palette.background.default, 1)
      : darken(theme.palette.background.paper, 0.2)
  return `linear-gradient(to top,
    ${t},
    ${fade(t, 0.98)},
    ${fade(t, 0.94)},
    ${fade(t, 0.88)},
    ${fade(t, 0.8)},
    ${fade(t, 0.71)},
    ${fade(t, 0.61)},
    ${fade(t, 0.5)},
    ${fade(t, 0.39)},
    ${fade(t, 0.29)},
    ${fade(t, 0.2)},
    ${fade(t, 0.12)},
    ${fade(t, 0.06)},
    ${fade(t, 0.02)},
    ${fade(t, 0.0)})`
}

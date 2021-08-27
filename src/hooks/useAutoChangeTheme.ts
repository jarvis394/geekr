import { useEffect } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setSettings } from 'src/store/actions/settings'
import useSelector from './useSelector'

const useAutoChangeTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  })
  const isAutoThemeChange = useSelector(
    (state) => state.settings.autoChangeTheme
  )
  const preferredDarkTheme = useSelector(
    (state) => state.settings.preferredDarkTheme
  )
  const preferredLightTheme = useSelector(
    (state) => state.settings.preferredLightTheme
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAutoThemeChange) {
      dispatch(
        setSettings({
          themeType: prefersDarkMode ? preferredDarkTheme : preferredLightTheme,
        })
      )
    }
  }, [
    prefersDarkMode,
    isAutoThemeChange,
    preferredDarkTheme,
    preferredLightTheme,
  ])
}

export default useAutoChangeTheme

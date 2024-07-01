import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import StickyBox from 'react-sticky-box'
import {
  APP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT,
  MIDDLE_WIDTH,
  MIN_WIDTH,
} from 'src/config/constants'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: 300,
    flexDirection: 'column',
  },
}))

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
  // future: https://material-ui.com/components/use-media-query/#server-side-rendering
  // when ssr is implemented, change `noSsr` to false.
  const shouldShowSidebar = useMediaQuery(theme.breakpoints.up(MIN_WIDTH), {
    noSsr: true,
  })
  const disableBottomOffset = useMediaQuery(
    theme.breakpoints.up(MIDDLE_WIDTH),
    {
      noSsr: true,
    }
  )

  return shouldShowSidebar ? (
    <StickyBox
      className={classes.root}
      offsetTop={theme.spacing(1.5) + APP_BAR_HEIGHT}
      offsetBottom={
        theme.spacing(2) + (disableBottomOffset ? 0 : BOTTOM_BAR_HEIGHT)
      }
    >
      {children}
    </StickyBox>
  ) : null
}

export default Sidebar

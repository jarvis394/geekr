import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import StickyBox from 'react-sticky-box'
import { APP_BAR_HEIGHT, BOTTOM_BAR_HEIGHT, MIN_WIDTH } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 300,
    flexDirection: 'column',
    [theme.breakpoints.down(MIN_WIDTH)]: {
      display: 'none'
    }
  },
}))

const Sidebar: React.FC = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <StickyBox
      className={classes.root}
      offsetTop={APP_BAR_HEIGHT}
      offsetBottom={theme.spacing(2) + BOTTOM_BAR_HEIGHT}
    >
      {children}
    </StickyBox>
  )
}

export default Sidebar

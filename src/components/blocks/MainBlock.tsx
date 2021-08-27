import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    marginRight: theme.spacing(2),
    maxWidth: `calc(100% - 300px - ${theme.spacing(2)}px)`,
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down(MIN_WIDTH)]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },
}))

const MainBlock = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default MainBlock

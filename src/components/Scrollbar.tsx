import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  thumb: {
    background: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
  },
}))

const Scrollbar = ({ ...props }) => {
  const classes = useStyles()

  const renderThumb = ({ style, ...props }) => {
    return <div className={classes.thumb} style={{ ...style }} {...props} />
  }

  return (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  )
}

export default Scrollbar

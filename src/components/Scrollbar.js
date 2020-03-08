import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { makeStyles, fade } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  track: { backgroundColor: fade(theme.palette.text.primary, 0.3) }
}))

const Scrollbar = ({ children }) => {
  const classes = useStyles()

  const renderTrack = props => <div {...props} className={classes.track} />

  return (
    <Scrollbars
      renderTrackVertical={renderTrack}
    >
      {children}
    </Scrollbars>
  )
}

export default Scrollbar

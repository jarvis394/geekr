import React from 'react'
import Spoiler from './Spoiler'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    padding: theme.spacing(2),
    'user-select': 'none',
    '& figcaption': {
      color: theme.palette.text.hint,
      fontSize: 14,
      lineHeight: '18px',
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
    '& figure': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
}))

const Details = ({ title, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Spoiler title={title}>{children}</Spoiler>
    </div>
  )
}

export default Details

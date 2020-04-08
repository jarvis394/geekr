import * as React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  redText: { color: theme.palette.error.main },
  greenText: { color: theme.palette.success.main },
}))

interface Props {
  number: string | number
  defaultClass?: string
  style?: React.CSSProperties
  classes?: string
}

const GreenRedNumber = ({
  number,
  defaultClass,
  style,
  classes: additionalClasses,
  ...props
}: Props) => {
  const classes = useStyles()

  let className = defaultClass
  let text = number.toString()
  if (number > 0) {
    text = '+' + text
    className = classes.greenText
  } else if (number < 0) {
    className = classes.redText
  }

  return (
    <Typography
      style={style}
      className={className + ' ' + additionalClasses}
      {...props}
    >
      {text}
    </Typography>
  )
}

export default GreenRedNumber

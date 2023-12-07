import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  redText: { color: theme.palette.error.main + ' !important' },
  greenText: { color: theme.palette.success.main + ' !important' },
}))

interface Props {
  number: string | number
  children?: JSX.Element
  wrapperProps?: Record<string, unknown>
}

const GreenRedNumber = ({ children, wrapperProps = {}, number }: Props) => {
  const classes = useStyles()
  const { className: wrapperPropsClassName, ...otherWrapperProps } =
    wrapperProps
  const wrapperClassName = wrapperPropsClassName
    ? ' ' + wrapperPropsClassName
    : ''
  let className = ''

  if (Number(number) > 0) {
    className = classes.greenText
  } else if (Number(number) < 0) {
    className = classes.redText
  }

  return (
    <div className={className + wrapperClassName} {...otherWrapperProps}>
      {children}
    </div>
  )
}

export default React.memo(GreenRedNumber)

import * as React from 'react'
import { useState } from 'react'
import { makeStyles, Collapse } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: '1px dashed',
    color: theme.palette.primary.light,
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 15,
    position: 'relative',
    '&::before': {
      borderBottom: '5px solid transparent',
      borderLeft: '5px solid ' + theme.palette.text.hint,
      borderTop: '5px solid transparent',
      content: 'no-open-quote',
      display: 'inline-block',
      left: -12,
      position: 'absolute',
      top: '50%',
      transform: (isOpen) =>
        isOpen ? 'rotate(90deg) translateX(-4px)' : 'translateY(-5px)',
      transition: 'transform .2s ease-out,-webkit-transform .2s ease-out',
      verticalAlign: 'middle',
    },
  },
  text: {
    position: 'relative',
    marginTop: 10,
  },
  collapse: {
    marginLeft: theme.spacing(2),
  },
}))

const Spoiler = ({ children, title }) => {
  const [isOpen, setOpenState] = useState(false)
  const classes = useStyles(isOpen)

  return (
    <>
      <b
        onClick={() => setOpenState((prev) => !prev)}
        className={classes.title}
      >
        {title}
      </b>
      <Collapse className={[classes.collapse, classes.text].join(' ')} in={isOpen}>
        {children}
      </Collapse>
    </>
  )
}

export default React.memo(Spoiler)

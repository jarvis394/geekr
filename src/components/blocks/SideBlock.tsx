import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    borderRadius: 8,
    marginTop: theme.spacing(1.5),
    '&:first-child': {
      marginTop: 0
    }
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Google Sans',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '1px',
    color: theme.palette.text.hint,
    lineHeight: 'normal',
    padding: theme.spacing(1.8, 2),
  },
  children: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
    marginBottom: theme.spacing(2),
  },
}))

interface Props {
  title: string
  childrenContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

const SideBlock: React.FC<Props> = ({
  children,
  title,
  childrenContainerProps,
}) => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography className={classes.title}>{title}</Typography>
      </div>
      <div
        {...childrenContainerProps}
        className={childrenContainerProps?.className || classes.children}
      >
        {children}
      </div>
    </section>
  )
}

export default SideBlock

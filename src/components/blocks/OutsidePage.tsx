import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography } from '@material-ui/core'
import BackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import { changeAppBarState } from 'src/store/actions/app'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  header: {},
}))

interface Props {
  children: unknown
  headerText: string
}

const OutsidePage = ({ children, ...props }: Props) => {
  const classes = useStyles()
  const { headerText } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      changeAppBarState({
        isHidden: true,
      })
    )
  })

  return (
    <>
      <div className={classes.header}>
        <IconButton>
          <BackRoundedIcon />
        </IconButton>
        <Typography>{headerText}</Typography>
      </div>
      {children}
    </>
  )
}

export default OutsidePage

import React from 'react'
import { Typography } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
}))

export const Specialisation = ({
  classes: additionalClasses,
}: ComponentWithUserParams) => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.user.data)

  return user.specializm ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Специализация</Typography>
      <Typography>{user.specializm}</Typography>
    </div>
  ) : null
}

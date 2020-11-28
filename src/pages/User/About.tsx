import React from 'react'
import { Typography } from '@material-ui/core'
import FormattedText from 'src/components/formatters/FormattedText'
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

export const About = ({
  classes: additionalClasses,
}: ComponentWithUserParams) => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.user.data)

  return user.description_html ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>О себе</Typography>
      <FormattedText>{user.description_html}</FormattedText>
    </div>
  ) : null
}

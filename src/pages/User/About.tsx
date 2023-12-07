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
  const whois = useSelector((store) => store.profile.profile.whois?.data)

  return whois?.aboutHtml ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>О себе</Typography>
      <FormattedText>{whois.aboutHtml}</FormattedText>
    </div>
  ) : null
}

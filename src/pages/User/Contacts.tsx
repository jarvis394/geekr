import React from 'react'
import { Typography, Grid, Link } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
  contactsItem: {
    margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
  },
}))

export const Contacts = ({
  classes: additionalClasses,
}: ComponentWithUserParams) => {
  const classes = useStyles()
  const whois = useSelector((store) => store.profile.profile.whois.data)

  return whois.contacts.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Контакты</Typography>
      <Grid container>
        {whois.contacts.map((e, i) => (
          <Grid key={i} item className={classes.contactsItem}>
            <Typography>{e.title}</Typography>
            <Link
              className={classes.link}
              href={e.url}
              rel="nofollow noopener"
              target="_blank"
            >
              {e.url}
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  ) : null
}
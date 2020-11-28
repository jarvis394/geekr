import React from 'react'
import { Typography, Grid, Link } from '@material-ui/core'
import parse, { HTMLReactParserOptions } from 'html-react-parser'
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
  const user = useSelector((store) => store.profile.profile.user.data)
  const options: HTMLReactParserOptions = {
    replace: ({ name, children, attribs }): void | React.ReactElement => {
      if (name === 'a') {
        return (
          <Link
            className={classes.link}
            href={attribs.href}
            rel="nofollow noopener"
            target="_blank"
          >
            {children[0].data}
          </Link>
        )
      }
    },
  }
  return user.contacts.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Контакты</Typography>
      <Grid container>
        {user.contacts.map((e, i) => (
          <Grid key={i} item className={classes.contactsItem}>
            <Typography>{e.title}</Typography>
            {parse(e.link, options)}
          </Grid>
        ))}
      </Grid>
    </div>
  ) : null
}

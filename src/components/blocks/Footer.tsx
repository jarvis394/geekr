import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { MIN_WIDTH as minWidth } from 'src/config/constants'
import GitHubIcon from '@material-ui/icons/GitHub'
import { IconButton } from '@material-ui/core'
import VKIcon from 'src/components/svg/VKIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
      4
    )}px`,
    textAlign: 'center',
    maxWidth: minWidth,
    margin: '0 auto',
  },
  logo: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  text: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    WebkitTapHighlightColor: 'transparent',
  },
}))

const Footer = () => {
  const classes = useStyles()
  const buttons = [
    { href: 'https://github.com/jarvis394/habra', icon: GitHubIcon },
    { href: 'https://vk.com/tarnatovski', icon: VKIcon },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Link to={'/'} className={classes.logo}>
          habra.
        </Link>

        <Grid spacing={1} container alignItems="center" justify="center">
          {buttons.map((e, i) => (
            <Grid item key={i}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={e.href}
                className={classes.icon}
              >
                <IconButton>
                  <e.icon />
                </IconButton>
              </a>
            </Grid>
          ))}
        </Grid>

        <div style={{ marginTop: 8 }}>
          <Link to={'/habra-about'} className={classes.text}>
            О проекте
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer

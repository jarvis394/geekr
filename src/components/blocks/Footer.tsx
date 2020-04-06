import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { MIN_WIDTH as minWidth } from 'src/config/constants'
import GitHubIcon from '@material-ui/icons/GitHub'
import { IconButton } from '@material-ui/core'
import VKIcon from 'src/components/svg/VKIcon'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2)
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
}))

const Footer = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Link to={'/'} className={classes.logo}>
          habra.
        </Link>

        <Grid spacing={1} container alignItems="center" justify="center">
          <Grid item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jarvis394/habra"
            >
              <IconButton>
                <GitHubIcon />
              </IconButton>
            </a>
          </Grid>
          <Grid item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://vk.com/tarnatovski"
            >
              <IconButton>
                <VKIcon color={theme.palette.primary.main} />
              </IconButton>
            </a>
          </Grid>
        </Grid>

        <div style={{ marginTop: 16 }}>
          <Link to={'/habra-faq'} className={classes.text}>
            Как это работает
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer

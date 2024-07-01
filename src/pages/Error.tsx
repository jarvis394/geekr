import { Typography } from '@material-ui/core'
import isMobile from 'is-mobile'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ErrorSVG from 'src/components/svg/Error'
import { APP_BAR_HEIGHT, chromeAddressBarHeight } from 'src/config/constants'
import FormattedText from 'src/components/formatters/FormattedText'

const useStyles = makeStyles((theme) => ({
  svg: {
    display: 'flex',
    width: '80%',
    maxWidth: 500,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `calc(100vh - ${
      isMobile() ? chromeAddressBarHeight : 0
    }px - ${APP_BAR_HEIGHT}px)`,
    padding: theme.spacing(2),
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 18,
    marginTop: theme.spacing(3),
  },
  code: {
    width: '100%',
    maxWidth: 700,
    marginTop: theme.spacing(2),
    '& pre': {
      marginTop: '0 !important',
    },
  },
  text: {
    fontFamily: 'Google Sans',
    fontWeight: 400,
    fontSize: 16,
    marginTop: theme.spacing(1),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.light,
    },
  },
}))

const Error: React.FC<{
  error: Error
  componentStack: string
  eventId: string
  resetError(): void
}> = ({ error, componentStack }) => {
  const classes = useStyles()
  const linkHref = '/'

  return (
    <div className={classes.root}>
      <ErrorSVG className={classes.svg} />
      <Typography className={classes.title}>Произошла ошибка</Typography>
      <Typography className={classes.text}>
        <a className={classes.link} href={linkHref}>
          Нажми сюда
        </a>
        , чтобы вернуться домой. Эта ошибка записана в логи Sentry и будет
        обработана в ближайшее время.
      </Typography>
      <div className={classes.code}>
        <FormattedText>{`<pre><code class="javascript">${error.toString()}\n${componentStack}</code></pre>`}</FormattedText>
      </div>
    </div>
  )
}

export default React.memo(Error)

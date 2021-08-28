import { Typography } from '@material-ui/core'
import isMobile from 'is-mobile'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ErrorSVG from 'src/components/svg/Error'
import { APP_BAR_HEIGHT, chromeAddressBarHeight } from 'src/config/constants'
import FormattedText from 'src/components/formatters/FormattedText'
import { useLocation } from 'react-router'

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
    }
  }
}))

const Error: React.FC<{
  error: Error
  componentStack: string
  eventId: string
  resetError(): void
}> = ({ error, componentStack }) => {
  const classes = useStyles()
  const location = useLocation()
  const linkHref = `https://github.com/jarvis394/habra/issues/new?labels=bug&title=Encountered+an+error+(${error.toString()})&body=${encodeURIComponent(
    `### Describe the problem:\nGot an error message at \`${
      location.pathname + location.search + location.hash
    }\`:\n\`\`\`javascript\n${error.toString()}\n${componentStack}\n\`\`\``
  )}`

  return (
    <div className={classes.root}>
      <ErrorSVG className={classes.svg} />
      <Typography className={classes.title}>Произошла ошибка</Typography>
      <Typography className={classes.text}>
        <a className={classes.link} target="_blank" rel="noreferrer" href={linkHref}>
          Нажми сюда
        </a>
        , чтобы сообщить о проблеме в проект
      </Typography>
      <div className={classes.code}>
        <FormattedText>{`<pre><code class="javascript">${error.toString()}\n${componentStack}</code></pre>`}</FormattedText>
      </div>
    </div>
  )
}

export default React.memo(Error)

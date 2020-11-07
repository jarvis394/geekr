import React from 'react'
import { Typography, Fade, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(4),
    fontFamily: 'Google Sans',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    transitionDuration: '0.1s',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  cross: {
    textDecoration: 'line-through',
    color: theme.palette.text.hint,
  },
}))

const AboutPage = () => {
  const classes = useStyles()
  const Text = ({ index, children, ...props }) => (
    <Fade
      in
      timeout={1000}
      style={{
        transitionDelay: `${index / 4}s`,
      }}
    >
      <div>
        <Typography className={classes.text} {...props}>
          {children}
        </Typography>
      </div>
    </Fade>
  )
  const text = [
    {
      data: 'Привет!',
      props: { variant: 'h4' },
    },
    {
      data: (
        <>
          На проекте&nbsp;
          <a className={classes.link} href="/">
            habra
          </a>
          &nbsp;можно делать все то же самое, что и на оригинальном&nbsp;
          <a className={classes.link} href="https://habr.com">
            Habrahabr
          </a>
          . В чём разница, спросите вы? Удобство, красота и юзабилити - вот к
          чему стремится неофициальный клон одной из крупнейших площадок Рунета
          с многомиллионной аудиторией.
        </>
      ),
      props: { variant: 'body1', style: { fontSize: 22, lineHeight: '32px' } },
    },
    {
      data: (
        <>
          В один из солнечных дней Петербурга,&nbsp;
          <a className={classes.link} href="/">
            jarvis394
          </a>
          &nbsp;чуть не разбил телефон из-за того, что приложение Хабра на
          телефоне глючило и фигово отображало картинки, из-за чего весь контент
          страницы дёргался и прыгал. Тогда он решил исправить ситуацию самым
          долгим, нудным и ресурсоёмким способом - он взял и сделал свой Хабр,
          с&nbsp;
          <span className={classes.cross}>блекджеком</span>
          &nbsp;тёмной темой и кэшированием!
        </>
      ),
      props: { variant: 'body1', style: { fontSize: 18, lineHeight: '28px' } },
    },
    {
      data: (
        <>
          Зачем так стараться? Познание React - Typescript - Redux, а
          также&nbsp;
          <span className={classes.cross}>боли и страданий</span>
          &nbsp;получение разнообразного опыта в сфере фронтенда. Ну и Хабр свой
          хотелось бы иметь, да.
        </>
      ),
      props: { variant: 'body1', style: { fontSize: 18, lineHeight: '28px' } },
    },
  ]

  return (
    <Container>
      {text.map((e, i) => (
        <Text index={i} key={i} {...e.props}>
          {e.data}
        </Text>
      ))}
    </Container>
  )
}

export default React.memo(AboutPage)

import React from 'react'
import { Typography, Fade, Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { Link } from 'react-router-dom'

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
  grid: {
    marginTop: theme.spacing(2),
  },
}))

const useCardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 12%), 0px 2px 2px 0px rgb(0 0 0 / 7%), 0px 1px 5px 0px rgb(0 0 0 / 4%)',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 24,
    fontWeight: 500,
    marginLeft: theme.spacing(2),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: theme.spacing(1),
  },
}))

const Card: React.FC<{
  to: string
  title: string
  iconSrc: string
  subtitle?: string
  medium?: boolean
  small?: boolean
}> = ({ to, title, iconSrc, subtitle, medium, small }) => {
  const classes = useCardStyles()
  const xs = medium ? 8 : small ? 4 : 12
  const md = medium ? 4 : small ? 2 : 6

  return (
    <Grid item xs={xs} md={md}>
      <a className={classes.link} href={to} target="_blank" rel="noreferrer">
        <Paper className={classes.root} elevation={2}>
          <div className={classes.row}>
            <img className={classes.icon} src={iconSrc} alt={title} />
            <Typography className={classes.title}>{title}</Typography>
          </div>
          {subtitle && (
            <Typography className={classes.subtitle}>{subtitle}</Typography>
          )}
        </Paper>
      </a>
    </Grid>
  )
}

const AboutPage = () => {
  const classes = useStyles()

  // const text = [
  //   {
  //     data: 'Привет!',
  //     props: { variant: 'h4' },
  //   },
  //   {
  //     data: (
  //       <>
  //         Проект&nbsp;
  //         <a className={classes.link} href="/">
  //           habra
  //         </a>
  //         &nbsp; - это , что и на оригинальном&nbsp;
  //         <a className={classes.link} href="https://habr.com">
  //           Habrahabr
  //         </a>
  //         . В чём разница, спросите вы? Удобство, красота и юзабилити - вот к
  //         чему стремится неофициальный клон одной из крупнейших площадок Рунета
  //         с многомиллионной аудиторией.
  //       </>
  //     ),
  //     props: { variant: 'body1', style: { fontSize: 22, lineHeight: '32px' } },
  //   },
  //   {
  //     data: (
  //       <>
  //         В один из солнечных дней Петербурга,&nbsp;
  //         <a className={classes.link} href="/">
  //           jarvis394
  //         </a>
  //         &nbsp;чуть не разбил телефон из-за того, что приложение Хабра на
  //         телефоне глючило и фигово отображало картинки, из-за чего весь контент
  //         страницы дёргался и прыгал. Тогда он решил исправить ситуацию самым
  //         долгим, нудным и ресурсоёмким способом - он взял и сделал свой Хабр,
  //         с&nbsp;
  //         <span className={classes.cross}>блекджеком</span>
  //         &nbsp;тёмной темой и кэшированием!
  //       </>
  //     ),
  //     props: { variant: 'body1', style: { fontSize: 18, lineHeight: '28px' } },
  //   },
  //   {
  //     data: (
  //       <>
  //         Зачем так стараться? Познание React - Typescript - Redux, а
  //         также&nbsp;
  //         <span className={classes.cross}>боли и страданий</span>
  //         &nbsp;получение разнообразного опыта в сфере фронтенда. Ну и Хабр свой
  //         хотелось бы иметь, да.
  //       </>
  //     ),
  //     props: { variant: 'body1', style: { fontSize: 18, lineHeight: '28px' } },
  //   },
  // ]

  return (
    <OutsidePage headerText="О проекте">
      <Container>
        <Typography className={classes.text} variant="h4">
          Привет!
        </Typography>
        <Typography
          className={classes.text}
          style={{ fontSize: 22, lineHeight: '32px' }}
        >
          Проект{' '}
          <Link className={classes.link} to="/">
            geekr.
          </Link>{' '}
          - это неофициальный клон одной из крупнейших IT-площадок Рунета{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className={classes.link}
            href="https://habr.com"
          >
            Habrahabr
          </a>
          .
        </Typography>
        <Typography
          className={classes.text}
          style={{ fontSize: 18, lineHeight: '28px', maxWidth: 1000 }}
        >
          Мы стремимся к максимальному удобству пользования приложением{' '}
          <span className={classes.cross}>(пытаемся сесть на два стула)</span>{' '}
          через красивый дизайн и понятный UI.
        </Typography>
        <Typography
          className={classes.text}
          style={{ fontSize: 18, lineHeight: '28px' }}
        >
          Главная фишка проекта &#8212; <b>open-source</b>. Проект{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className={classes.link}
            href="https://github.com/jarvis394/geekr"
          >
            доступен
          </a>{' '}
          на GitHub и разрабатывается с помощью открытых библиотек. Каждый может
          внести свою лепту в создании идеального клиента для Хабрахабра.
        </Typography>

        <Grid container spacing={2} className={classes.grid}>
          <Card
            iconSrc="https://img.icons8.com/color/48/000000/react-native.png"
            title="react"
            to="https://reactjs.org/"
            subtitle="Библиотека для отрисовки компонентов"
          />
          <Card
            iconSrc="https://img.icons8.com/color/48/000000/typescript.png"
            title="typescript"
            to="https://www.typescriptlang.org/"
            subtitle="Как JavaScript, только лучше"
          />
          <Card
            iconSrc="https://img.icons8.com/color/48/000000/material-ui.png"
            title="material-ui"
            to="https://material-ui.com/"
            subtitle="Компоненты для React в Material стиле"
          />
          <Card
            iconSrc="https://img.icons8.com/color/48/000000/vk-circled.png"
            title="@vkontakte/icons"
            to="https://vkcom.github.io/icons/"
            subtitle="Красивые иконки из популярного мессенджера"
          />
          <Card
            iconSrc="https://img.icons8.com/color/48/000000/redux.png"
            title="redux"
            to="https://redux.js.org/"
            subtitle="Великий И Могучий Хранитель Состояния"
          />
          <Card
            iconSrc="https://img.icons8.com/material-outlined/24/000000/github.png"
            title="GitHub"
            to="https://github.com/jarvis394/geekr/"
            subtitle="Репозиторий проекта"
            medium
          />
          <Card
            iconSrc="https://img.icons8.com/doodle/48/000000/vk-messenger.png"
            title="VK"
            to="https://vk.com/tarnatovski/"
            subtitle="Автор"
            small
          />
        </Grid>
        <Typography
          className={classes.text}
          style={{ fontSize: 18, lineHeight: '28px' }}
        >
          В один из солнечных дней Петербурга,{' '}
          <Link className={classes.link} to="/user/jarvis394">
            jarvis394
          </Link>{' '}
          чуть не разбил телефон из-за того, что приложение Хабра на телефоне
          глючило и фигово отображало картинки, из-за чего весь контент страницы
          дёргался и прыгал. Тогда он решил исправить ситуацию самым долгим,
          нудным и ресурсоёмким способом &#8212; он взял и сделал свой Хабр, с{' '}
          <span className={classes.cross}>блекджеком</span> тёмной темой и
          кэшированием!
        </Typography>
        <Typography
          className={classes.text}
          style={{ fontSize: 18, lineHeight: '28px' }}
        >
          Зачем так стараться? Познание React - Typescript - Redux, а также{' '}
          <span className={classes.cross}>боли и страданий</span> получение
          разнообразного опыта в сфере фронтенда. Ну и Хабр свой хотелось бы
          иметь, да.
        </Typography>
      </Container>
    </OutsidePage>
  )
}

export default React.memo(AboutPage)

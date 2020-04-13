import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { UserExtended as UserObjectExtended } from 'src/interfaces/User'
import { getUser } from 'src/api'
import UserPageSkeleton from 'src/components/skeletons/UserPage'
import ErrorComponent from 'src/components/blocks/Error'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Chip, Grid } from '@material-ui/core'
import moment from 'moment'
import Tabs from './Tabs'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { Link } from 'react-router-dom'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import numToWord from 'number-to-words-ru'
import FormattedText from 'src/components/formatters/FormattedText'
import parse, { HTMLReactParserOptions } from 'html-react-parser'

const useStyles = makeStyles((theme) => ({
  topBlock: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    borderRadius: '50%',
  },
  login: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 24,
    marginTop: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  hintColor: {
    color: theme.palette.text.hint,
  },
  headerContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  headerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  headerTitle: {
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  headerNumber: {
    fontSize: 24,
    fontWeight: 800,
    fontFamily: 'Google Sans',
  },
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
  badges: {
    marginBottom: theme.spacing(1),
  },
  margin: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  blockMargin: {
    marginTop: theme.spacing(2),
  },
  contactsItem: {
    margin: theme.spacing(1)
  }
}))

interface ComponentWithUserParams {
  user: UserObjectExtended
}

const UserAvatarAndLogin = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()

  return (
    <>
      <UserAvatar
        className={classes.avatar}
        login={user.login}
        src={user.avatar}
      />
      <Typography className={classes.login}>{user.login}</Typography>
    </>
  )
}

const Statistics = ({ user }: ComponentWithUserParams) => {
  type Item = [string, string, boolean?]
  const classes = useStyles()
  const items: Item[] = [
    ['Карма', 'score', true],
    ['Рейтинг', 'rating'],
    ['Позиция', 'rating_position'],
  ]

  return (
    <Grid className={classes.headerContainer} container justify="center">
      {items.map((e, i) => (
        <div key={i} className={classes.headerColumn}>
          <Typography className={classes.headerTitle}>
            {e[0].toUpperCase()}
          </Typography>
          {e[2] ? (
            <GreenRedNumber
              doNotAddPlus
              number={user[e[1]]}
              classes={classes.headerNumber}
            />
          ) : (
            <Typography className={classes.headerNumber}>
              {user[e[1]]}
            </Typography>
          )}
        </div>
      ))}
    </Grid>
  )
}

const InvitedTime = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()

  return (
    user.time_invited && (
      <Typography variant="caption" color="textSecondary">
        {user.invited_by_login ? (
          <Link className={classes.link} to={'/user/' + user.invited_by_login}>
            {user.invited_by_login}
          </Link>
        ) : (
          'НЛО'
        )}{' '}
        пригласил {moment(user.time_invited).fromNow()}
      </Typography>
    )
  )
}

const RegisteredTime = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()
  const timeRegistered = (ti, tr) => {
    if (ti && ti === tr) {
      return 'в то же время'
    } else return moment(tr).fromNow()
  }

  return (
    <Typography variant="caption" className={classes.hintColor}>
      Зарегестрировался{' '}
      {timeRegistered(user.time_invited, user.time_registered)}
    </Typography>
  )
}

const FollowersCount = ({ user }: ComponentWithUserParams) => {
  const count = Number(user.counters.followers)
  const text = numToWord.convert(count, {
    currency: {
      currencyNameCases: ['подписчик', 'подписчика', 'подписчиков'],
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })

  return count !== 0 ? <Typography variant="body2">{text}</Typography> : null
}

const About = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()

  return user.description_html ? (
    <>
      <Typography className={classes.blockTitle}>О себе</Typography>
      <FormattedText>{user.description_html}</FormattedText>
    </>
  ) : null
}

const Badges = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()

  return user.badges.length !== 0 ? (
    <>
      <Typography className={classes.blockTitle}>Значки</Typography>
      <Grid spacing={1} container className={classes.badges}>
        {user.badges.map((e, i) => (
          <Grid key={i} item>
            <Chip variant="outlined" color="primary" label={e.title} />
          </Grid>
        ))}
      </Grid>
    </>
  ) : null
}

const Contacts = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()
  const options: HTMLReactParserOptions = {
    replace: ({ children, attribs }): void | React.ReactElement => {
      if (attribs.class === 'url') {
        return <Link className={classes.link} to={attribs.href}>{children[0].data}</Link>
      }
    }
  }

  return user.contacts.length !== 0 ? (
    <>
      <Typography className={classes.blockTitle}>Контакты</Typography>
      <Grid container>
        {user.contacts.map((e, i) => (
          <Grid key={i} item className={classes.contactsItem}>
            <Typography>{e.title}</Typography>
            {parse(e.link, options)}
          </Grid>
        ))}
      </Grid>
    </>
  ) : null
}

interface UserParams {
  login: string
}

const User = () => {
  const [user, setUser] = useState<UserObjectExtended>()
  const [fetchError, setFetchError] = useState<string>()
  const { login } = useParams<UserParams>()
  const classes = useStyles()

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getUser(login)
        if (!data.success) return setFetchError('Пользователь не найден')
        else setUser(data.data.user)
      } catch (e) {
        setFetchError(e.message)
      }
    }
    get()
  }, [login])

  console.log(user)

  if (fetchError) return <ErrorComponent message={fetchError} />

  return (
    <>
      <Tabs />
      {user ? (
        <>
          <div className={classes.topBlock}>
            {[
              UserAvatarAndLogin,
              Statistics,
              FollowersCount,
              InvitedTime,
              RegisteredTime,
            ].map((Component, i) => (
              <Component key={i} user={user} />
            ))}
          </div>
          <div className={classes.margin}>
            {[Badges, About, Contacts].map((Component, i) => (
              <div key={i} className={classes.blockMargin}>
                <Component user={user} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <UserPageSkeleton />
      )}
    </>
  )
}

export default User

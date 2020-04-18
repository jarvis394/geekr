import React, { useState, useEffect } from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { UserExtended } from 'src/interfaces/User'
import { Link } from 'react-router-dom'
import { useSelector } from 'src/hooks'
import ProfileChildrenSkeleton from 'src/components/skeletons/ProfileChildren'
import { useDispatch } from 'react-redux'
import { getUserChildren } from 'src/store/actions/user'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  itemHolder: {
    padding: theme.spacing(1),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  linkItem: {
    marginLeft: theme.spacing(0.5),
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginTop: theme.spacing(2),
  }
}))

const Children = ({ classes: additionalClasses }: ComponentWithUserParams) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user.profile.user.data)
  const childrenData = useSelector((store) => store.user.profile.children.data)
  const isFetched = useSelector((store) => store.user.profile.children.fetched)
  const isFetching = useSelector(
    (store) => store.user.profile.children.fetching
  )
  const fetchError = useSelector((store) => store.user.profile.children.error)
  const [showAll, setShowAll] = useState<boolean>()
  const sorted = (childrenData?.users || []).sort(
    (a, b) => Date.parse(a.time_registered) - Date.parse(b.time_registered)
  )

  useEffect(() => {
    setShowAll(false)
    dispatch(getUserChildren(user.login))
  }, [user.login, dispatch])

  const Item = ({ data }: { data: UserExtended }) => (
    <Grid container>
      <Link className={classes.itemHolder} to={'/user/' + data.login}>
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <UserAvatar
            className={classes.avatar}
            src={data.avatar}
            login={data.login}
          />
        </Grid>
        <Grid container justify="center" direction="column">
          <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography className={classes.link + ' ' + classes.linkItem}>
              @{data.login}
            </Typography>
          </Grid>
          <Grid item className={classes.linkItem}>
            <Typography color="textSecondary" variant="caption">
              {data.specializm}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  )

  if (fetchError)
    return (
      <Typography className={classes.errorText}>
        Не удалось загрузить список приглашённых пользователей
      </Typography>
    )
  if (isFetching) return <ProfileChildrenSkeleton />

  return isFetched && sorted.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Пригласил на сайт</Typography>
      {sorted.slice(0, showAll ? sorted.length - 1 : 5).map((e, i) => (
        <Item data={e} key={i} />
      ))}
      {sorted.length > 5 && (
        <Button
          size="small"
          style={{ marginTop: 8 }}
          onClick={() => setShowAll((prev) => !prev)}
          variant="outlined"
        >
          {showAll ? 'Скрыть часть' : 'Показать всех'}
        </Button>
      )}
    </div>
  ) : null
}

export default Children

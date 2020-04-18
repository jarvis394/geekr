import React, { useEffect } from 'react'
import { Typography, Grid, Avatar } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Company } from 'src/interfaces'
import { useSelector } from 'src/hooks'
import ProfileCompaniesSkeleton from 'src/components/skeletons/ProfileCompanies'
import { useDispatch } from 'react-redux'
import { getUserCompanies } from 'src/store/actions/user'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
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
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginTop: theme.spacing(2),
  },
}))

const Companies = ({ classes: additionalClasses }: ComponentWithUserParams) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user.profile.user.data)
  const { companies } = useSelector(
    (store) => store.user.profile.companies.data
  )
  const isFetched = useSelector((store) => store.user.profile.companies.fetched)
  const isFetching = useSelector(
    (store) => store.user.profile.companies.fetching
  )
  const fetchError = useSelector((store) => store.user.profile.companies.error)

  useEffect(() => {
    dispatch(getUserCompanies(user.login))
  }, [user.login, dispatch])

  const Item = ({ data }: { data: Company }) => (
    <Grid container>
      <Link className={classes.itemHolder} to={'/company/' + data.alias}>
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar className={classes.avatar} src={data.icon} alt={data.name} />
        </Grid>
        <Grid container justify="center" direction="column">
          <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography className={classes.linkItem}>{data.name}</Typography>
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
        Не удалось загрузить список любимых компаний
      </Typography>
    )
  if (isFetching) return <ProfileCompaniesSkeleton />

  return isFetched && companies && companies.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>
        Подписан на компании
      </Typography>
      {companies.map((e, i) => (
        <Item data={e} key={i} />
      ))}
    </div>
  ) : null
}

export default Companies

import React, { useEffect } from 'react'
import { Typography, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Company } from 'src/interfaces'
import ProfileCompaniesSkeleton from 'src/components/skeletons/ProfileCompanies'
import UserAvatar from 'src/components/blocks/UserAvatar'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
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
  const user = useSelector((store) => store.user.profile.user.data)
  const companies = useSelector(
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
    <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} component={Link} to={'/company/' + data.name}>
      <ListItemAvatar>
        <UserAvatar
          className={classes.avatar}
          src={data.icon}
          login={data.name}
        />
      </ListItemAvatar>
      <ListItemText
        style={{ margin: 0 }}
        primaryTypographyProps={{ color: 'textPrimary' }}
        primary={data.name}
        secondary={data.specializm}
      />
    </ListItem>
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

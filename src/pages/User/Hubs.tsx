import React, { useState, useEffect } from 'react'
import { Typography, Grid, Button, Chip } from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserHubs } from 'src/store/actions/user'
import { useSelector } from 'src/hooks'
import { HubObject } from 'src/interfaces'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
  },
  linkItem: {
    marginLeft: theme.spacing(0.5),
  },
  item: {
    display: 'inline-block',
    textDecoration: 'none',
  },
  itemChip: {
    background: fade(theme.palette.primary.main, 0.1),
    borderRadius: 4,
    color: fade(theme.palette.text.primary, 0.8),
    fontWeight: 500
  },
  holder: {
    marginBottom: theme.spacing(1),
  },
}))

const HubsItem = ({ data }: { data: HubObject }) => {
  const classes = useStyles()
  return (
    <Grid item className={classes.item} component={Link} to={'/hub/' + data.alias}>
      <Chip
        style={{ cursor: 'pointer' }}
        title={data.about_small}
        className={classes.itemChip}
        variant="default"
        color="primary"
        label={data.title}
      />
    </Grid>
  )
}

const Hubs = ({ classes: additionalClasses }: ComponentWithUserParams) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [showAll, setShowAll] = useState<boolean>()
  const { user } = useSelector((store) => store.user.profile.user.data)
  const { hubs } = useSelector((store) => store.user.profile.hubs.data)
  const isFetched = useSelector((store) => store.user.profile.hubs.fetched)
  const isFetching = useSelector((store) => store.user.profile.hubs.fetching)
  // const fetchError = useSelector((store) => store.user.profile.hubs.error)

  useEffect(() => {
    setShowAll(false)
    dispatch(getUserHubs(user.login))
  }, [user.login, dispatch])

  if (isFetching) return <Typography>загрузка...</Typography>

  return isFetched && hubs && hubs.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Состоит в хабах</Typography>
      <Grid spacing={1} container className={classes.holder}>
        {hubs.slice(0, showAll ? hubs.length - 1 : 15).map((e, i) => (
          <HubsItem data={e} key={i} />
        ))}
      </Grid>
      {hubs.length > 15 && (
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

export default Hubs

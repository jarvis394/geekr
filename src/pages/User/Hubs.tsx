import React, { useState, useEffect } from 'react'
import {
  Typography,
  Grid,
  Button,
  Chip,
  Collapse,
  Fade,
} from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
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
    fontWeight: 500,
  },
  holder: {
    marginBottom: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginTop: theme.spacing(2),
  },
  collapse: {
    position: 'relative',
  },
  collapseShadow: {
    position: 'absolute',
    background:
      'linear-gradient(0deg,' +
      theme.palette.background.default +
      ',transparent)',
    bottom: 0,
    pointerEvents: 'none',
    height: 40,
    width: '100%',
  },
}))

const HubsItem = ({ data }: { data: HubObject }) => {
  const classes = useStyles()
  return (
    <Grid
      item
      className={classes.item}
      component={Link}
      to={'/hub/' + data.alias}
    >
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
  const [showAll, setShowAll] = useState<boolean>(false)
  const classes = useStyles()
  const user = useSelector((store) => store.user.profile.user.data)
  const hubs = useSelector((store) => store.user.profile.hubs.data)
  const isFetched = useSelector((store) => store.user.profile.hubs.fetched)
  const isFetching = useSelector((store) => store.user.profile.hubs.fetching)
  const fetchError = useSelector((store) => store.user.profile.hubs.error)

  useEffect(() => {
    setShowAll(false)
    dispatch(getUserHubs(user.login))
  }, [user.login, dispatch])

  if (fetchError)
    return (
      <Typography className={classes.errorText}>
        Не удалось загрузить список приглашённых пользователей
      </Typography>
    )
  if (isFetching) return <Typography>загрузка...</Typography>

  return isFetched && hubs && hubs.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Состоит в хабах</Typography>
      <Collapse className={classes.collapse} in={showAll} collapsedHeight={148}>
        <Grid spacing={1} container className={classes.holder}>
          {hubs.map((e, i) => (
            <HubsItem data={e} key={i} />
          ))}
        </Grid>
        <Fade appear={false} in={!showAll}>
          <div className={classes.collapseShadow} />
        </Fade>
      </Collapse>
      {hubs.length > 17 && (
        <Button
          size="small"
          style={{ marginTop: 8 }}
          onClick={() => setShowAll((prev) => !prev)}
          variant="outlined"
        >
          {showAll ? 'Скрыть' : 'Показать всe'}
        </Button>
      )}
    </div>
  ) : null
}

export default Hubs

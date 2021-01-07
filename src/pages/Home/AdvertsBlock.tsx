import React, { useEffect } from 'react'
import {
  Typography,
  ButtonBase,
  GridList,
  GridListTile,
  useTheme,
} from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { getAdverts } from 'src/store/actions/home'
import { useDispatch } from 'react-redux'
import AdvertsBlockSkeleton from '../../components/skeletons/AdvertsBlockSkeleton'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  header: {
    padding: theme.spacing(0, 2),
    fontFamily: 'Google Sans',
    fontSize: 24,
    fontWeight: 800,
    height: 48,
    display: 'flex',
    alignItems: 'center',
  },
  buttonsHolder: {
    marginTop: '4px !important',
    display: 'flex',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflowX: 'auto',
    overflowY: 'hidden',
    marginRight: theme.spacing(2),
    width: '100%',
    margin: '0 !important',
  },
  button: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'column',
    padding: theme.spacing(0, 1.5),
    alignItems: 'start',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'initial',
  },
  label: {
    padding: '2px 6px',
    background: fade(theme.palette.text.primary, 0.9),
    fontFamily: 'Google Sans',
    fontSize: 14,
    fontWeight: 800,
    borderRadius: 8,
    marginTop: theme.spacing(1),
    color: theme.palette.getContrastText(theme.palette.text.primary),
  },
  tile: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}))

const AdvertsBlock = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const data = useSelector((store) => store.home.adverts.data)
  const fetching = useSelector((store) => store.home.adverts.fetching)
  const error = useSelector((store) => store.home.adverts.error)

  useEffect(() => {
    !data && dispatch(getAdverts())
  }, [dispatch, data])

  if (error) return null

  return (
    <div className={classes.root}>
      <Typography className={classes.header}>Мегапосты</Typography>
      <GridList cellHeight={148} className={classes.buttonsHolder} cols={1.1}>
        {data &&
          data.map((e, i) => (
            <GridListTile
              className={classes.tile}
              component={'a'}
              href={e.linkUrl}
              key={i}
              style={{
                padding: `0 ${i === data.length - 1 ? '16px' : '0'} 0 16px`,
              }}
            >
              <ButtonBase
                className={classes.button}
                style={{
                  backgroundImage: `linear-gradient(to right, ${fade(
                    theme.palette.background.paper,
                    0.7
                  )}, ${fade(theme.palette.background.paper, 0.5)}), url(${
                    e.imageUrl
                  })`,
                }}
              >
                <Typography className={classes.title}>{e.title}</Typography>
                <Typography className={classes.label}>{e.label}</Typography>
              </ButtonBase>
            </GridListTile>
          ))}
        {fetching && <AdvertsBlockSkeleton />}
      </GridList>
    </div>
  )
}

export default AdvertsBlock

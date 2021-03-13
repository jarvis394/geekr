import React, { useEffect } from 'react'
import {
  Typography,
  ButtonBase,
  GridList,
  GridListTile,
  Fade,
  useTheme,
} from '@material-ui/core'
import { darken, fade, lighten, makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { getAdverts } from 'src/store/actions/home'
import { useDispatch } from 'react-redux'
import AdvertsBlockSkeleton from '../../components/skeletons/AdvertsBlock'
import isMobile from 'is-mobile'
import { ADVERTS_BLOCK_HEIGHT } from 'src/config/constants'
import isDarkTheme from 'src/utils/isDarkTheme'

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
    // Do not change the scrollbar on mobile due to design flaws
    // If the -webkit-scrollbar is empty, any other scrollbar style will not be applied.
    '&::-webkit-scrollbar': !isMobile() && {
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.default, 0.03)
        : theme.palette.background.paper,
      border: '1px solid ' + darken(theme.palette.background.paper, 0.05),
      borderRadius: 4,
      height: 12,
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: 12,
      borderRadius: 4,
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
  button: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'column',
    padding: theme.spacing(0, 1.5),
    alignItems: 'start',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 800,
    textAlign: 'initial',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    color: theme.palette.getContrastText(theme.palette.common.black),
  },
  label: {
    padding: '2px 6px',
    background: fade(theme.palette.common.white, 0.9),
    fontFamily: 'Google Sans',
    fontSize: 14,
    fontWeight: 800,
    borderRadius: 8,
    marginTop: theme.spacing(1),
    color: theme.palette.getContrastText(theme.palette.common.white),
  },
  tile: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '-webkit-tap-highlight-color': 'transparent !important',
  },
}))

const AdvertsBlock = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const data = useSelector((store) => store.home.adverts.data)
  const fetching = useSelector((store) => store.home.adverts.fetching)
  const error = useSelector((store) => store.home.adverts.error)
  const getButtonStyles = (imageUrl: string) => ({
    backgroundImage: `linear-gradient(to right, ${fade(
      theme.palette.common.black,
      0.7
    )}, ${fade(theme.palette.common.black, 0.5)}), url(${imageUrl})`,
  })

  useEffect(() => {
    !data && dispatch(getAdverts())
  }, [dispatch, data])

  if (error) return null

  return (
    <div className={classes.root}>
      <div className={classes.header}>Мегапосты</div>
      <GridList
        cellHeight={ADVERTS_BLOCK_HEIGHT}
        className={classes.buttonsHolder}
        cols={1.1}
      >
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
              <Fade in>
                <ButtonBase
                  className={classes.button}
                  style={getButtonStyles(e.imageUrl)}
                >
                  <Typography className={classes.title}>{e.title}</Typography>
                  <Typography className={classes.label}>{e.label}</Typography>
                </ButtonBase>
              </Fade>
            </GridListTile>
          ))}
        {fetching && <AdvertsBlockSkeleton />}
      </GridList>
    </div>
  )
}

export default React.memo(AdvertsBlock)

import React, { useEffect } from 'react'
import {
  Typography,
  ButtonBase,
  ImageList,
  ImageListItem,
  Fade,
  useTheme,
} from '@material-ui/core'
import { darken, alpha, lighten, makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import { getAdverts } from 'src/store/actions/home'
import { useDispatch } from 'react-redux'
import AdvertsBlockSkeleton from '../../components/skeletons/AdvertsBlock'
import isMobile from 'is-mobile'
import {
  ADVERTS_BLOCK_HEIGHT,
  ADVERTS_BLOCK_MAX_WIDTH,
  MIN_WIDTH,
} from 'src/config/constants'
import isDarkTheme from 'src/utils/isDarkTheme'
import { Link } from 'react-router-dom'
import { Icon28FireCircleFillRed } from '@vkontakte/icons'
import { Icon24ChevronCompactRight } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5, 0),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'none',
    },
  },
  header: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0, 2),
  },
  buttonsHolder: {
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
    background: alpha(theme.palette.common.white, 0.9),
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
    maxWidth: ADVERTS_BLOCK_MAX_WIDTH,
    margin: theme.spacing(0, 0, 0, 2),
  },
  tileMegaprojects: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '-webkit-tap-highlight-color': 'transparent !important',
    width: 'auto !important',
    padding: '2px ' + theme.spacing(2) + 'px !important',
  },
  buttonMegaprojects: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: theme.palette.background.default + ' !important',
    boxShadow:
      '0px 1px 5px -1px rgb(0 0 0 / 5%), 0px 5px 8px 0px rgb(0 0 0 / 2%)',
    flexDirection: 'column',
    borderRadius: 8,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    fontSize: 15,
    padding: theme.spacing(0, 2),
  },
  iconMegaprojects: {
    marginBottom: theme.spacing(1.5),
  },
  iconRightMegaprojects: {
    marginLeft: theme.spacing(0.5),
    marginTop: 2,
  },
  tileTileMegaprojects: {
    overflow: 'visible',
  },
}))

const AdvertsBlock = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const isHidden = useSelector(
    (store) => store.settings.interfaceFeed.hideMegaposts
  )
  const data = useSelector((store) => store.home.adverts.data)
  const fetched = useSelector((store) => store.home.adverts.fetched)
  const error = useSelector((store) => store.home.adverts.error)
  const getButtonStyles = (imageUrl: string) => ({
    backgroundImage: `linear-gradient(to right, ${alpha(
      theme.palette.common.black,
      0.7
    )}, ${alpha(theme.palette.common.black, 0.5)}), url(${imageUrl})`,
  })

  if (isHidden) return null

  useEffect(() => {
    !data && dispatch(getAdverts())
  }, [dispatch, data])

  if (error) return null

  if (fetched && data.length === 0) return null

  return (
    <div className={classes.root}>
      <div className={classes.header}>Мегапосты</div>
      <ImageList
        rowHeight={ADVERTS_BLOCK_HEIGHT}
        className={classes.buttonsHolder}
        cols={1.2}
      >
        {fetched &&
          data.map((e, i) => (
            <ImageListItem
              className={classes.tile}
              component={'a'}
              href={e.linkUrl}
              key={i}
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
            </ImageListItem>
          ))}
        {!fetched && <AdvertsBlockSkeleton />}
        <ImageListItem
          to={'/megaprojects/p/1'}
          className={classes.tileMegaprojects}
          component={Link}
          classes={{
            item: classes.tileTileMegaprojects,
          }}
        >
          <ButtonBase className={classes.buttonMegaprojects}>
            <Icon28FireCircleFillRed
              width={48}
              height={48}
              className={classes.iconMegaprojects}
            />
            <span style={{ display: 'flex', alignItems: 'center' }}>
              Мегапроекты
              <Icon24ChevronCompactRight
                width={18}
                height={22}
                className={classes.iconRightMegaprojects}
              />
            </span>
          </ButtonBase>
        </ImageListItem>
      </ImageList>
    </div>
  )
}

export default React.memo(AdvertsBlock)

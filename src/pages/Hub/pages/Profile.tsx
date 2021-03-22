import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useSelector from 'src/hooks/useSelector'
import fadedLinearGradient from 'src/utils/fadedLinearGradient'
import {
  Avatar,
  Button,
  ButtonBase,
  darken,
  Grid,
  lighten,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  topBlock: {
    background: fadedLinearGradient(theme),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  mainBlock: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}))

const useInformationStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: theme.spacing(2),
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  ratingText: {
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  avatarAndRating: {
    flexGrow: 1,
    display: 'flex',
  },
  subscribeButtonWrapper: {
    height: 32,
    width: 112,
    position: 'relative',
    justifyContent: 'initial',
  },
  subscribeButton: {
    color: (isSubscribed) =>
      isSubscribed ? 'white' : theme.palette.success.main,
    fontSize: 12,
    height: 32,
    padding: 0,
    textAlign: 'center',
    lineHeight: '16px',
    position: 'absolute',
    width: (isSubscribed) => (isSubscribed ? 'calc(100% - 26px)' : '100%'),
    borderRadius: 4,
    boxSizing: 'border-box',
    border: (isSubscribed) =>
      isSubscribed ? 'none' : '1px solid ' + theme.palette.success.main,
    background: (isSubscribed) =>
      isSubscribed
        ? theme.palette.success.main
        : theme.palette.background.default,
    transition: 'width .2s ease,background-color .2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: 'white',
      background: (isSubscribed) =>
        (isSubscribed ? lighten : darken)(theme.palette.success.main, 0.1),
    },
  },
  subscribeButtonSpan: {
    transition: 'width .2s ease,background-color .2s ease',
    borderRadius: 4,
    border: '1px solid ' + theme.palette.success.main,
    boxSizing: 'border-box',
    color: theme.palette.text.secondary,
    fontSize: 15,
    height: 32,
    left: 0,
    lineHeight: '29px',
    padding: '0 9px',
    position: 'absolute',
    textAlign: 'right',
    top: 0,
    width: '100%',
  },
}))

const useDescriptionStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: theme.spacing(0.5),
  },
  description: {
    fontSize: 14,
  },
}))

const Information = () => {
  const profile = useSelector((state) => state.hub.profile.data)
  const [isSubscribed, setSubscribed] = useState(
    profile?.relatedData?.isSubscribed || false
  )
  const classes = useInformationStyles(isSubscribed)

  return (
    <div className={classes.root}>
      <div className={classes.avatarAndRating}>
        <Avatar
          alt={profile.titleHtml}
          src={profile.imageUrl}
          className={classes.avatar}
        />
        <div className={classes.rating}>
          <Typography className={classes.ratingText}>
            {profile.statistics.rating}
          </Typography>
          <Typography className={classes.caption}>Рейтинг</Typography>
        </div>
      </div>
      <ButtonBase
        className={classes.subscribeButtonWrapper}
        onClick={() => setSubscribed((prev) => !prev)}
        disableRipple
      >
        <span className={classes.subscribeButtonSpan}>×</span>
        <div className={classes.subscribeButton}>
          {isSubscribed ? 'Подписан' : 'Подписаться'}
        </div>
      </ButtonBase>
    </div>
  )
}

const Description = () => {
  const profile = useSelector((state) => state.hub.profile.data)
  const classes = useDescriptionStyles()
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{profile.titleHtml}</Typography>
      <Typography className={classes.description}>
        {profile.descriptionHtml}
      </Typography>
    </div>
  )
}

const Profile = () => {
  const classes = useStyles()
  const profile = useSelector((state) => state.hub.profile.data)

  return (
    <>
      <div className={classes.topBlock}>
        <Information />
        <Description />
      </div>
    </>
  )
}

export default Profile

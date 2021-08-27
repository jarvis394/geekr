import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'
import LinkToOutsidePage from '../LinkToOutsidePage'
import UserAvatar from '../UserAvatar'
import { Icon28DoorArrowRightOutline } from '@vkontakte/icons'
import { useDispatch } from 'react-redux'
import { userLogout } from 'src/store/actions/auth'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(1.5, 0),
    marginTop: theme.spacing(0.5),
  },
  avatarAndLogin: {
    display: 'flex',
    flexGrow: 1,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(1),
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
  },
  avatar: {
    borderRadius: '50%',
  },
  fullnameAndAliasWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  fullname: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 17,
    color: theme.palette.text.primary,
    lineHeight: '20px',
  },
  alias: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 15,
    color: theme.palette.primary.light,
    lineHeight: '18px',
    marginTop: theme.spacing(0.35),
  },
  logoutIcon: {
    color: theme.palette.text.secondary,
  },
}))

const UserAvatarAndLogin: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const user = useSelector((store) => store.auth.me.data)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const logout = () => {
    enqueueSnackbar('Вы вышли из аккаунта', {
      variant: 'info',
      autoHideDuration: 3000,
    })
    handleClose()
    dispatch(userLogout())
  }

  return (
    <div className={classes.root}>
      <div className={classes.avatarAndLogin}>
        <LinkToOutsidePage
          to={'/user/' + user?.alias}
          className={classes.link}
          onClick={handleClose}
        >
          <UserAvatar
            src={user?.avatarUrl}
            alias={user?.alias}
            className={classes.avatar}
          />
          <div className={classes.fullnameAndAliasWrapper}>
            <Typography className={classes.fullname}>
              {user?.fullname}
            </Typography>
            <Typography className={classes.alias}>@{user?.alias}</Typography>
          </div>
        </LinkToOutsidePage>
      </div>
      <div className={classes.icons}>
        <IconButton className={classes.logoutIcon} onClick={logout}>
          <Icon28DoorArrowRightOutline width={24} height={24} />
        </IconButton>
      </div>
    </div>
  )
}

export default React.memo(UserAvatarAndLogin)

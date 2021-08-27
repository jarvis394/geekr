import {
  ButtonBase,
  darken,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core'
import React from 'react'
import isDarkTheme from 'src/utils/isDarkTheme'

const useStyles = makeStyles<
  Theme,
  {
    backgroundColor: string
    isSubscribed: boolean
  }
>((theme) => ({
  subscribeButtonWrapper: {
    height: 32,
    width: 112,
    position: 'relative',
    justifyContent: 'initial',
  },
  subscribeButton: {
    color: ({ isSubscribed }) =>
      isSubscribed ? 'white' : theme.palette.success.main,
    fontSize: 12,
    height: 32,
    padding: 0,
    textAlign: 'center',
    lineHeight: '16px',
    position: 'absolute',
    width: ({ isSubscribed }) => (isSubscribed ? 'calc(100% - 26px)' : '100%'),
    borderRadius: 4,
    boxSizing: 'border-box',
    border: ({ isSubscribed }) =>
      isSubscribed ? 'none' : '1px solid ' + theme.palette.success.main,
    background: ({ isSubscribed, backgroundColor }) =>
      isSubscribed ? theme.palette.success.main : backgroundColor,
    backgroundSize: '500%',
    transition: 'width .2s ease, background-color .2s ease',
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

const SubscribeButton: React.FC<{
  isSubscribed: boolean
  setSubscribed: React.Dispatch<React.SetStateAction<boolean>>
  backgroundColor: string
}> = ({ isSubscribed, setSubscribed, backgroundColor }) => {
  const classes = useStyles({ isSubscribed, backgroundColor })

  return (
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
  )
}

export default SubscribeButton

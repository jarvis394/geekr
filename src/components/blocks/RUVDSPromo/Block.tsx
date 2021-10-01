import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ButtonBase,
  IconButton,
  Typography,
} from '@material-ui/core'
import {
  RUVDS_MODAL_WAS_SHOWN,
} from 'src/config/constants'
import RUVDSLogo from 'src/components/svg/RUVDSLogo'
import { Icon20Clear } from '@vkontakte/icons'
import { Icon16Chevron } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#4B8FFF',
    borderRadius: 0,
    padding: theme.spacing(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'initial',
    position: 'relative',
  },
  svg: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    color: 'white',
    marginTop: theme.spacing(0.5),
    fontSize: 14,
  },
  linkButtonWrapper: {
    marginTop: theme.spacing(1.5),
    '-webkit-tap-highlight-color': 'transparent !important',
    color: theme.palette.getContrastText('#ffffff'),
    textDecoration: 'none',
    display: 'flex',
  },
  linkButton: {
    backgroundColor: 'white',
    padding: theme.spacing(1, 1.5),
    fontFamily: 'Google Sans',
    fontWeight: 600,
    borderRadius: 6,
    transitionDuration: '50ms',
    '&:active': {
      backgroundColor: '#cccccc',
    },
  },
  linkButtonIcon: {
    marginLeft: theme.spacing(1),
  },
}))

const RUVDSPromoBlock = () => {
  const classes = useStyles()
  const shouldHide = localStorage.getItem(RUVDS_MODAL_WAS_SHOWN) === 'true'
  const [isHidden, setIsHidden] = useState(shouldHide)
  const handleClose = () => {
    localStorage.setItem(RUVDS_MODAL_WAS_SHOWN, 'true')
    setIsHidden(true)
  }

  if (isHidden) return null 

  return (
    <div className={classes.root}>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <Icon20Clear width={16} height={16} />
      </IconButton>
      <div className={classes.flexContainer}>
        <RUVDSLogo fill="white" className={classes.svg} />
      </div>
      <Typography className={classes.title}>
        Наш сервер теперь на RUVDS
      </Typography>
      <Typography className={classes.text}>
        Новые мощности. Быстрая загрузка контента. Без промедлений.
      </Typography>
      <a
        className={classes.linkButtonWrapper}
        href="https://ruvds.com/ru-rub"
        rel="noreferrer"
        target="_blank"
      >
        <ButtonBase
          className={classes.linkButton}
          disableRipple
          disableTouchRipple
        >
          Посмотреть предложения
          <Icon16Chevron className={classes.linkButtonIcon} height={16} />
        </ButtonBase>
      </a>
    </div>
  )
}

export default RUVDSPromoBlock

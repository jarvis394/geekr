import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography } from '@material-ui/core'
import { HALLOWEEN_MODAL_WAS_SHOWN } from 'src/config/constants'
import BatIcon from 'src/components/svg/Bat'
import { Icon20Clear } from '@vkontakte/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#eb4b2b',
    borderRadius: 0,
    padding: theme.spacing(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'initial',
    position: 'relative',
  },
  svg: {
    width: 156,
    fill: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
    top: -8,
    left: -24,
    transform: 'rotate(-30deg)',
    height: 'auto',
    zIndex: 0,
  },
  title: {
    fontFamily: 'Google Sans',
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
    zIndex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'rgba(255, 255, 255, 0.5)',
    zIndex: 2,
  },
  text: {
    color: 'white',
    marginTop: theme.spacing(0.5),
    fontSize: 14,
    zIndex: 1,
    position: 'relative',
  },
}))

const HalloweenPromoBlock: React.FC = () => {
  const classes = useStyles()
  const shouldHide = localStorage.getItem(HALLOWEEN_MODAL_WAS_SHOWN) === 'true'
  const [isHidden, setIsHidden] = useState(shouldHide)
  const handleClose = () => {
    localStorage.setItem(HALLOWEEN_MODAL_WAS_SHOWN, 'true')
    setIsHidden(true)
  }

  if (isHidden) return null

  return (
    <div className={classes.root}>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <Icon20Clear width={16} height={16} />
      </IconButton>
      <BatIcon className={classes.svg} />
      <Typography className={classes.title}>Буу-у-у!</Typography>
      <Typography className={classes.text}>
        Найди специальную тему в настройках
      </Typography>
    </div>
  )
}

export default HalloweenPromoBlock

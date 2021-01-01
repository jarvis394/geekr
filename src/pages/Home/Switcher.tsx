import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { RATING_MODES as modes } from '../../config/constants'
import {
  Button,
  ButtonBase,
  ButtonGroup,
  SwipeableDrawer,
} from '@material-ui/core'
import { ModeObject } from 'src/interfaces'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import SwitcherButtons from './SwitcherButtons'

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.background.default,
    textAlign: 'left',
    minHeight: 48,
    height: 48,
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    width: '100%',
  },
  currentMode: {
    fontSize: 24,
    fontWeight: 800,
    fontFamily: 'Google Sans',
  },
  expandIcon: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  drawerRoot: {
    borderRadius: 14,
    border: '1px solid ' + theme.palette.divider,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  drawer: {
    margin: theme.spacing(0, 0, 2, 0),
  },
  drawerHeaderText: {
    fontFamily: 'Google Sans',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  dragLine: {
    width: 48,
    height: 5,
    background: theme.palette.divider,
    borderRadius: 10,
    position: 'relative',
    marginTop: theme.spacing(1.5),
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: -5,
  },
  applyButton: {
    height: 40,
    marginTop: theme.spacing(2),
    borderRadius: 8,
    transition: 'all .15s',
  },
  applyButtonHover: {
    opacity: 0.8,
    transform: 'scale(0.95)',
  },
}))

type ShowMode = 'top' | 'new'
const showModes: { text: string; mode: ShowMode }[] = [
  {
    text: 'Новые',
    mode: 'new',
  },
  {
    text: 'Лучшие',
    mode: 'top',
  },
]

// Bad thing to do, but who cares. Checker doesn't know about browser process,
// so it shows an error, thinking it's NodeJS `process`
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
const isIOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const Switcher = ({ handleClick, mode, setMode }) => {
  const [isOpen, setOpen] = useState(false)
  const [applyButtonHover, setApplyButtonHover] = useState(false)
  const current = modes.find((e) => e.mode === mode)
  const [showMode, setShowMode] = useState<ShowMode>(
    current.isNewMode ? 'new' : 'top'
  )
  const [drawerMode, setDrawerMode] = useState<ModeObject>(current)
  const classes = useStyles()

  const onButtonClick = () => {
    setOpen((prev) => !prev)
  }
  const handleShowModeChange = (newShowMode: ShowMode) => {
    newShowMode !== showMode && setShowMode(newShowMode)
  }
  const handleDrawerModeClick = (newMode: ModeObject) => {
    setDrawerMode(newMode)
  }
  const handleApplyClick = () => {
    setMode(drawerMode.mode)
    handleClick(drawerMode)
    setOpen(false)
  }

  return (
    <>
      <ButtonBase className={classes.button} onClick={onButtonClick}>
        <div className={classes.buttonContainer}>
          <Typography className={classes.currentMode}>
            {current.text}
          </Typography>
          <div className={classes.expandIcon}>
            <ExpandMoreRoundedIcon style={{ fontSize: 28 }} />
          </div>
        </div>
      </ButtonBase>

      <SwipeableDrawer
        open={isOpen}
        anchor="bottom"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
        disableSwipeToOpen
        classes={{
          paper: classes.drawerRoot,
        }}
        elevation={0}
      >
        <Container className={classes.drawer}>
          <span className={classes.dragLine} />

          <Typography className={classes.drawerHeaderText}>
            Сначала показывать
          </Typography>
          <ButtonGroup disableElevation color="primary">
            {showModes.map((e, i) => (
              <Button
                onClick={() => handleShowModeChange(e.mode)}
                variant={e.mode === showMode ? 'contained' : 'outlined'}
                key={i}
              >
                {e.text}
              </Button>
            ))}
          </ButtonGroup>

          {/** Block for 'new' showMode */}
          {showMode === 'new' && (
            <>
              <Typography className={classes.drawerHeaderText}>
                Порог рейтинга
              </Typography>
              <SwitcherButtons
                data={modes.filter((e) => e.switcherText && e.isNewMode)}
                onChange={(e: ModeObject) => handleDrawerModeClick(e)}
                currentValue={drawerMode.mode}
              />
            </>
          )}

          {/** Block for 'top' showMode */}
          {showMode === 'top' && (
            <>
              <Typography className={classes.drawerHeaderText}>
                Период
              </Typography>
              <SwitcherButtons
                data={modes.filter((e) => e.switcherText && !e.isNewMode)}
                onChange={(e: ModeObject) => handleDrawerModeClick(e)}
                currentValue={drawerMode.mode}
              />
            </>
          )}
          <Button
            color="primary"
            disableElevation
            disableRipple
            className={
              classes.applyButton +
              ' ' +
              (applyButtonHover ? classes.applyButtonHover : '')
            }
            fullWidth
            variant="contained"
            onClick={handleApplyClick}
            onMouseDown={() => setApplyButtonHover(true)}
            onMouseUp={() => setApplyButtonHover(false)}
          >
            Применить
          </Button>
        </Container>
      </SwipeableDrawer>
    </>
  )
}

export default React.memo(Switcher)

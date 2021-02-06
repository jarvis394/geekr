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
    width: '100%',
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
  expandIconWrapper: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
  expandIcon: {
    fontSize: 28,
  },
  backdrop: {
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
  },
  margin: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
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
const switcherButtonsDataNew = modes.filter(
  (e) => e.switcherText && e.isNewMode
)
const switcherButtonsDataTop = modes.filter(
  (e) => e.switcherText && !e.isNewMode
)
const Switcher = ({ handleClick, mode, setMode }) => {
  const [isOpen, setOpen] = useState(false)
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
  const handleApplyClick = () => {
    setMode(drawerMode.mode)
    handleClick(drawerMode)
    setOpen(false)
  }
  const onChange = React.useCallback((e: ModeObject) => setDrawerMode(e), [])

  return (
    <>
      <ButtonBase className={classes.button} onClick={onButtonClick}>
        <div className={classes.buttonContainer}>
          <Typography className={classes.currentMode}>
            {current.text}
          </Typography>
          <div className={classes.expandIconWrapper}>
            <ExpandMoreRoundedIcon className={classes.expandIcon} />
          </div>
        </div>
      </ButtonBase>

      <SwipeableDrawer
        open={isOpen}
        anchor="bottom"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableBackdropTransition
        disableDiscovery
        disableSwipeToOpen
        classes={{
          paper: classes.drawerRoot,
        }}
        className={classes.margin}
        style={{ zIndex: 5000 }}
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
                data={switcherButtonsDataNew}
                onChange={onChange}
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
                data={switcherButtonsDataTop}
                onChange={onChange}
                currentValue={drawerMode.mode}
              />
            </>
          )}
          <Button
            color="primary"
            disableElevation
            className={classes.applyButton}
            fullWidth
            variant="contained"
            onClick={handleApplyClick}
          >
            Применить
          </Button>
        </Container>
      </SwipeableDrawer>
    </>
  )
}

export default React.memo(Switcher)

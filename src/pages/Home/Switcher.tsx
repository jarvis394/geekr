import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  FLOWS,
  MIN_WIDTH,
  Mode,
  RATING_MODES as modes,
} from '../../config/constants'
import {
  Button,
  ButtonBase,
  createStyles,
  fade,
  Tab,
  Tabs,
  Theme,
  withStyles,
} from '@material-ui/core'
import { ModeObject } from 'src/interfaces'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import SwitcherButtons from './SwitcherButtons'
import BottomDrawerMargin from 'src/components/blocks/BottomDrawerMargin'
import isDarkTheme from 'src/utils/isDarkTheme'
import FlowAlias from 'src/interfaces/FlowAlias'

interface StyledTabProps {
  label: string
}

const useStyles = makeStyles((theme) => ({
  switcherDesktop: {
    display: 'none',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
    },
  },
  inline: {
    flexDirection: 'row',
    display: 'flex',
  },
  currentFlow: {
    marginBottom: theme.spacing(2),
    fontFamily: 'Google Sans',
    fontWeight: 700,
    fontSize: 28,
    marginLeft: theme.spacing(0.5),
  },
  button: {
    background: theme.palette.background.default,
    textAlign: 'left',
    minHeight: 48,
    height: 48,
    marginTop: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'none',
    },
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
  drawerTitleText: {
    fontFamily: 'Google Sans',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '14px',
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
  applyButton: {
    height: 40,
    marginTop: theme.spacing(2),
    borderRadius: 8,
    textTransform: 'none',
    fontFamily: 'Google Sans',
    fontSize: 15,
    fontWeight: 500,
  },
  margin: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}))

const IOSTabs = withStyles((theme: Theme) => ({
  root: {
    background: fade(theme.palette.divider, isDarkTheme(theme) ? 0.1 : 0.03),
    borderRadius: 12,
    display: 'flex',
    minHeight: 'unset',
    maxWidth: 'unset',
  },
  scroller: {
    padding: 4,
  },
  indicator: {
    background: fade(theme.palette.divider, 0.1),
    height: 'calc(100% - 8px)',
    marginBottom: 4,
    borderRadius: 8,
    boxShadow:
      '0 3px 6px ' +
      fade(theme.palette.background.default, 0.1) +
      ' !important',
  },
}))(Tabs)

interface TabGroupProps {
  handleShowModeChange: (newShowMode: ShowMode) => void
  showMode: ShowMode
  desktop?: boolean
}

const TabGroupUnmemoized: React.FC<TabGroupProps> = ({
  handleShowModeChange,
  showMode,
  desktop = false,
}) => {
  const handleChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    handleShowModeChange(showModes[newValue].mode)
  }
  const currentValue = showModes.findIndex((e) => e.mode === showMode)

  /**
   * `Tab` component needs to be here so it can change its styles
   * according to the `desktop` boolean. `Tabs` are moved outside so it
   * will not rerender every time `showMode` changes
   * */
  const IOSTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: 'none',
        minWidth: desktop ? 122 : 72,
        minHeight: desktop ? 40 : 36,
        flexGrow: 1,
        fontSize: 16,
        padding: 0,
        maxWidth: 'unset',
        fontFamily: 'Google Sans',
        fontWeight: theme.typography.fontWeightMedium,
        transition: 'opacity 0.1s ease',
        '&:hover': {
          opacity: 1,
        },
        '&$selected': {
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      selected: {},
    })
  )((props: StyledTabProps) => <Tab disableRipple {...props} />)

  return (
    <IOSTabs value={currentValue} onChange={handleChange}>
      {showModes.map((e, i) => (
        <IOSTab label={e.text} key={i} />
      ))}
    </IOSTabs>
  )
}
const TabGroup = React.memo(TabGroupUnmemoized)

type ShowMode = 'top' | 'new'
const showModes: { text: string; mode: ShowMode }[] = [
  {
    text: 'Лучшие',
    mode: 'top',
  },
  {
    text: 'Новые',
    mode: 'new',
  },
]
const switcherButtonsDataNew = modes.filter(
  (e) => e.switcherText && e.isNewMode
)
const switcherButtonsDataTop = modes.filter(
  (e) => e.switcherText && !e.isNewMode
)
const Switcher: React.FC<{
  flow?: FlowAlias
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
  handleClick: ({ mode: newMode, to }: { mode: Mode; to: string }) => void
}> = ({ flow, handleClick, mode, setMode }) => {
  const [isOpen, setOpen] = useState(false)
  const current = modes.find((e) => e.mode === mode)
  const [showMode, setShowMode] = useState<ShowMode>(
    current.isNewMode ? 'new' : 'top'
  )
  const [drawerMode, setDrawerMode] = useState<ModeObject>(current)
  const currentFlow = flow ? FLOWS.find((e) => e.alias === flow) : null
  const classes = useStyles()

  const onButtonClick = () => {
    setOpen((prev) => !prev)
  }
  const handleShowModeChange = (newShowMode: ShowMode, updateMode = false) => {
    if (newShowMode !== showMode) {
      setShowMode(newShowMode)
      if (newShowMode === 'new') {
        setDrawerMode(switcherButtonsDataNew[0])
        if (updateMode) {
          setMode(switcherButtonsDataNew[0].mode)
          handleClick(switcherButtonsDataNew[0])
        }
      } else {
        setDrawerMode(switcherButtonsDataTop[0])
        if (updateMode) {
          setMode(switcherButtonsDataTop[0].mode)
          handleClick(switcherButtonsDataTop[0])
        }
      }
    }
  }
  const handleApplyClick = () => {
    setMode(drawerMode.mode)
    handleClick(drawerMode)
    setOpen(false)
  }
  const onChange = (e: ModeObject) => setDrawerMode(e)
  const onDesktopSwitcherChange = (e: ModeObject) => {
    setDrawerMode(e)
    setMode(e.mode)
    handleClick(e)
  }

  useEffect(() => {
    const newCurrentMode = modes.find((e) => e.mode === mode)
    setShowMode(newCurrentMode.isNewMode ? 'new' : 'top')
    setDrawerMode(newCurrentMode)
  }, [mode, handleClick])

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

      <div className={classes.switcherDesktop}>
        {currentFlow && (
          <Typography className={classes.currentFlow}>
            {currentFlow.title}
          </Typography>
        )}
        <div className={classes.inline}>
          <TabGroup
            handleShowModeChange={(m) => handleShowModeChange(m, true)}
            showMode={showMode}
            desktop
          />
          <SwitcherButtons
            data={
              showMode === 'new'
                ? switcherButtonsDataNew
                : switcherButtonsDataTop
            }
            onChange={onDesktopSwitcherChange}
            currentValue={drawerMode.mode}
            inline
          />
        </div>
      </div>

      <BottomDrawerMargin isOpen={isOpen} setOpen={setOpen}>
        <Typography className={classes.drawerTitleText}>
          Сначала показывать
        </Typography>
        <TabGroup
          handleShowModeChange={handleShowModeChange}
          showMode={showMode}
        />

        {/** Block for 'new' showMode */}
        {showMode === 'new' && (
          <>
            <Typography
              className={classes.drawerTitleText}
              style={{ marginTop: 16 }}
            >
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
            <Typography
              className={classes.drawerTitleText}
              style={{ marginTop: 16 }}
            >
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
      </BottomDrawerMargin>
    </>
  )
}

export default React.memo(Switcher)

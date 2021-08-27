import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { usePagination } from '@material-ui/lab/Pagination'
import { PaginationItem } from '@material-ui/lab'
import { fade, Typography } from '@material-ui/core'
import { MIN_WIDTH } from 'src/config/constants'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import useMediaExtendedQuery from 'src/hooks/useMediaExtendedQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: (disabled) =>
      disabled ? theme.palette.text.hint : theme.palette.text.primary,
    display: 'flex',
    background: theme.palette.background.paper,
    overflow: 'hidden',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      marginBottom: theme.spacing(2),
      borderRadius: 8,
    },
  },
  ul: {
    width: '100%',
    justifyContent: 'space-between',
    height: '100%',
    margin: 0,
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
    listStyle: 'none',
    alignItems: 'center',
  },
  navigationButton: {
    height: '100%',
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignItems: 'center',
    background: 'transparent',
    outline: 'none',
    border: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    userSelect: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    '&:disabled': {
      color: theme.palette.action.disabled,
      cursor: 'default',
    },
    '&:hover:enabled': {
      background: fade(theme.palette.primary.main, 0.03),
    },
    '&:active:enabled': {
      background: fade(theme.palette.primary.main, 0.1),
    },
  },
  navigationButtonText: {
    display: 'none',
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 15,
    '-webkit-font-smoothing': 'antialiased',
    lineHeight: '1.25rem',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'block',
    },
  },
  nextNavigationButton: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      paddingLeft: theme.spacing(2),
    },
  },
  previousNavigationButton: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      paddingRight: theme.spacing(2),
    },
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    background: theme.palette.action.selected,
  },
}))

const Pagination = ({
  disabled = false,
  steps,
  handleChange,
  currentStep = 1,
}) => {
  const classes = useStyles(disabled)
  const isExtended = useMediaExtendedQuery()
  const { items } = usePagination({
    onChange: handleChange,
    count: steps,
    page: currentStep,
    disabled,
    siblingCount: 1,
    boundaryCount: isExtended ? 2 : 1,
  })

  return (
    <nav aria-label="pagination navigation" className={classes.root}>
      <ul className={classes.ul}>
        <button
          className={[
            classes.navigationButton,
            classes.previousNavigationButton,
          ].join(' ')}
          disabled={items[0].disabled}
          onClick={items[0].onClick}
        >
          <ChevronLeftRoundedIcon />
          <Typography className={classes.navigationButtonText}>сюда</Typography>
        </button>
        <div className={classes.items}>
          {items.slice(1, items.length - 1).map((item, i) => (
            <PaginationItem shape="rounded" color="primary" key={i} {...item} />
          ))}
        </div>
        <button
          className={[
            classes.navigationButton,
            classes.nextNavigationButton,
          ].join(' ')}
          disabled={items[items.length - 1].disabled}
          onClick={items[items.length - 1].onClick}
        >
          <Typography className={classes.navigationButtonText}>туда</Typography>
          <ChevronRightRoundedIcon />
        </button>
      </ul>
    </nav>
  )
}

export default React.memo(Pagination)

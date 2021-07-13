import React from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'
import {
  Typography,
  useTheme,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
    position: 'relative',
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    paddingBottom: 0,
    padding: theme.spacing(1.8, 2),
  },
}))

const Language = () => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <OutsidePage
      headerText={'Настройки языка'}
      disableShrinking
      backgroundColor={theme.palette.background.paper}
    >
      <div className={classes.root}>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Интерфейс</Typography>
        </div>
        <div className={classes.section}>
          <Typography className={classes.sectionHeader}>Публикации</Typography>
        </div>
      </div>
    </OutsidePage>
  )
}

export default React.memo(Language)

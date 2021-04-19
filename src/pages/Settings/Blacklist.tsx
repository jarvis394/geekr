import React from 'react'
import OutsidePage from 'src/components/blocks/OutsidePage'
import { fade, makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'
import { Typography } from '@material-ui/core'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      border: '1px solid ' + fade(theme.palette.divider, 0.05),
      borderRadius: 8,
    },
    padding: theme.spacing(1.8, 2),
  },
  sectionHeader: {
    fontSize: 13,
    color: theme.palette.text.hint,
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Google Sans',
    marginBottom: theme.spacing(1.5),
    paddingBottom: 0,
  },
}))

const Blacklist = () => {
  const classes = useStyles()
  const hiddenAuthors = useSelector(store => store.settings.hiddenAuthors)
  const hiddenCompanies = useSelector(store => store.settings.hiddenCompanies)

  return (
    <OutsidePage headerText={'Чёрный список'} disableShrinking>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>Скрытые авторы</Typography>
        
      </div>
      <div className={classes.section}>
        <Typography className={classes.sectionHeader}>Скрытые компании</Typography>
        
      </div>
    </OutsidePage>
  )
}

export default Blacklist

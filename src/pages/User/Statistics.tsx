// eslint-disable
import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  headerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  headerTitle: {
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  headerNumber: {
    fontSize: 24,
    fontWeight: 800,
    fontFamily: 'Google Sans',
  },
}))

/**
 * 1. Title
 * 2. Data
 * 3. Should be colored
 */
type Item = [string, string | number, boolean?]

export const Statistics = () => {
  const { user } = useSelector((store) => store.user.profile.user.data)
  if (!user) return null

  const classes = useStyles()
  const items: Item[] = [
    ['Карма', user.score, true],
    ['Рейтинг', user.rating],
  ]

  if (user.rating_position !== 0) {
    items.push(['Позиция', user.rating_position])
  }

  return (
    <Grid className={classes.headerContainer} container justify="center">
      {items.map((e, i) => (
        <div key={i} className={classes.headerColumn}>
          <Typography className={classes.headerTitle}>
            {e[0].toUpperCase()}
          </Typography>
          {e[2] ? (
            <GreenRedNumber
              noPlusSign
              number={e[1]}
              classes={classes.headerNumber}
            />
          ) : (
            <Typography className={classes.headerNumber}>{e[1]}</Typography>
          )}
        </div>
      ))}
    </Grid>
  )
}

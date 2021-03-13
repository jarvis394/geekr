import * as React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { GridListTile } from '@material-ui/core'
import { ADVERTS_BLOCK_HEIGHT } from 'src/config/constants'

const useStyles = makeStyles((theme) => ({
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 8,
  },
}))

const AdvertsBlockSkeleton = () => {
  const classes = useStyles()

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <GridListTile
          key={i}
          style={{ padding: '2px 2px 2px 16px', width: '90.9091%' }}
        >
          <Skeleton
            variant="rect"
            className={classes.skeleton}
            key={i}
            height={ADVERTS_BLOCK_HEIGHT}
          />
        </GridListTile>
      ))}
    </>
  )
}

export default React.memo(AdvertsBlockSkeleton)

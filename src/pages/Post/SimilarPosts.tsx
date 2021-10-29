import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Posts } from 'src/interfaces'
import DensePostsSkeleton from 'src/components/skeletons/DensePosts'
import getSimilar from 'src/api/getSimilar'
import DensePostItem from './DensePostItem'
import { MIN_WIDTH } from 'src/config/constants'

interface Props {
  id: number | string
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(0, 2),
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      marginTop: theme.spacing(2),
      borderRadius: 8,
      paddingBottom: theme.spacing(1),
    },
  },
  header: {
    fontFamily: 'Google Sans',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '1px',
    color: theme.palette.text.hint,
    lineHeight: 'normal',
    borderBottom: '1px solid ' + theme.palette.divider,
    padding: theme.spacing(2, 0, 1.8, 0),
  },
  error: {
    color: theme.palette.error.light,
    fontWeight: 800,
  },
  postItem: {
    paddingTop: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    '&:not(:first-child)': {
      borderTop: '1px solid ' + fade(theme.palette.divider, 0.05),
    },
    '&:first-child': {
      paddingTop: theme.spacing(1),
    },
  },
}))

const SimilarPosts = (props: Props) => {
  const { id } = props
  const classes = useStyles()
  const [data, setData] = useState<Posts>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const get = async () => {
      try {
        setData(await getSimilar(Number(id)))
      } catch (e) {
        console.warn('Could not fetch similar posts:', (e as Error).message)
        setError((e as Error).message)
      }
    }
    get()
  }, [id])

  return data && data.articleIds.length !== 0 ? (
    <Paper elevation={0} className={classes.root}>
      <Typography className={classes.header}>Похожие статьи</Typography>
      {error && (
        <Typography className={classes.error}>
          Произошла ошибка при запросе
        </Typography>
      )}
      <div>
        {!data && <DensePostsSkeleton n={3} />}
        {data &&
          data.articleIds.map((e, i) => (
            <DensePostItem
              className={classes.postItem}
              post={data.articleRefs[e]}
              key={i}
            />
          ))}
      </div>
    </Paper>
  ) : null
}

export default React.memo(SimilarPosts)

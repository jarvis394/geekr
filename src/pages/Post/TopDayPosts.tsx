import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Posts } from 'src/interfaces'
import DensePostsSkeleton from 'src/components/skeletons/DensePosts'
import { getPosts } from 'src/api'
import DensePostItem from './DensePostItem'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 2),
    borderRadius: 0,
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    color: theme.palette.primary.main,
    fontSize: 24,
    marginBottom: theme.spacing(1),
    lineHeight: '24px',
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
  },
}))

const TopDayPosts = () => {
  const classes = useStyles()
  const [data, setData] = useState<Posts>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const get = async () => {
      try {
        setData(await getPosts('daily', 1))
      } catch (e) {
        console.warn('Could not fetch top day posts:', e.message)
        setError(e.message)
      }
    }
    get()
  }, [])

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography className={classes.header}>Лучшее за день</Typography>
      {error && (
        <Typography className={classes.error}>
          Произошла ошибка при запросе
        </Typography>
      )}
      <div>
        {!data && <DensePostsSkeleton n={5} />}
        {data &&
          data.articleIds
            .slice(0, 5)
            .map((id, i) => (
              <DensePostItem
                className={classes.postItem}
                post={data.articleRefs[id]}
                key={i}
              />
            ))}
      </div>
    </Paper>
  )
}

export default React.memo(TopDayPosts)

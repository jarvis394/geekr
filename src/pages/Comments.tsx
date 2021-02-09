import React, { useState, useEffect } from 'react'
import Comments from '../components/blocks/Comments/Main'
import { useParams } from 'react-router'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getPost } from '../api'
import { Post } from '../interfaces'
import OutsidePage from 'src/components/blocks/OutsidePage'

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
}))

const CommentsPage = () => {
  const [post, setPost] = useState<Post>()
  const [error, setError] = useState<string>()
  const { id } = useParams<{ id: string }>()
  const classes = useStyles()

  useEffect(() => {
    const get = async () => {
      // Reset error state
      setError(null)

      try {
        setPost(await getPost(id))
      } catch (e) {
        console.error('On getting article data in Comments:', e.message)
        if (e.statusCode === 404) return setError('Статья не найдена')
        else return setError('Произошла ошибка при запросе')
      }
    }
    get()
  }, [id])

  if (error)
    return <Typography className={classes.errorText}>{error}</Typography>

  return (
    <OutsidePage
      hidePositionBar
      headerText={post?.titleHtml}
      shrinkedHeaderText={post?.titleHtml}
    >
      <Comments post={post} />
    </OutsidePage>
  )
}

export default React.memo(CommentsPage)

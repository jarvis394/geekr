import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'
import { get } from 'request-promise-native'

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: '800',
    fontFamily: 'Google Sans',
    fontSize: 20,
    marginBottom: theme.spacing(1)
  }
}))

const getPost = id =>
  get(`https://m.habr.com/kek/v1/articles/${id}/?fl=ru&hl=ru`, { json: true })

const Post = props => {
  const [post, setPost] = useState()
  const classes = useStyles()
  const { id } = useParams()

  useEffect(() => {
    const get = async () => setPost((await getPost(id)).data)
    get()
  }, [])

  return post ? (
    <Container style={{ overflow: 'auto', width: '100%' }}>
      <Typography className={classes.title}>{post.article.title}</Typography>
      <Typography variant="body" dangerouslySetInnerHTML={{ __html: post.article.text_html }}></Typography>
    </Container>
  ) : (
    <Typography variant="h4">Loading...</Typography>
  )
}

export default Post

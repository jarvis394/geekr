import React from 'react'
import { Paper, Typography, ButtonBase, fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import { useSelector } from 'src/hooks'
import { useHistory } from 'react-router'
import getPostLink from 'src/utils/getPostLink'
import PostLocationState from 'src/interfaces/PostLocationState'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    backgroundColor: fade(theme.palette.background.paper, 0.5),
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: (progress: number) => progress * 100 + '%',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      height: '100%',
      background:
        theme.palette.type === 'dark'
          ? 'rgba(255, 255, 255, .05)'
          : 'rgba(0, 0, 0, .05)',
    },
  },
  button: {
    padding: theme.spacing(1),
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    width: '100%',
  },
  text: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 18,
    marginTop: -2,
    flexGrow: 1,
    textAlign: 'initial',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.hint,
    textAlign: 'initial',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    flexGrow: 1,
  },
  progress: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.hint,
    marginLeft: theme.spacing(2),
  },
  icon: {
    marginTop: -1,
  },
  textWithIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  textWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
}))

const ContinueReadingButton = () => {
  const post = useSelector((store) => store.post.lastPost.data)
  const offset = useSelector((store) => store.post.lastPost.offset)
  const progress = useSelector((store) => store.post.lastPost.progress)
  const classes = useStyles(progress || 0)
  const history = useHistory<PostLocationState>()

  if (!post) return null

  const redirect = () => {
    const postLink = getPostLink(post)
    history.push(postLink, {
      offset,
    })
  }

  return (
    <Paper
      variant="outlined"
      className={classes.root}
      onClick={() => redirect()}
    >
      <ButtonBase className={classes.button}>
        <div className={classes.textWrapper}>
          <Typography className={classes.title}>Продолжить чтение</Typography>
          <Typography className={classes.progress}>
            {Math.round(progress * 100)}%
          </Typography>
        </div>
        <div className={classes.textWithIconWrapper}>
          <Typography className={classes.text}>{post.titleHtml}</Typography>
          <ChevronRightRoundedIcon className={classes.icon} />
        </div>
      </ButtonBase>
    </Paper>
  )
}

export default React.memo(ContinueReadingButton)

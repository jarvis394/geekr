import React from 'react'
import { Paper, Typography, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '45%',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      height: '100%',
      background:
        theme.palette.type === 'dark'
          ? 'rgba(255, 255, 255, .1)'
          : 'rgba(0, 0, 0, .1)',
    },
  },
  button: {
    padding: theme.spacing(1),
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  text: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 18,
    marginTop: -2,
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.hint,
  },
  progress: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.hint,
  },
  icon: {
    marginTop: -1,
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
}))

const ContinueReadingButton = () => {
  const classes = useStyles()
  const post = useSelector((store) => store.post.lastPost.data)
  // const offset = useSelector(store => store.post.lastPost.offset)
  const progress = useSelector((store) => store.post.lastPost.progress)

  if (!post) return null

  return (
    <Paper variant="outlined" className={classes.root}>
      <ButtonBase className={classes.button}>
        <Typography className={classes.title}>{post.titleHtml}</Typography>
        <div className={classes.textWrapper}>
          <Typography className={classes.text}>Продолжить чтение</Typography>
          <ChevronRightRoundedIcon className={classes.icon} />
        </div>
        <Typography className={classes.progress}>
          {Math.round(progress * 100)}%
        </Typography>
      </ButtonBase>
    </Paper>
  )
}

export default React.memo(ContinueReadingButton)

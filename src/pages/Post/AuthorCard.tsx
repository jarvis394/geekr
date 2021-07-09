import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  DONATION_LINKS_MAP,
  DONATION_TITLES_MAP,
  MIN_WIDTH,
} from 'src/config/constants'
import { Post } from 'src/interfaces'
import UserAvatar from 'src/components/blocks/UserAvatar'
import {
  Typography,
  useTheme,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Link as MUILink,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import SubscribeButton from 'src/components/blocks/SubscribeButton'
import { Icon16Up, Icon16Down } from '@vkontakte/icons'
import GreenRedNumber from 'src/components/formatters/GreenRedNumber'
import { CloseRounded } from '@material-ui/icons'

const INLINE_BUTTONS_WIDTH = 660

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.8, 2),
    [theme.breakpoints.up(MIN_WIDTH)]: {
      marginTop: theme.spacing(2),
      borderRadius: 8,
    },
    [theme.breakpoints.up(INLINE_BUTTONS_WIDTH)]: {
      flexDirection: 'row',
    },
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  flexGrow: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarAndLoginWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  nameAndAlias: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  fullname: {
    fontFamily: 'Google Sans',
    color: theme.palette.text.primary,
    fontSize: 24,
    fontWeight: 800,
  },
  alias: {
    fontFamily: 'Roboto',
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 500,
  },
  grayIcon: {
    color: theme.palette.text.secondary,
    width: 40,
    height: 40,
  },
  statisticsNumber: {
    fontSize: 24,
    fontWeight: 800,
    fontFamily: 'Google Sans',
  },
  statisticsTitle: {
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  statisticsWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(1),
  },
  section: {
    marginTop: theme.spacing(2),
  },
  button: {
    fontSize: 12,
    fontFamily: 'Arial',
    height: 32,
    textTransform: 'none',
  },
  cardWithoutButtonsWrapper: {
    [theme.breakpoints.up(INLINE_BUTTONS_WIDTH)]: {
      flexGrow: 1,
    },
  },
  buttonsWrapper: {
    display: 'flex',
    marginTop: theme.spacing(2),
    gap: theme.spacing(1),
    flexDirection: 'row',
    [theme.breakpoints.up(INLINE_BUTTONS_WIDTH)]: {
      flexDirection: 'row-reverse',
      marginTop: 0,
    },
  },
  aliasBig: {
    fontFamily: 'Roboto',
    color: theme.palette.primary.main,
    fontSize: 24,
    fontWeight: 800,
  }
}))

const DonateDialog: React.FC<{
  open: boolean
  post: Post
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ open, setOpen, post }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const paymentDetails = Object.keys(post.author.paymentDetails).map((e) => ({
    field: e,
    value: post.author.paymentDetails[e],
  }))

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        style={{
          padding: '8px 20px 0 4px',
        }}
      >
        <IconButton onClick={handleClose} style={{ marginRight: 8 }}>
          <CloseRounded />
        </IconButton>
        Платежная система
      </DialogTitle>
      <List>
        {paymentDetails.map(
          (e) =>
            e.value && (
              <ListItem
                button
                key={e.field}
                component={'a'}
                target={'_blank'}
                href={DONATION_LINKS_MAP[e.field] + e.value}
              >
                <ListItemText
                  primary={DONATION_TITLES_MAP[e.field]}
                  secondary={e.value}
                />
              </ListItem>
            )
        )}
      </List>
    </Dialog>
  )
}

const AuthorCard: React.FC<{
  post: Post
}> = ({ post }) => {
  if (!post) return null

  const classes = useStyles()
  const [isSubscribed, setSubscribed] = useState(false)
  const [isDonateDialogOpen, setDonateDialogOpen] = useState(false)
  const theme = useTheme()
  const shouldShowDonateButton = Object.values(post.author.paymentDetails).some(
    (e) => !!e
  )

  return (
    <div className={classes.root}>
      <div className={classes.cardWithoutButtonsWrapper}>
        <div className={classes.flexRow}>
          <div className={classes.flexGrow}>
            <Link
              to={'/user/' + post.author.alias}
              className={classes.avatarAndLoginWrapper}
            >
              <UserAvatar
                className={classes.avatar}
                src={post.author.avatarUrl}
                alias={post.author.alias}
              />
            </Link>
            <div className={classes.statisticsWrapper}>
              <IconButton className={classes.grayIcon}>
                <Icon16Up width={24} height={24} />
              </IconButton>
              <div className={classes.flexColumn}>
                <Typography className={classes.statisticsTitle}>
                  КАРМА
                </Typography>
                <GreenRedNumber number={post.author.scoreStats.score}>
                  <Typography className={classes.statisticsNumber}>
                    {post.author.scoreStats.score > 0 ? '+' : ''}
                    {post.author.scoreStats.score}
                  </Typography>
                </GreenRedNumber>
              </div>
              <IconButton className={classes.grayIcon}>
                <Icon16Down width={24} height={24} />
              </IconButton>
            </div>
            <div
              className={classes.flexColumn}
              style={{ marginLeft: 8, marginRight: 8 }}
            >
              <Typography className={classes.statisticsTitle}>
                РЕЙТИНГ
              </Typography>
              <Typography className={classes.statisticsNumber}>
                {post.author.rating}
              </Typography>
            </div>
          </div>
        </div>
        <Link to={'/user/' + post.author.alias} className={classes.nameAndAlias}>
          <Typography className={classes.fullname}>
            {post.author.fullname}
          </Typography>
          <Typography className={post.author.fullname ? classes.alias : classes.aliasBig}>
            @{post.author.alias}
          </Typography>
        </Link>
        {post.author.speciality && (
          <div className={[classes.flexRow, classes.section].join(' ')}>
            <Typography variant="body1">{post.author.speciality}</Typography>
          </div>
        )}
        {post.author.contacts.length !== 0 && (
          <div className={[classes.flexRow, classes.section].join(' ')}>
            <div className={classes.flexGrow}>
              {post.author.contacts.map((e, i) => (
                <MUILink style={{ marginRight: 8 }} href={e.url} key={i}>
                  {e.title}
                </MUILink>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={classes.buttonsWrapper}>
        <SubscribeButton
          isSubscribed={isSubscribed}
          setSubscribed={setSubscribed}
          backgroundColor={theme.palette.background.paper}
        />
        {shouldShowDonateButton && (
          <>
            <Button
              variant={'outlined'}
              color={'primary'}
              className={classes.button}
              onClick={() => setDonateDialogOpen(true)}
            >
              Задонатить
            </Button>
            <DonateDialog
              open={isDonateDialogOpen}
              setOpen={setDonateDialogOpen}
              post={post}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AuthorCard

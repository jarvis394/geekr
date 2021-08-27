import React, { useState, useEffect } from 'react'
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
  Fade,
} from '@material-ui/core'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { User } from 'src/interfaces/User'
import useSelector from 'src/hooks/useSelector'
import ProfileChildrenSkeleton from 'src/components/skeletons/ProfileChildren'
import { useDispatch } from 'react-redux'
import { getProfileChildren } from 'src/store/actions/profile'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

const useStyles = makeStyles((theme) => ({
  blockTitle: {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Google Sans',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.dark,
    },
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  errorText: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontFamily: 'Google Sans',
    marginTop: theme.spacing(2),
  },
  collapse: {
    position: 'relative',
  },
  collapseShadow: {
    position: 'absolute',
    background:
      'linear-gradient(0deg,' + getContrastPaperColor(theme) + ',transparent)',
    bottom: 0,
    pointerEvents: 'none',
    height: 40,
    width: '100%',
  },
}))

const Children = ({ classes: additionalClasses }: ComponentWithUserParams) => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const profile = useSelector((store) => store.profile.profile.card.data)
  const childrenData = useSelector(
    (store) => store.profile.profile.children.data
  )
  const isFetched = useSelector(
    (store) => store.profile.profile.children.fetched
  )
  const isFetching = useSelector(
    (store) => store.profile.profile.children.fetching
  )
  const fetchError = useSelector(
    (store) => store.profile.profile.children.error
  )
  const sortingFunction = (a: string, b: string) => {
    const aRef = childrenData.userRefs[a]
    const bRef = childrenData.userRefs[b]
    return aRef.alias.localeCompare(bRef.alias)
  }
  const sorted = isFetched ? childrenData.userIds.sort(sortingFunction) : []
  const shouldCollapse = sorted.length > 5

  useEffect(() => {
    setShowAll(false)
    dispatch(getProfileChildren(profile.alias))
  }, [profile.alias, dispatch])

  const Item = ({ data }: { data: User }) => (
    <ListItem
      style={{ paddingLeft: 0, paddingRight: 0 }}
      component={LinkToOutsidePage}
      to={'/user/' + data.alias}
    >
      <ListItemAvatar>
        <UserAvatar
          className={classes.avatar}
          src={data.avatarUrl}
          alias={data.alias}
        />
      </ListItemAvatar>
      <ListItemText
        style={{ margin: 0 }}
        primaryTypographyProps={{ className: classes.link }}
        primary={'@' + data.alias}
        secondary={data.speciality}
      />
    </ListItem>
  )

  if (fetchError)
    return (
      <Typography className={classes.errorText}>
        Не удалось загрузить список приглашённых пользователей
      </Typography>
    )
  if (isFetching) return <ProfileChildrenSkeleton />

  return isFetched && sorted.length !== 0 ? (
    <div className={additionalClasses}>
      <Typography className={classes.blockTitle}>Пригласил на сайт</Typography>
      <Collapse
        className={classes.collapse}
        in={showAll}
        style={{ height: shouldCollapse ? 280 : '100%' }}
        collapsedHeight={shouldCollapse ? 280 : '100%'}
      >
        <List>
          {sorted.map((e) => (
            <Item data={childrenData.userRefs[e]} key={e} />
          ))}
        </List>
        {shouldCollapse && (
          <Fade appear={false} in={!showAll}>
            <div className={classes.collapseShadow} />
          </Fade>
        )}
      </Collapse>

      {shouldCollapse && (
        <Button
          size="small"
          style={{ marginTop: 8 }}
          onClick={() => setShowAll((prev) => !prev)}
          variant="outlined"
        >
          {showAll ? 'Скрыть' : 'Показать всех'}
        </Button>
      )}
    </div>
  ) : null
}

export default React.memo(Children)

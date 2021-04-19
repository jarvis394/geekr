import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router'
import OutsidePage from 'src/components/blocks/OutsidePage'
import Pagination from 'src/components/blocks/Pagination'
import { useSelector } from 'src/hooks'
import { FetchingState, HubAuthor } from 'src/interfaces'
import { getHubAuthors } from 'src/store/actions/hub'
import { HubParams } from '..'
import ErrorComponent from 'src/components/blocks/Error'
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import HubAuthorListItemSkeleton from 'src/components/skeletons/HubAuthorListItem'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { Icon24Flash } from '@vkontakte/icons'
import formatNumber from 'src/utils/formatNumber'
import purple from '@material-ui/core/colors/purple'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: getContrastPaperColor(theme),
    paddingBottom: 0,
    marginBottom: theme.spacing(2)
  },
}))

const useItemStyles = makeStyles((theme) => ({
  root: {
    '-webkit-tap-highlight-color': 'transparent !important',
    textDecoration: 'none',
  },
  alias: {
    color: theme.palette.primary.light,
  },
  avatar: {
    borderRadius: 4,
    background: 'transparent',
  },
  investHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(0.5),
  },
  investIcon: {
    color: theme.palette.type === 'dark' ? purple.A100 : purple.A400
  },
  invest: {
    marginLeft: theme.spacing(1),
    marginTop: 1,
    color: theme.palette.type === 'dark' ? purple[200] : purple.A700
  },
}))

const Item = ({ data }: { data: HubAuthor }) => {
  const classes = useItemStyles()
  return (
    <ListItem
      dense
      button
      className={classes.root}
      component={LinkToOutsidePage}
      to={'/user/' + data.alias}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <UserAvatar
          src={data.avatarUrl}
          alias={data.alias}
          className={classes.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ component: 'div' }}
        secondaryTypographyProps={{ component: 'div' }}
        primary={
          <>
            {data.fullname} <span className={classes.alias}>@{data.alias}</span>
          </>
        }
        secondary={
          <>
            {data.speciality || 'Пользователь'}
            <div className={classes.investHolder}>
              <Icon24Flash className={classes.investIcon} />
              <span className={classes.invest}>
                {formatNumber(data.invest)}
              </span>
            </div>
          </>
        }
      />
    </ListItem>
  )
}

const Authors = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { alias, page } = useParams<HubParams>()
  const fetchState = useSelector((state) => state.hub.authors.state)
  const fetchError = useSelector((state) => state.hub.authors.fetchError)
  const data = useSelector((state) => state.hub.authors.data)
  const pagesCount = useSelector((state) => state.hub.authors.data?.pagesCount)
  const currentPage = Number(page)
  const history = useHistory()
  const location = useLocation()

  const handlePagination = (_, i) => {
    if (i === currentPage) return
    history.push('/hub/' + alias + '/authors/p/' + i, {
      from: location.pathname
    })
  }

  useEffect(() => {
    dispatch(getHubAuthors(alias, currentPage))
  }, [alias, currentPage])

  return (
    <OutsidePage headerText="Авторы" hidePositionBar disableShrinking>
      <List className={classes.root}>
        {fetchState === FetchingState.Fetching &&
          [...new Array(12)].map((_, i) => (
            <HubAuthorListItemSkeleton key={i} />
          ))}
        {fetchState === FetchingState.Fetched &&
          data.authorIds.map((e, i) => (
            <Item key={i} data={data.authorRefs[e]} />
          ))}
        {fetchError && <ErrorComponent message="Не удалось получить авторов" />}
      </List>
      {pagesCount && (
        <Pagination
          disabled={!data}
          handleChange={handlePagination}
          steps={pagesCount}
          currentStep={currentPage}
        />
      )}
    </OutsidePage>
  )
}

export default React.memo(Authors)

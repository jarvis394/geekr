import React, { useEffect } from 'react'
import SideBlock from 'src/components/blocks/SideBlock'
import Sidebar from 'src/components/blocks/Sidebar'
import { getMostReading, getTopCompanies } from 'src/store/actions/home'
import { useDispatch } from 'react-redux'
import { useSelector } from 'src/hooks'
import { Company, FetchingState, Post } from 'src/interfaces'
import { makeStyles, lighten, darken, fade } from '@material-ui/core/styles'
import LinkToOutsidePage from 'src/components/blocks/LinkToOutsidePage'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import getPostLink from 'src/utils/getPostLink'
import parse from 'html-react-parser'
import formatNumber from 'src/utils/formatNumber'
import purple from '@material-ui/core/colors/purple'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'

const ld = { lighten, darken }
const useSkeletonStyles = makeStyles((theme) => ({
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 8,
  },
}))

const useStyles = makeStyles((theme) => ({
  companiesChildrenContainerProps: {
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginTop: 12,
    width: '100%',
  },
}))

const usePostItemStyles = makeStyles((theme) => ({
  root: {
    background: 'transparent',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: '1px solid ' + fade(theme.palette.divider, 0.05),
    '&:first-child': {
      marginTop: 0,
      paddingTop: 0,
      borderTop: 'none',
    },
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bottomRowItem: {
    color: theme.palette.text.hint,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    '-webkit-tap-highlight-color': fade(theme.palette.background.paper, 0.3),
  },
  bottomRowItemIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  bottomRowItemText: {
    fontSize: 13,
    fontWeight: 600,
  },
  title: {
    color: theme.palette.text.primary,
    '&:visited > p': {
      color: ld[theme.palette.type + 'en'](theme.palette.text.primary, 0.4),
    },
    fontWeight: 800,
    fontFamily: '"Google Sans"',
    fontSize: 15,
    marginTop: (hasImage) => (hasImage ? 0 : theme.spacing(1)),
    textDecoration: 'none !important',
    marginBottom: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: theme.spacing(3),
  },
}))

const useCompanyItemStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none !important',
    background: 'transparent !important',
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
    '&:first-child': {
      marginTop: 0,
    },
  },
  avatar: {
    marginRight: theme.spacing(1.5),
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
  },
  rating: {
    marginLeft: 'auto',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
    color: theme.palette.type === 'dark' ? purple[200] : purple.A700,
  },
}))

const CompanyItem: React.FC<{ data: Company }> = ({ data }) => {
  const classes = useCompanyItemStyles()
  const companyLink = '/company/' + data.alias

  return (
    <LinkToOutsidePage className={classes.root} to={companyLink}>
      <img className={classes.avatar} alt={data.alias} src={data.imageUrl} />
      <span className={classes.title}>{parse(data.titleHtml)}</span>
      <span className={classes.rating}>{data.statistics.rating}</span>
    </LinkToOutsidePage>
  )
}

const PostItem: React.FC<{ data: Post }> = ({ data }) => {
  const classes = usePostItemStyles()
  const { titleHtml: unparsedTitle, statistics } = data
  const postLink = getPostLink(data)
  const title = parse(unparsedTitle)
  const { readingCount, commentsCount } = statistics
  const comments = formatNumber(Number(commentsCount))
  const reads = formatNumber(readingCount)

  return (
    <div className={classes.root}>
      <LinkToOutsidePage className={classes.title} to={postLink}>
        {title}
      </LinkToOutsidePage>

      <div className={classes.bottomRow}>
        <div className={classes.bottomRowItem}>
          <VisibilityIcon className={classes.bottomRowItemIcon} />
          <span className={classes.bottomRowItemText}>{reads}</span>
        </div>
        <LinkToOutsidePage
          to={postLink + '/comments'}
          className={classes.bottomRowItem + ' ' + classes.marginLeft}
        >
          <ChatBubbleIcon className={classes.bottomRowItemIcon} />
          <span className={classes.bottomRowItemText}>{comments}</span>
        </LinkToOutsidePage>
      </div>
    </div>
  )
}

const MostReadingSideBlockSkeleton = () => {
  const classes = useSkeletonStyles()
  const postItemClasses = usePostItemStyles()
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={postItemClasses.root}>
          <Skeleton
            variant="rect"
            width={'85%'}
            height={13}
            className={[classes.skeleton, postItemClasses.title].join(' ')}
          />
          <Skeleton
            variant="rect"
            width={'70%'}
            height={13}
            style={{ marginTop: 4 }}
            className={[classes.skeleton, postItemClasses.title].join(' ')}
          />
          <Skeleton
            variant="rect"
            width={'75%'}
            height={13}
            style={{ marginTop: 4 }}
            className={[classes.skeleton, postItemClasses.title].join(' ')}
          />
          <div className={postItemClasses.bottomRow} style={{ marginTop: 4 }}>
            <div className={postItemClasses.bottomRowItem}>
              <Skeleton
                width={14}
                variant="rect"
                height={14}
                className={[
                  classes.skeleton,
                  postItemClasses.bottomRowItemIcon,
                ].join(' ')}
              />
              <Skeleton
                width={44}
                variant="rect"
                height={14}
                className={[
                  classes.skeleton,
                  postItemClasses.bottomRowItemText,
                ].join(' ')}
              />
            </div>
            <div
              className={
                postItemClasses.bottomRowItem + ' ' + postItemClasses.marginLeft
              }
            >
              <Skeleton
                width={14}
                variant="rect"
                height={14}
                className={[
                  classes.skeleton,
                  postItemClasses.bottomRowItemIcon,
                ].join(' ')}
              />
              <Skeleton
                width={32}
                variant="rect"
                height={14}
                className={[
                  classes.skeleton,
                  postItemClasses.bottomRowItemText,
                ].join(' ')}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const CompaniesSideBlockSkeleton = () => {
  const classes = useSkeletonStyles()
  const companyItemClasses = useCompanyItemStyles()
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div key={i} className={companyItemClasses.root}>
          <Skeleton
            variant="rect"
            className={[classes.skeleton, companyItemClasses.avatar].join(' ')}
          />
          <Skeleton
            variant="rect"
            width={84}
            height={14}
            className={[classes.skeleton, companyItemClasses.title].join(' ')}
          />
          <Skeleton
            variant="rect"
            width={44}
            height={14}
            className={[classes.skeleton, companyItemClasses.rating].join(' ')}
          />
        </div>
      ))}
    </>
  )
}

const HomeSidebar = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const mostReadingState = useSelector(
    (store) => store.home.sidebar.mostReading.state
  )
  const mostReadingFetchError = useSelector(
    (store) => store.home.sidebar.mostReading.fetchError
  )
  const mostReading = useSelector(
    (store) => store.home.sidebar.mostReading.data
  )
  const topCompaniesState = useSelector(
    (store) => store.home.sidebar.topCompanies.state
  )
  const topCompaniesFetchError = useSelector(
    (store) => store.home.sidebar.topCompanies.fetchError
  )
  const topCompanies = useSelector(
    (store) => store.home.sidebar.topCompanies.data
  )

  useEffect(() => {
    dispatch(getMostReading())
    dispatch(getTopCompanies())

    if (mostReadingState === FetchingState.Error) {
      console.error(
        'Fetch error in HomeSidebar (mostReading):',
        mostReadingFetchError
      )
    }
    if (topCompaniesState === FetchingState.Error) {
      console.error(
        'Fetch error in HomeSidebar (topCompanies):',
        topCompaniesFetchError
      )
    }
  }, [])

  return (
    <Sidebar>
      {topCompaniesState !== FetchingState.Error && (
        <SideBlock
          childrenContainerProps={{
            className: classes.companiesChildrenContainerProps,
          }}
          title={'Лучшие компании'}
        >
          {topCompaniesState !== FetchingState.Fetched && (
            <CompaniesSideBlockSkeleton />
          )}
          {topCompaniesState === FetchingState.Fetched &&
            topCompanies.companyIds.map((e) => (
              <CompanyItem data={topCompanies.companyRefs[e]} key={e} />
            ))}
          <Link
            to={'/companies/p/1'}
            style={{
              textDecoration: 'none',
            }}
          >
            <Button className={classes.button} size="small" color="primary">
              Все компании
            </Button>
          </Link>
        </SideBlock>
      )}
      {mostReadingState !== FetchingState.Error && (
        <SideBlock title={'Читают сейчас'}>
          {mostReadingState !== FetchingState.Fetched && (
            <MostReadingSideBlockSkeleton />
          )}
          {mostReadingState === FetchingState.Fetched && mostReading?.articleIds && 
            mostReading.articleIds
              .slice(0, 5)
              .map((e) => (
                <PostItem data={mostReading.articleRefs[e]} key={e} />
              ))}
        </SideBlock>
      )}
    </Sidebar>
  )
}

export default HomeSidebar

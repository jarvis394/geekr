import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'
import { Post } from 'src/interfaces'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { Fade, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'src/hooks'
import FormattedText from 'src/components/formatters/FormattedText'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  skeleton: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 8,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    marginTop: 0,
    borderRadius: 0,
    overflow: 'hidden',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
      marginTop: theme.spacing(1.5),
    },
  },
  paper: {
    padding: theme.spacing(1.8, 2),
    display: 'none',
    flexDirection: 'column',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
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
  avatarLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  companyNameAndDescription: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  companyName: {
    fontFamily: 'Google Sans',
    color: theme.palette.text.primary,
    fontSize: 24,
    fontWeight: 800,
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
  description: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    lineHeight: '20px',
    margin: 0,
    marginTop: 4,
  },
  companyHeaderLink: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      marginTop: theme.spacing(1.5),
    },
  },
  companyHeader: {
    width: '100%',
    borderRadius: 0,
    height: 'calc(100% / 4.4)',
  },
  brandingLink: {
    display: 'flex',
    position: 'relative',
    background: theme.palette.action.hover,
    '&::before': {
      paddingBottom: 'calc(100% / 4.4)',
      content: '""',
    },
  },
}))

const CompanyCardSkeleton = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Skeleton
        variant="rect"
        style={{ borderRadius: 0 }}
        className={[classes.skeleton, classes.brandingLink].join(' ')}
      />
      <div className={classes.paper}>
        <div className={classes.flexRow}>
          <div className={classes.avatarLink}>
            <Skeleton
              className={classes.avatar}
              style={{ borderRadius: 4 }}
              variant="rect"
            />
          </div>
          <div
            className={classes.flexColumn}
            style={{ marginLeft: 16, marginRight: 16 }}
          >
            <div className={classes.statisticsTitle}>
              <Skeleton
                className={classes.skeleton}
                width={54}
                height={16}
                variant="rect"
              />
            </div>
            <div className={classes.statisticsNumber}>
              <Skeleton
                className={classes.skeleton}
                width={86}
                height={24}
                style={{ marginTop: 8 }}
                variant="rect"
              />
            </div>
          </div>
        </div>
        <div className={classes.companyNameAndDescription}>
          <Skeleton
            className={[classes.skeleton, classes.companyName].join(' ')}
            width={'25%'}
            height={25}
            style={{ marginTop: 12, minWidth: 200 }}
            variant="rect"
          />
          <Skeleton
            className={[classes.skeleton, classes.description].join(' ')}
            width={'50%'}
            height={16}
            style={{ marginTop: 12, minWidth: 360 }}
            variant="rect"
          />
        </div>
      </div>
    </div>
  )
}

const CompanyCard: React.FC<{
  post: Post
  companyAlias: string
}> = ({ post, companyAlias }) => {
  const company = useSelector((store) => store.post.company.data)
  const classes = useStyles()

  if (!companyAlias) return null
  if (!post || !company) return <CompanyCardSkeleton />

  return (
    <div className={classes.root}>
      {company?.settings?.branding?.imageUrl && (
        <a
          className={classes.brandingLink}
          href={company.settings.branding.linkUrl}
        >
          <Fade in>
            <img
              alt={company.alias}
              className={classes.companyHeader}
              src={company.settings.branding.imageUrl}
            />
          </Fade>
        </a>
      )}
      <div className={classes.paper}>
        <div className={classes.flexRow}>
          <Link to={'/company/' + company.alias} className={classes.avatarLink}>
            <UserAvatar
              className={classes.avatar}
              src={company.imageUrl}
              alias={company.alias}
            />
          </Link>
          <div
            className={classes.flexColumn}
            style={{ marginLeft: 16, marginRight: 16 }}
          >
            <Typography className={classes.statisticsTitle}>РЕЙТИНГ</Typography>
            <Typography className={classes.statisticsNumber}>
              {company.statistics.rating}
            </Typography>
          </div>
        </div>
        <Link
          to={'/company/' + company.alias}
          className={classes.companyNameAndDescription}
        >
          <Typography className={classes.companyName}>
            {company.titleHtml}
          </Typography>
          {company.descriptionHtml && (
            <FormattedText className={classes.description}>
              {company.descriptionHtml}
            </FormattedText>
          )}
        </Link>
      </div>
    </div>
  )
}

export default CompanyCard

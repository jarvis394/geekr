import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MIN_WIDTH } from 'src/config/constants'
import { Post } from 'src/interfaces'
import UserAvatar from 'src/components/blocks/UserAvatar'
import { Typography, Link as MUILink } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'src/hooks'
import FormattedText from 'src/components/formatters/FormattedText'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.8, 2),
    borderRadius: 0,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      display: 'flex',
      borderRadius: 8,
      marginTop: theme.spacing(2),
    },
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  companyNameAndDescription: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  companyName: {
    fontFamily: 'Google Sans',
    color: theme.palette.text.primary,
    fontSize: 15,
    fontWeight: 800,
    lineHeight: '16px',
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
  description: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    lineHeight: '16px',
    margin: 0,
    marginTop: 6,
  },
  links: {
    marginTop: theme.spacing(1.8),
    display: 'flex',
    gap: theme.spacing(1),
  },
  contactLink: {
    fontSize: 14,
  },
}))

const CompanyCardWithLinks: React.FC<{
  post: Post
}> = ({ post }) => {
  if (!post) return null

  const company = useSelector((store) => store.post.company.data)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.flexRow}>
        <Link to={'/company/' + company.alias} className={classes.link}>
          <UserAvatar
            className={classes.avatar}
            src={company.imageUrl}
            alias={company.alias}
          />
          <div className={classes.companyNameAndDescription}>
            <FormattedText className={classes.companyName}>
              {company.titleHtml}
            </FormattedText>
            {company.descriptionHtml && (
              <FormattedText className={classes.description}>
                {company.descriptionHtml}
              </FormattedText>
            )}
          </div>
        </Link>
      </div>
      <div className={classes.links}>
        {company.contacts.map((e, i) => (
          <MUILink
            target={'_blank'}
            href={e.url}
            key={i}
            className={classes.contactLink}
          >
            {e.title}
          </MUILink>
        ))}
      </div>
    </div>
  )
}

export default CompanyCardWithLinks

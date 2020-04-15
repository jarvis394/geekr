import React from 'react'
import { Typography } from '@material-ui/core'
import numToWord from 'number-to-words-ru'
import { ComponentWithUserParams } from './index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  dot: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export const FollowersCount = ({ user }: ComponentWithUserParams) => {
  const classes = useStyles()
  const followers = Number(user.counters.followers)
  const followed = Number(user.counters.followed)
  const followersCases = ['подписчик', 'подписчика', 'подписчиков']
  const followedCases = ['подписка', 'подписки', 'подписок']
  const generateOptions = (cases: string[]) => ({
    currency: {
      currencyNameCases: cases,
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })
  const followersText = numToWord.convert(
    followers,
    generateOptions(followersCases)
  )
  const followedText = numToWord.convert(
    followed,
    generateOptions(followedCases)
  )
  return (
    <Typography variant="body2">
      {followersText}
      <span className={classes.dot}>•</span>
      {followedText}
    </Typography>
  )
}

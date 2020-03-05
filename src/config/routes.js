import React from 'react'

import {
  DnsRounded,
  ForumRounded,
  NotificationsRounded,
} from '@material-ui/icons'

export default [
  {
    name: 'Новости',
    icon: <DnsRounded />,
    path: ''
  },
  {
    name: 'Сообщения',
    icon: <ForumRounded />,
    path: 'im'
  },
  {
    name: 'Увледомления',
    icon: <NotificationsRounded />,
    path: 'notifications'
  },
]

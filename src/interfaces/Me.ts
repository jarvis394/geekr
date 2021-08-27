export default interface Me {
  id: string
  alias: string
  fullname: string
  avatarUrl: string
  groups: string[]
  settings: {
    miscSettings: {
      viewCommentsRefresh: boolean
      enableShortcuts: boolean
      hideAdv: boolean
      digestSubscription: unknown
    }
    langSettings: {
      hl: 'ru' | 'en'
      fl: 'ru' | 'en'
    }
    chargeSettings: {
      postVoteCount: number
      commentVoteCount: number
    }
    permissionSettings: {
      canAddComplaints: boolean
      canCreateVoices: boolean
    }
  }
  crc32: string
  gaUid: string
  availableInvitesCount: number
  email: string
  scoreStats: {
    score: number
    votesCount: number
  }
  ppaBalance: number | null
  unreadConversationCount: number
  notificationUnreadCounters: {
    posts_and_comments: number
    subscribers: number
    mentions: number
    system: number
    applications: number
  }
  notices: unknown[]
  rssKey: string
  companiesAdmin: unknown[]
}
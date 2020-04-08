import Flow from './Flow'

export default interface Hub {
  id: number
  rating: string | number
  is_profiled: boolean
  title: string
  alias: string
  about_small: string
  about: string
  count_subscribers: string | number
  count_posts: string | number
  tags_string: string
  is_membership: boolean
  is_company: boolean
  flow: Flow
  icon: string
  path: string
}

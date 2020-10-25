import UserArticlesStore from './userArticlesStore'
import UserProfileStore from './userProfileStore'

class NewsStore {
  articlesStore: typeof UserArticlesStore
  profileStore: typeof UserProfileStore

  constructor() {
    this.articlesStore = UserArticlesStore
    this.profileStore = UserProfileStore
  }
}

export default new NewsStore()
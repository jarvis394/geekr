import newsStore from './newsStore'
import postsStore from './postsStore'
import settingsStore from './settingsStore'
import hubsStore from './hubsStore'
import userStore from './userStore'

export default {
  newsStore,
  newsBlockStore: newsStore.NewsBlockStore,
  postsStore,
  settingsStore,
  hubsStore,
  userStore,
  userProfileStore: userStore.profileStore,
  userArticlesStore: userStore.articlesStore,
}
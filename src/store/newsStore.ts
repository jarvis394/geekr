import { observable } from 'mobx'
import NewsBlockStore from './newsBlockStore'
import { ErrorObject, PostsFetchData } from 'src/interfaces'
import { NewsItem } from 'src/interfaces/News'

class NewsStore {
  @observable fetching = false
  @observable fetched = false
  @observable fetchError: ErrorObject = null
  @observable data: PostsFetchData<NewsItem> = {
    pages: {},
    pagesCount: null
  }
  NewsBlockStore: typeof NewsBlockStore

  constructor() {
    this.NewsBlockStore = NewsBlockStore
  }
}

export default new NewsStore()
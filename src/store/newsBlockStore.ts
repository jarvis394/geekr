import { observable } from 'mobx'
import { ErrorObject } from 'src/interfaces'
import { NewsItem } from 'src/interfaces/News'

class NewsBlockStore {
  @observable data: NewsItem[] = null
  @observable fetching = false
  @observable fetched = false
  @observable fetchError: ErrorObject = null
}

export default new NewsBlockStore()
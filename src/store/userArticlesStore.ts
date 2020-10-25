import { observable } from 'mobx'
import { ErrorObject, Posts, PostsFetchData } from 'src/interfaces'

class UserArticlesStore {
  @observable fetching = false
  @observable fetched = false
  @observable fetchError: ErrorObject = null
  @observable data: PostsFetchData<Posts> = {
    pages: {},
    pagesCount: null
  }
}

export default new UserArticlesStore()
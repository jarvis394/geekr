import { observable } from 'mobx'
import { ErrorObject, PostsFetchData } from 'src/interfaces'
import { HubObject } from 'src/interfaces'

class HubsStore {
  @observable fetching = false
  @observable fetched = false
  @observable fetchError: ErrorObject = null
  @observable data: PostsFetchData<HubObject[]> = {
    pages: {},
    pagesCount: null
  }
  @observable searchString: string = null
  @observable searchResults: HubObject[] = []

}

export default new HubsStore()
import { observable } from 'mobx'
import { MODES } from 'src/config/constants'
import { Mode } from 'src/api/getPosts'
import { ErrorObject, Posts, PostsFetchData } from 'src/interfaces'

type ModeFetchData = PostsFetchData<Omit<Posts, 'pagesCount'>>

const modes: Record<Mode, ModeFetchData> = {} as Record<Mode, ModeFetchData>
MODES.forEach(({ mode }) => {
  modes[mode] = {
    pages: {},
    pagesCount: null,
  }
})

class PostsStore {
  @observable data = modes
  @observable fetching = false
  @observable fetched = false
  @observable fetchError: ErrorObject = null
}

export default new PostsStore()
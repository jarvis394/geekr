import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import { API_URL } from '../config/constants'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

interface Arguments {
  /** Token for a closed API request */
  token: string

  /** API response language */
  language?: 'ru' | 'en'

  /** API method as an URL path */
  path: string

  /** Query parameters */
  params?: Record<string, number | string>

  /** Axios request options */
  requestOptions?: AxiosRequestConfig

  /** API version */
  version?: 1 | 2
}

export default async ({
  language = 'ru',
  path,
  token,
  params,
  requestOptions,
  version = 1,
}: Arguments): Promise<AxiosPromise> =>
  await axios({
    method: requestOptions?.method || 'get',
    url: API_URL + `v${version}/` + path,
    params: {
      fl: language,
      hl: language,
      token,
      ...params,
    },
    cancelToken: source.token,
    ...requestOptions,
  })

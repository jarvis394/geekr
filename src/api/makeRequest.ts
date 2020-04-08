import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import { API_URL } from '../config/constants'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

interface Arguments {
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
  params,
  requestOptions,
  version = 2,
}: Arguments): Promise<AxiosPromise> =>
  await axios({
    method: requestOptions?.method || 'get', // Fancy TS v3.8
    url: API_URL + `v${version}/` + path,
    params: {
      fl: language,
      hl: language,
      ...params,
    },
    cancelToken: source.token,
    ...requestOptions,
  })

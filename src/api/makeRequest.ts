import axios, { AxiosRequestConfig } from 'axios'
import { API_TOKEN_URL, API_URL } from '../config/constants'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

interface Arguments {
  /** API response language */
  language?: 'ru' | 'en'

  /** API method as an URL path */
  path: string

  /** Query parameters */
  params?: Record<string, string>

  /** Axios request options */
  requestOptions?: AxiosRequestConfig

  /** API version */
  version?: 1 | 2

  /** Token for a closed API request */
  token?: string
}

export default async <T = never>({
  language = 'ru',
  path,
  params,
  requestOptions,
  version = 2,
  token,
}: Arguments): Promise<T> => {
  const tokenRequestParams = new URLSearchParams(params)
  tokenRequestParams.append('fl', language)
  tokenRequestParams.append('hl', language)

  if (token) {
    return (
      await axios({
        method: 'post',
        url: API_TOKEN_URL,
        data: {
          token,
          method: path,
          request: JSON.stringify({
            params: tokenRequestParams,
            ...requestOptions,
          }),
        },
      })
    ).data
  } else
    return (
      await axios({
        method: requestOptions?.method || 'get',
        url: API_URL + `v${version}/` + path,
        params: {
          fl: language,
          hl: language,
          ...params,
        },
        cancelToken: source.token,
        ...requestOptions,
      })
    ).data
}

import { AxiosRequestConfig, AxiosPromise } from 'axios'
import { makeRequest } from 'habra-auth'

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
}

export default async ({
  language = 'ru',
  path,
  token,
}: Arguments): Promise<AxiosPromise> =>
  await makeRequest({
    method: path,
    token,
    requestParams: { fl: language, hl: language },
  })

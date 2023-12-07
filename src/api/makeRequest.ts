import axios, { AxiosRequestConfig } from 'axios'
import { API_TOKEN_URL, API_URL } from '../config/constants'
import * as userSettings from 'src/utils/userSettings'
import { AuthorizedRequestParams } from 'src/interfaces'

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

  /** Auth data for an authorized request */
  authData?: AuthorizedRequestParams
}

export default async <T = never>({
  language: paramsLanguage,
  path,
  params,
  requestOptions,
  version = 2,
  authData,
}: Arguments): Promise<T> => {
  const tokenRequestParams = new URLSearchParams(params)
  const settingsLanguage = userSettings.get().language.feed
  const language = paramsLanguage || settingsLanguage
  tokenRequestParams.append('fl', language)
  tokenRequestParams.append('hl', language)

  if (authData) {
    return (
      await axios({
        method: 'post',
        url: API_TOKEN_URL + 'makeRequest',
        data: {
          ...authData,
          method: path,
          version,
          requestParams: {
            params: {
              fl: language,
              hl: language,
              ...params,
            },
            ...requestOptions,
          },
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

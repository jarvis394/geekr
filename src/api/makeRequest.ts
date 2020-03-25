import axios from 'axios'
import { API_URL } from '../config/constants'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

export default async ({ language, path, params, requestOptions, version }) =>
  await axios({
    method: requestOptions ? requestOptions.method || 'get' : 'get',
    url: API_URL + `v${version || 2}/` + path,
    params: {
      fl: language || 'ru',
      hl: language || 'ru',
      ...params,
    },
    cancelToken: source.token,
    ...requestOptions,
  })

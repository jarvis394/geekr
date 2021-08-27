import axios from 'axios'
import { API_TOKEN_URL } from 'src/config/constants'
import AccountAuthData from 'src/interfaces/AccountAuthData'

export default async (props: AccountAuthData): Promise<string> =>
  (
    await axios({
      method: 'post',
      url: API_TOKEN_URL + 'getCSRFToken',
      data: props,
    })
  ).data

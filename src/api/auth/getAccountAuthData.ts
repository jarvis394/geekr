import axios from 'axios'
import { API_TOKEN_URL } from 'src/config/constants'
import AccountAuthData from 'src/interfaces/AccountAuthData'

export default async (props: {
  email: string
  password: string
}): Promise<AccountAuthData> =>
  (
    await axios({
      method: 'post',
      url: API_TOKEN_URL + 'getAccountAuthData',
      data: props,
    })
  ).data

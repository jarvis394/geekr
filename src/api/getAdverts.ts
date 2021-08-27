import axios from 'axios'
import { AdvertsResponse } from 'src/interfaces'

export default async (): Promise<AdvertsResponse> =>
  (
    await axios({
      method: 'get',
      url: 'https://effect.habr.com/api/inv/pa?area=habr&count=3&ll=ru&al=ru',
    })
  ).data

import makeRequest from './makeRequest'
import { APIResponse, News } from '../interfaces'

export default async (): Promise<APIResponse<News.NewsItem[]>> =>
  (
    await makeRequest({
      path: 'news/promolist',
      version: 1,
    })
  ).data

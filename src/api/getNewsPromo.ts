import makeRequest from './makeRequest'

export default async () =>
  (await makeRequest({
    path: 'news/promolist',
    version: 1,
  })).data

import makeRequest from './makeRequest'

// TODO: Needs an interface for the returning data
export default async (): Promise<unknown> =>
  (await makeRequest({
    path: 'news/promolist',
    version: 1,
  })).data

import makeRequest from './makeRequest'

// TODO: Needs an interface for the returning data
export default async (query: string, page: number): Promise<unknown> =>
  (
    await makeRequest({
      path: 'articles',
      version: 1,
      params: {
        query,
        page,
      },
    })
  ).data

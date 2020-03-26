import makeRequest from './makeRequest'

// TODO: Needs an interface for the returning data
export default async (id: number): Promise<unknown> => (await makeRequest({
  path: `articles/${id}/comments`,
  version: 2
})).data

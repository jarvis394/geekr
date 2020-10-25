export default interface PostsFetchData<T> {
  pages: Record<number | string, T>
  pagesCount: null | number
}

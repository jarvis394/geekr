export default (textHtml: string) => {
  const imageURLRegEx = /<img[^>]+src="?([^"\s]+)"?\s*/g
  const imageURLRegExResults = imageURLRegEx.exec(textHtml)
  console
  return imageURLRegExResults
}
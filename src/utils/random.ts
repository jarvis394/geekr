export default (min = 0, max = 1): number => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}
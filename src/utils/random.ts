export default (min: number = 0, max: number = 1): number => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}
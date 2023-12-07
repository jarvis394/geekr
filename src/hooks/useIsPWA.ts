const useIsPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches
}

export default useIsPWA

export default {
  onUpdate: (registration) => {
    registration.unregister().then(() => {
      window.location.reload()
    })
  },
  onSuccess: (registration) => {
    console.info('SW succeed in registration. Yay!')
    console.log('registration:', registration)
  },
}

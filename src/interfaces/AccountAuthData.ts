import { AxiosResponse } from 'axios'

export default interface AccountAuthData {
  connectSID?: string
  habrSessionID?: string
  acc_csid?: string
  PHPSESSID?: string
  hsec_id?: string
  error?: boolean
  message?: string
  isAuthError?: boolean
  isCaptchaError?: boolean
  response?: AxiosResponse
  isUnknownAuthError?: boolean
}

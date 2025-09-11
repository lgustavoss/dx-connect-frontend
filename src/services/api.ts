import axios from 'axios'
import { appConfig } from '../config'

export const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(appConfig.storageTokenKey)
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // Opcional: redirecionar para login ou limpar token
      localStorage.removeItem(appConfig.storageTokenKey)
    }
    return Promise.reject(error)
  },
)



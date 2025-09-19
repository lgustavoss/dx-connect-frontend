import axios from 'axios'
import { appConfig } from '../config'
import { refreshToken } from './authService'

export const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
})

// Garante que apenas um refresh ocorra por vez e que demais 401 aguardem
let refreshRequest: Promise<string | null> | null = null

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(appConfig.storageTokenKey)
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    // Evita tentar refresh para a prpria URL de refresh
    const isRefreshUrl = String(original?.url ?? '').includes('/api/v1/auth/refresh/')
    if (error?.response?.status === 401 && !original._retry && !isRefreshUrl) {
      original._retry = true
      try {
        if (!refreshRequest) {
          refreshRequest = refreshToken().finally(() => { refreshRequest = null })
        }
        const newAccess = await refreshRequest
        if (newAccess) {
          original.headers = original.headers ?? {}
          original.headers.Authorization = `Bearer ${newAccess}`
          return api(original)
        }
      } catch (_) {
        // ignore
      }
      sessionStorage.removeItem(appConfig.storageTokenKey)
      sessionStorage.removeItem(appConfig.storageTokenKey + '_refresh')
      try {
        if (typeof window !== 'undefined') {
          window.location.replace('/login')
        }
      } catch (_) {
        // ignore
      }
    }
    return Promise.reject(error)
  },
)



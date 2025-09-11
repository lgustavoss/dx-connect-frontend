import { api } from './api'
import { appConfig } from '../config'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
}

export async function login(credentials: LoginCredentials): Promise<void> {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials)
  localStorage.setItem(appConfig.storageTokenKey, data.token)
}

export function logout(): void {
  localStorage.removeItem(appConfig.storageTokenKey)
}

export function getToken(): string | null {
  return localStorage.getItem(appConfig.storageTokenKey)
}



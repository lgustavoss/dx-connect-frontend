import { api } from './api'

// Tipos simplificados para a tela de configurações
export interface CompanySettings {
  razao_social?: string
  nome_fantasia?: string
  cnpj?: string
  inscricao_estadual?: string
  regime_tributario?: string
  telefone?: string
  email?: string
  endereco?: {
    cep?: string
    logradouro?: string
    numero?: string
    bairro?: string
    cidade?: string
    uf?: string
  }
}

export interface ChatSettings {
  mensagem_saudacao?: string
  mensagem_fora_expediente?: string
  mensagem_encerramento?: string
  mensagem_inatividade?: string
  timeout_inatividade_minutos?: number
  limite_chats_simultaneos?: number
  horario_funcionamento?: Record<string, { inicio: string; fim: string }>
}

export interface EmailSettings {
  smtp_host?: string
  smtp_port?: number
  smtp_usuario?: string
  smtp_senha?: string
  smtp_ssl?: boolean
  email_from?: string
}

export interface AppearanceSettings {
  primary_color?: string
  secondary_color?: string
  logo_url?: string | null
  favicon_url?: string | null
}

export const configService = {
  async getCompany(): Promise<CompanySettings> {
    const { data } = await api.get('/api/v1/config/company/')
    return data
  },
  async patchCompany(payload: CompanySettings): Promise<CompanySettings> {
    const { data } = await api.patch('/api/v1/config/company/', payload)
    return data
  },

  async getChat(): Promise<ChatSettings> {
    const { data } = await api.get('/api/v1/config/chat/')
    return data
  },
  async patchChat(payload: ChatSettings): Promise<ChatSettings> {
    const { data } = await api.patch('/api/v1/config/chat/', payload)
    return data
  },

  async getEmail(): Promise<EmailSettings> {
    const { data } = await api.get('/api/v1/config/email/')
    return data
  },
  async patchEmail(payload: EmailSettings): Promise<EmailSettings> {
    const { data } = await api.patch('/api/v1/config/email/', payload)
    return data
  },

  async getAppearance(): Promise<AppearanceSettings> {
    const { data } = await api.get('/api/v1/config/appearance/')
    return data
  },
  async patchAppearance(payload: AppearanceSettings): Promise<AppearanceSettings> {
    const { data } = await api.patch('/api/v1/config/appearance/', payload)
    return data
  },
  async uploadAppearance(kind: 'logo' | 'favicon', file: File): Promise<AppearanceSettings> {
    const form = new FormData()
    form.append('kind', kind)
    form.append('file', file)
    const { data } = await api.post('/api/v1/config/appearance/upload/', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data
  },
  async deleteUpload(kind: 'logo' | 'favicon'): Promise<void> {
    await api.delete('/api/v1/config/appearance/upload/', { params: { kind } })
  },
}



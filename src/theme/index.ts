import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

// Configuração do tema usando a API v3 do Chakra (styled-system)
const custom = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Paleta baseada no azul da marca (logo)
        brand: {
          50:  { value: '#eef4ff' },
          100: { value: '#d9e2ff' },
          200: { value: '#b3c4ff' },
          300: { value: '#8ca6ff' },
          400: { value: '#5f84ff' },
          500: { value: '#2f5cff' },
          600: { value: '#2347d9' },
          700: { value: '#1c38b0' },
          800: { value: '#152a86' },
          900: { value: '#101f66' },
        },
        // Tons de superfície neutros claros
        surface: {
          50:  { value: '#f9fafb' },
          100: { value: '#f4f6f8' },
          200: { value: '#eef1f4' },
        },
      },
      fonts: {
        heading: {
          value:
            "Inter, -apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        },
        body: {
          value:
            "Inter, -apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        },
      },
    },
    // Removido recipes para evitar erros de tipagem; usamos componente wrapper
  },
})

const system = createSystem(defaultConfig, custom)

export default system



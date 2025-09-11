import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

// Configuração do tema usando a API v3 do Chakra (styled-system)
const custom = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: '#0066ff' },
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
  },
})

const system = createSystem(defaultConfig, custom)

export default system



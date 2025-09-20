import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  preflight: true,
  theme: {
    tokens: {
      shadows: {
        ui: { value: '0 4px 16px rgba(0,0,0,0.05)' },
        uiHover: { value: '0 4px 20px rgba(0,0,0,0.1)' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

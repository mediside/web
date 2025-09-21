import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  preflight: true,
  theme: {
    tokens: {
      shadows: {
        ui: { value: '0 4px 16px rgba(0,0,0,0.08)' },
        uiHover: { value: '0 4px 22px rgba(0,0,0,0.14)' },
        uiInset: { value: 'inset 0 0 20px rgba(0,0,0,0.14)' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

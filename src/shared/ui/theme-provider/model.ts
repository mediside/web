import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  preflight: true,
  theme: {},
})

export const system = createSystem(defaultConfig, config)

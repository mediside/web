import { useTheme } from 'next-themes'

export const useColorMode = () => {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  return {
    colorMode: forcedTheme || resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
  }
}

import { ThemeProvider, ThemeProviderProps } from 'next-themes'

export const ColorModeProvider: FC<ThemeProviderProps> = (props) => (
  <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
)

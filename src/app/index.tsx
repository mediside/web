import './index.css'
import { StrictMode } from 'react'
import { App } from './App'
import { createRoot } from 'react-dom/client'
import { setupI18Next, ThemeProvider } from '@shared'

setupI18Next()

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

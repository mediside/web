import './index.css'
import { StrictMode } from 'react'
import { App } from './App'
import { createRoot } from 'react-dom/client'
import { setupI18Next } from '@shared'

setupI18Next()

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>
)

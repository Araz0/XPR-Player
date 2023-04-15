import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from 'constants/styles'
import ReactDOM from 'react-dom/client'

import App from 'App'

import 'style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
)

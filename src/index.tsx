import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from 'constants/styles'

import App from 'App'

import 'style.css'

render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

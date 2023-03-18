import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

import App from 'App'
import 'style.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { createTheme } from '@mui/material'

import App from './App'
import './style.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#fff' },
  },
})

render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

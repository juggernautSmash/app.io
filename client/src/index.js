import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import { MuiThemeProvider } from '@material-ui/core'
import Theme from './styles/Theme'

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>, 
  document.getElementById('root')
)

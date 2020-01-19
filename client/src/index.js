import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiThemeProvider } from '@material-ui/core'
import Theme from './styles/Theme'

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('root')
)

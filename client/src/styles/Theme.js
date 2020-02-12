import { createMuiTheme } from '@material-ui/core'
import { indigo, yellow } from '@material-ui/core/colors'

const Theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: yellow,
    type: 'dark',
  },
  Modal: {
    outline: 'none',
  },
  typography: {
    subtitle1: {
      fontSize: 10,
    },
    body1: {
      fontSize: 15,
      fontWeight: 500,
    }
  },
})

export default Theme
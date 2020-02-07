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
  }
})

export default Theme
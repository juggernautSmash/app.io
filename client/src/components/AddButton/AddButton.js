import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import AddIcon from '@material-ui/icons/Add'
import ListItem from '@material-ui/core/ListItem'

import ButtonContext from '../../utils/ButtonContext'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

export default function AddButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)


  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  console.log('page is ', props.location)

  return (
    <div>
      <AddIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </AddIcon>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          {/* <ListItem>
            
          </ListItem> */}
          <ListItemText primary='add something' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'

import AddBoardModal from '../../Modals/AddBoard'

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
      backgroundColor: theme.palette.info.dark,
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

  return (
    <div>
      <AddIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <AddBoardModal />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Add Table" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}
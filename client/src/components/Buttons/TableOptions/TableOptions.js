import React from 'react'

// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

// Material-UI Icons
import MoreVertIcon from '@material-ui/icons/MoreVert'

// local components
import AddTableModal from '../../Modals/AddTable'
import EditTableModal from '../../Modals/EditTable'
import DeleteTableModal from '../../Modals/DeleteTable'

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

export default function TableOptions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <MoreVertIcon
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
          <EditTableModal tableId={props.tableId}/>
        </StyledMenuItem>
        <StyledMenuItem>
          <AddTableModal />
        </StyledMenuItem>
        <StyledMenuItem>
          <DeleteTableModal tableName={props.title} tableId={props.tableId}/>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}
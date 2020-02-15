import React from 'react'

// Material-UI Components
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Context from '../../utils/Context'

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

export default function HamMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const { logout } = React.useContext(Context)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <MenuIcon
                fontSize="large"
                aria-controls="customized-menu"
                aria-haspopup="true"
                // variant="contained"
                // color="primary"
                onClick={handleClick}
            >
                Open Menu
      </MenuIcon>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/user'}>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </StyledMenuItem>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/team'}>
                    <StyledMenuItem onClick={handleClose}> 
                        <ListItemIcon>
                            <GroupIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary="Team" />
                    </StyledMenuItem>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/boards'}>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary="Boards" />
                    </StyledMenuItem>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ExitToAppIcon onClick = {logout} fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </div>
    )
}
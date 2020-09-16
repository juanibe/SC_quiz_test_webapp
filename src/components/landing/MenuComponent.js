import React from 'react';
import {
    withRouter,
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { getJwt, getUserJwt } from '../../helpers'




const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
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
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function CustomizedMenus({ history }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = React.useState(null);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdminClick = () => {
        history.push('/admin')
    }

    const handleLogOut = () => {
        console.log("enters")
        localStorage.removeItem('jwt-token');
        history.push('/login')
    }

    const handleLogIn = () => {
        history.push('/login')
    }

    const handleRegister = () => {
        history.push('/register')
    }

    React.useEffect(() => {
        const token = getJwt()
        if (token) {
            const loggedInUser = getUserJwt(token);
            setUser(loggedInUser)
        }
    }, [])
    console.log("user", user)
    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Open Menu
      </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {user && user.role === 1 && (
                    <StyledMenuItem>
                        <ListItemIcon>
                            <SendIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={handleAdminClick} primary="Admin" />
                    </StyledMenuItem>
                )}
                {!user && (
                    <StyledMenuItem>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={handleRegister} primary="Register" />
                    </StyledMenuItem>
                )}

                {user && user.id ? (
                    <StyledMenuItem>
                        <ListItemIcon>
                            <InboxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={handleLogOut} primary="Logout" />
                    </StyledMenuItem>
                ) :
                    <StyledMenuItem>
                        <ListItemIcon>
                            <InboxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={handleLogIn} primary="Login" />
                    </StyledMenuItem>
                }

            </StyledMenu>
        </div>
    );
}

export default withRouter(CustomizedMenus);
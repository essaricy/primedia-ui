import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Publish } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

import { Link } from "react-router-dom";

import history from '../../app/config/history';
import * as MediaUtil from '../../app/util/MediaUtil';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sideMenuList: {
    width: 250,
  },
  sideMenuFullList: {
    width: 'auto',
  },
}));

export default function Header() {
  const classes = useStyles();

  const [ showSideMenu, setShowSideMenu ] = React.useState(false);
  const [ profileMenuAnchor, setProfileMenuAnchor ] = React.useState(null);
  const [ searchTypeAnchor, setSearchTypeAnchor ] = React.useState(null);
  const [ searchType, setSearchType ] = React.useState(MediaUtil.IMAGE);

  const showProfileMenu = Boolean(profileMenuAnchor);
  const showSearchTypeDropDown = Boolean(searchTypeAnchor);

  const toggleDrawer = (show) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowSideMenu(show);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={profileMenuAnchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={showProfileMenu}
      onClose={() => setProfileMenuAnchor(null)}
    >
      <MenuItem onClick={() => setProfileMenuAnchor(null)}>Profile</MenuItem>
      <MenuItem onClick={() => setProfileMenuAnchor(null)}>My account</MenuItem>
    </Menu>
  );

  const listSideMenu = () => (
    <div role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const getSearchTypeMenu= () => {
    return <Menu id="search-type-menu" keepMounted
      open={showSearchTypeDropDown}
      anchorEl={searchTypeAnchor}
      PaperProps={{ style: { marginTop: 40, marginLeft: 10 } }}
      onClose={() => setSearchTypeAnchor(null)}>
      {
        [MediaUtil.IMAGE, MediaUtil.VIDEO].map((option) => (
          <MenuItem key={option} selected={option === searchType}
            onClick={() => {
              setSearchType(option);
              setSearchTypeAnchor(null);
            }}>
            {option === MediaUtil.IMAGE ? 'Images' : 'Videos' }
          </MenuItem>
      ))}
    </Menu>;
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <MenuItem component={Link} to={'/'}>
            <Typography className={classes.title} variant="h6" noWrap>MyVid</Typography>
          </MenuItem>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const searchValue = e.target.value;
                  if (searchValue.length >= 3) {
                    history.push({
                      pathname: '/search',
                      state: { type: searchType, text: searchValue }
                    });
                  }
                }
              }}
            />
            <IconButton aria-label="more" aria-controls="search-type-menu" aria-haspopup="true"
              onClick={(e) => setSearchTypeAnchor(e.currentTarget)}>
              {MediaUtil.getMediaIcon(searchType)}
            </IconButton>
            {getSearchTypeMenu()}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to="/upload">
              <Publish />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}

      <Drawer anchor="left" open={showSideMenu} onClose={toggleDrawer(false)}>
        {listSideMenu()}
      </Drawer>
    </div>
  );
}

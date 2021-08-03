import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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
import { Publish } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { headerStyles } from './HeaderStyles';
import * as MenuConstants from './MenuConstants';
import * as MediaUtil from '../../app/util/MediaUtil';
import * as SearchActions from '../../search/actions/SearchActions';
import * as SearchSelectors from '../../search/selectors/SearchSelectors';

const useStyles = makeStyles((theme) => headerStyles(theme));

function Header(props) {
  const classes = useStyles();
  const history = useHistory();

  const [ showSideMenu, setShowSideMenu ] = React.useState(false);
  const [ searchTypeAnchor, setSearchTypeAnchor ] = React.useState(null);
  const showSearchTypeDropDown = Boolean(searchTypeAnchor);

  const { searchMode, searchingText } = props.search;
  const { onSearchModeChange, onSearchValueChange, onSearch } = props;

  const toggleDrawer = (show) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowSideMenu(show);
  };

  const setSearchMode = (mode) => {
    if (searchMode !== mode) {
      setSearchTypeAnchor(null);
      onSearchModeChange(mode);
      onSearch(mode, searchingText, history);
    }
  }

  const listSideMenu = () => {
    const menuItems = [];
    MenuConstants.MENU_ITEMS.forEach((item) => {
      if (item.text === "-") {
        menuItems.push(<Divider key={item.id}/>);
      } else {
        menuItems.push(
          <ListItem button key={item.id}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        );
       }
      }
    )
    return <div role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    ><List>{menuItems}</List></div>
  }

  const getSearchModes= () => {
    return <Menu id="search-type-menu" keepMounted
      open={showSearchTypeDropDown}
      anchorEl={searchTypeAnchor}
      PaperProps={{ style: { marginTop: 40, marginLeft: 10 } }}
      onClose={() => setSearchTypeAnchor(null)}>
      {
        MediaUtil.getMediaTypes().map((option) => (
          <MenuItem key={option} selected={option.code === searchMode}
            onClick={() => {
              setSearchMode(option.code);
            }}>
            {MediaUtil.getMediaIcon(option.code)}
            {option.name}
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
            <Typography className={classes.title} variant="h6" noWrap>Primedia</Typography>
          </MenuItem>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchingText}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSearchValueChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(searchMode, searchingText, history)}
            />
            <IconButton aria-label="more" aria-controls="search-type-menu" aria-haspopup="true"
              onClick={(e) => setSearchTypeAnchor(e.currentTarget)}>
              {MediaUtil.getMediaIcon(searchMode)}
            </IconButton>
            {getSearchModes()}
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
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={showSideMenu} onClose={toggleDrawer(false)}>
        {listSideMenu()}
      </Drawer>
    </div>
  );
}

const mapState = state => {
  return {
    search: {
      searchMode: SearchSelectors.getSearchMode(state),
      searchingText: SearchSelectors.getSearchingText(state),
      searchedText: SearchSelectors.getSearchedText(state),
    }    
  };
};

const mapActions = {
  onSearchModeChange: SearchActions.onSearchMode,
  onSearchValueChange: SearchActions.onSearchValueChange,
  onSearch: SearchActions.onSearch
};

const HeaderContainer = connect(mapState, mapActions)(Header);
export default HeaderContainer;
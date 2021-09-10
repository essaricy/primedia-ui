import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NotificationsIcon from '@material-ui/icons/Notifications';
import Publish from '@material-ui/icons/Publish';

import { styles } from './HeaderStyles';
import Menu from './Menu';
import Mode from './Mode';
import SearchContainer from '../../search/components/Search';

import * as HeaderActions from '../actions/HeaderActions';
import * as HeaderSelectors from '../selectors/HeaderSelectors';

import * as MediaUtil from '../../app/util/MediaUtil';

const useStyles = makeStyles((theme) => styles(theme));

function Header(props) {
  const classes = useStyles();

  const [ showSideMenu, setShowSideMenu ] = React.useState(false);
  const { mode, onModeChange } = props;

  const toggleDrawer = (show) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowSideMenu(show);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static"
        className={ mode === MediaUtil.VIDEO ? classes.appBarVideo : classes.appBarImage }>
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

          <Mode mode={mode} onModeChange={onModeChange} />
          <MenuItem component={Link} to={'/'}>
            <Typography className={classes.title} variant="h6" noWrap>Primedia</Typography>
          </MenuItem>
          <SearchContainer mode={mode} />

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

      <Menu show={showSideMenu} toggleDrawer={toggleDrawer} />
    </div>
  );
}

const mapState = state => {
  return {
    mode: HeaderSelectors.getMode(state)
  };
};
const mapActions = {
  onModeChange: HeaderActions.onModeChange
};

const HeaderContainer = connect(mapState, mapActions)(Header);
export default HeaderContainer;

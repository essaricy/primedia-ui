import React from 'react';
import { useHistory } from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import * as MenuConstants from './MenuConstants';

function Menu(props) {
  const history = useHistory();
  const { show, toggleDrawer } = props;

  const navigate = (nav) => {
    history.push(nav);
  }

  const listSideMenu = () => {
    const menuItems = [];
    MenuConstants.MENU_ITEMS.forEach((item) => {
      if (item.text === "-") {
        menuItems.push(<Divider key={item.id}/>);
      } else {
        menuItems.push(
          <ListItem button key={item.id} onClick={() => navigate(item.nav)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        );
       }
      }
    )
    return (
      <div role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
        <List>{menuItems}</List>
      </div>
    );
  }

  return (
    <Drawer anchor="left" open={show} onClose={toggleDrawer(false)}>
      {listSideMenu()}
    </Drawer>
  );
}

export default Menu;

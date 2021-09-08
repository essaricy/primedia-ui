import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Grid from '@material-ui/core/Grid';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { styles } from './WatchStyles';

const useStyles = makeStyles((theme) => styles(theme));

function FullScreenImage(props) {
  const classes = useStyles();
  //const handle = useFullScreenHandle();

  const { media, handle, fullscreen, onExit } = props;
  const { id, type } = media;

  return (
    <FullScreen handle={handle}>
      <Grid container align="center" style={{ display: fullscreen? "inline": "none" }}>
        <Grid item align="center">
          <img src={getContentUrl(type, id)} style={{ maxHeight: '100vh', maxWidth: '100vw' }}/>
          <FullscreenExitIcon className={classes.fullScreenIcon}
            onClick={onExit} />
        </Grid>
      </Grid>
    </FullScreen>
  );
}

export default FullScreenImage;
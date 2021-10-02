import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

import * as MediaUtil from '../../app/util/MediaUtil';

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: "white",
  },
  imageIcon: {
    fontSize: 20,
    color: "#1976d2"
  },
  videoIcon: {
    fontSize: 20,
    color: "#e53935"
  },
}));

function ModeToggle(props) {
  const classes = useStyles();
  const { mode, onModeChange } = props;

  const toggleMode = (mode) => onModeChange(mode === MediaUtil.IMAGE ? MediaUtil.VIDEO : MediaUtil.IMAGE);

  return (
    <Fab size="small" className={classes.fab} onClick={() => toggleMode(mode)}>
      {mode === MediaUtil.IMAGE && <PhotoCamera className={classes.imageIcon} />}
      {mode === MediaUtil.VIDEO && <Videocam className={classes.videoIcon} />}
    </Fab>
  );
}
export default ModeToggle;

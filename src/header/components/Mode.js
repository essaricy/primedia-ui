import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

import * as MediaUtil from '../../app/util/MediaUtil';

const styles = (theme) => ({
  active: {
    color: "#EEE",
    //fontSize: 24,
    cursor: "pointer"
  },
  inactive: {
    //fontSize: 20,
    cursor: "pointer",
  }
});
const useStyles = makeStyles((theme) => styles(theme));

function Mode(props) {
  const classes = useStyles();
  const { mode, onModeChange } = props;

  return (
    <React.Fragment>
      <PhotoCamera color="action"
        className={mode === MediaUtil.IMAGE ? classes.active : classes.inactive}
        onClick={() => onModeChange(MediaUtil.IMAGE)} /> 
      <Videocam color="action"
        className={mode === MediaUtil.VIDEO ? classes.active : classes.inactive}
        onClick={() => onModeChange(MediaUtil.VIDEO)} />
    </React.Fragment>
  );
}
export default Mode;

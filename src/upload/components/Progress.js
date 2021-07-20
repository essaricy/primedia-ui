import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';

import * as UploadActions from '../actions/UploadActions';
import * as UploadSelectors from '../selectors/UploadSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';

const STATUS_VALUES = {
  "REQUESTED": { value: 20, color: "primary" },
  "PROC_START": { value: 40, color: "primary" },
  "THUMB_FAIL": { value: 50, color: "secondary" },
  "THUMB_DONE": { value: 66, color: "primary" },
  "SAVE_FAIL": { value: 85, color: "secondary" },
  "SAVE_DONE": { value: 100, color: "primary" },
}
function Progress(props) {
  //const useStyles = makeStyles((theme) => uploadStyles(theme));
  //const classes = useStyles();
  const { id, mediaId, status, startTime, endTime, onPollProgress } = props;
  const statusVal = STATUS_VALUES[status.code];

  useEffect(() => {
    //document.title = `You clicked ${count} times`;
    const interval = setInterval(() => onPollProgress(id), 2000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <LinearProgress variant="determinate" value={statusVal.value} color={statusVal.color} />
  );
}
const mapState = state => {
  return {
    ...UploadSelectors.getProgress(state)
  }
};
const mapActions = {
  onPollProgress: UploadActions.onPollProgress
}

const ProgressContainer = connect(mapState, mapActions)(Progress);
export default ProgressContainer;
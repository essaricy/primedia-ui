import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { progressStyles } from './ProgressStyles';
import * as UploadActions from '../actions/UploadActions';
import * as UploadSelectors from '../selectors/UploadSelectors';
import * as UploadConstants from '../constants/UploadConstants';

function LinearProgressWithLabel(props) {
  const useStyles = makeStyles((theme) => progressStyles(theme));
  const classes = useStyles();

  const { status, startTime, endTime } = props;
  const attr = UploadConstants.STATUS_ATTIBUTES[ status.code ];
  //const attr = UploadConstants.STATUS_ATTIBUTES[ "THUMB_FAIL" ];

  return (
    <LinearProgress variant="buffer" value={attr.value} valueBuffer={attr.value+1}
          classes={
            attr.color === "green"
            ? { colorPrimary: classes.color1, barColorPrimary: classes.barColor1, dashedColorPrimary: classes.dashedColor1 }
            : { colorPrimary: classes.color2, barColorPrimary: classes.barColor2, dashedColorPrimary: classes.dashedColor2 }
          }
    >
    </LinearProgress>
  );
}

function Progress(props) {
  const { id, status, startTime, endTime, onPollProgress } = props;

  // useEffect(() => {
  //   const interval = setInterval(() => onPollProgress(id, status.code), 2000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });
  return (
    <LinearProgressWithLabel status={status} startTime={startTime} endTime={endTime} />
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
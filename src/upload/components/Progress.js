import { React, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { progressStyles } from './ProgressStyles';
import * as UploadConstants from '../constants/UploadConstants';

function LinearProgressWithLabel(props) {
  const useStyles = makeStyles((theme) => progressStyles(theme));
  const classes = useStyles();

  const { status } = props;
  const attr = UploadConstants.STATUS_ATTIBUTES[ status.code ];

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
  useEffect(() => {
    if (UploadConstants.isInProgress(status.code)) {
      const interval = setInterval(() => onPollProgress(id), 2000);
      return () => {
        clearInterval(interval);
      };  
    }
  });
  return (
    <LinearProgressWithLabel status={status} startTime={startTime} endTime={endTime} />
  );
}
export default Progress;
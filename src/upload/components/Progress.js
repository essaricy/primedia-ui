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
  return (
    <Grid container className={classes.root}>
      { startTime && 
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">Started At: { new Date(startTime).toLocaleString() }</Typography>
      </Grid>
      }
      <Grid item xs={12}>
        <LinearProgress variant="determinate" value={attr.value} 
          classes={
            attr.color === "green"
            ? { colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }
            : { colorPrimary: classes.colorSecondary, barColorPrimary: classes.barColorSecondary }
          } />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">{attr.label}</Typography>
        {endTime && <Typography variant="body2" color="textSecondary">Ended At: { new Date(endTime).toLocaleString() }</Typography>}
      </Grid>
    </Grid>
  );
}

function Progress(props) {
  const { id, status, startTime, endTime, onPollProgress } = props;

  useEffect(() => {
    const interval = setInterval(() => onPollProgress(id, status.code), 2000);
    return () => {
      clearInterval(interval);
    };
  });
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
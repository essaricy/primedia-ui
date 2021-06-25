import React from 'react';
import moment from "moment";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Paper, Typography } from '@material-ui/core';

function LinearProgressWithLabel(props) {
  const { progress } = props;
  const { id, status, startTime, endTime } = progress;
  const { value, style } = progressValues[status.code];

  return (
    <Box alignItems="center" style={{ margin: 20 }}>
      <Box key={`${progress.id}_id`}>
        <Typography variant="body2" color="textSecondary">ID: {id}</Typography>
      </Box>
      <Box key={`${progress.id}_start`}>
        <Typography variant="body2" color="textSecondary">Start Time: {moment(startTime).fromNow()}</Typography>
      </Box>
      { endTime && 
      <Box key={`${progress.id}_end`}>
        <Typography variant="body2" color="textSecondary">End Time: {moment(endTime).fromNow()}</Typography>
      </Box>
      }
      <Box key={`${progress.id}_label`}>
        <Typography variant="body2" color="textSecondary">Status: {status.description}</Typography>
      </Box>
      <Box key={`${progress.id}_progressbar`}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
    </Box>
  );
}

const progressValues = {
  "REQUESTED": { value: 25, style: { background: 'green' } },
  "PROCESS_STARTED": { value: 50, style: { background: 'green' } },
  "THUMBNAIL_GENERATED": { value: 75, style: { background: 'green' } },
  "THUMBNAIL_FAILED": { value: 75, style: { background: 'red' } },
  "SAVE_DONE": { value: 100, style: { background: 'green' } },
  "SAVE_FAIL": { value: 100, style: { background: 'red' } }
};

export default function ThickProgressBar(props) {
  const { progress } = props;

  return (
    <Paper variant="outlined" style={{ marginTop: 20 }}>
      <LinearProgressWithLabel progress={progress} />
    </Paper>
  );
}
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export function getMediumSkeleton(number) {
  return (
    <Grid container spacing={2} style={{flexGrow: 1, marginTop: 20, marginLeft: 30 }}>
      {[...Array(number)].map((index) => (
        <Box key={index} width={250} height={140} marginRight={3} marginBottom={8}>
          <Skeleton variant="rect" width={250} height={140} />
          <Skeleton variant="text" width={250} />
          <Skeleton variant="text" width={250} />
        </Box>))
      }
    </Grid>
  );
}

export function getSmallSkeleton(number) {
  return (
    <React.Fragment>
      {[...Array(number)].map((index) => (
        <Grid key={'SearchGrid_Thumb_' + index} container spacing={2} style={{flexGrow: 1 }}>
        <Grid item xs={5}>
          <Skeleton variant="rect" height={80} />
        </Grid>
        <Grid item xs={7}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        </Grid>
        )
        )}
    </React.Fragment>
  );
}

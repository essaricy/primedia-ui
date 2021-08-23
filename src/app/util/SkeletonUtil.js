import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export function getMediumSkeleton(number) {
  return (
    <Grid container spacing={2} style={{flexGrow: 1, marginTop: 10, marginLeft: 10 }}>
      {[...Array(number)].map((val, index) => (
        <Box key={"SkeletonBox" + index} width={238} height={140} style={{ marginRight: 15 }} marginBottom={8}>
          <Skeleton key="Skeleton_Image" variant="rect" width={238} height={140} />
          <Skeleton key="Skeleton_Text1" variant="text" width={238} />
          <Skeleton key="Skeleton_Text2" variant="text" width={238} />
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

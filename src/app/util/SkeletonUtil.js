import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export function getBoxes(number) {
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
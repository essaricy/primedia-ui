import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';

import { uploadStyles } from './UploadStyles';



import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import UploadCard from './UploadCard';
import * as UploadService from '../service/UploadService';
import * as ProgressService from '../../progress/service/ProgressService';

import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import Tags from '../../app/components/Tags';

import * as UploadActions from '../actions/UploadActions';
import * as UploadSelectors from '../selectors/UploadSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';

import ThickProgressBar from '../../app/components/ThickProgressBar';

function Upload(props) {
  const [ file, setFile ] = React.useState();
  const useStyles = makeStyles((theme) => uploadStyles(theme));
  const classes = useStyles();

  const { name, type, size, rating, quality, tags, isUploading, error } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" component="label">
              Choose File
              <input type="file" hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                  file && props.onSelectFile(file);
                }} />
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.uploadBtnGrid}>
            <Button variant="contained" disabled={true}
              onClick={(e) => alert()}>
              Upload
            </Button>
          </Grid>
          { file &&
            <Grid item>
              { type === 'V'
                ? <video className={classes.image} src={URL.createObjectURL(file)} />
                : <img className={classes.image} src={URL.createObjectURL(file)} />
              }
            </Grid>
          }
          { file &&
          <Grid item xs={12} sm container direction="row">
            <Grid item xs={12}>
              <TextField label="Name" value={name} style={{ width: '100%'}}
                //onChange={(e) => {setMediaName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} className={classes.infoGridItem}>
              <Typography variant="body2" color="textSecondary">Rating: </Typography>
              <Rate value={rating} />
            </Grid>
            <Grid item xs={12} className={classes.infoGridItem}>
              <Typography variant="body2" color="textSecondary">Quality: </Typography>
              <Quality value={quality} />
            </Grid>
            <Grid item xs={12} className={classes.infoGridItem}>
              <Typography variant="body2" color="textSecondary">Tags: </Typography>
              <Tags value={tags} />
            </Grid>
            <Grid item xs={12} className={classes.infoGridItem}>
              <Typography variant="body2" color="textSecondary">Size: </Typography>
              {MediaUtil.prettifyFileSize(size)}
            </Grid>
          </Grid>
          }
        </Grid>
      </Paper>
      { error &&
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={true}
          //onClose={this.closeAlert}
          message={error}
        />
      }
    </div>
  );
}
const mapState = state => {
  return {
    ...UploadSelectors.getUpload(state)
  }
};
const mapActions = {
  onSelectFile: UploadActions.onFileSelect,

  // onEditName: WatchActions.updateName,
  // onEditNameEnd: WatchActions.updateNameEnd,
  // onRatingChange: WatchActions.updateRating,
  // onQualityChange: WatchActions.updateQuality,
  // onTagsChange: WatchActions.updateTags,
  // onLike: WatchActions.updateLike,
  // onSearchItemClick: WatchActions.onWatchMedia
}

const UploadContainer = connect(mapState, mapActions)(Upload);
export default UploadContainer;
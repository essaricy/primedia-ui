import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { uploadStyles } from './UploadStyles';

import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import Tags from '../../app/components/Tags';
import ProgressContainer from './Progress';

import * as UploadActions from '../actions/UploadActions';
import * as UploadSelectors from '../selectors/UploadSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';

function Upload(props) {
  const [ file, setFile ] = React.useState();
  const useStyles = makeStyles((theme) => uploadStyles(theme));
  const classes = useStyles();

  const { fileUrl, name, type, size, rating, quality, tags, retainName } = props;
  const { isUploading, uploadMessage, progress } = props;
  const { onFileSelect, onNameChange, onRatingChange, onQualityChange } = props;
  const { onTagAdd, onTagDelete, onUpload, onRetainName } = props;

  return (
    <div className={classes.root}>
      { progress && progress.status && <ProgressContainer />}
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained"
              disabled={isUploading}
              component="label"
            >
              Choose File
              <input type="file" hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                  file && onFileSelect(file);
                }} />
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.uploadBtnGrid}>
            <Button color="primary" variant="contained"
              disabled={isUploading}
              startIcon={<CloudUploadIcon />}
              onClick={() => onUpload({ file, name, type, size, rating, quality, tags })}>
              { isUploading && <LinearProgress color="primary" className={classes.linearProgress} /> }
              Upload
            </Button>
          </Grid>
          { fileUrl &&
          <React.Fragment>
            <Grid item>{ MediaUtil.getLocalPlayer(type, fileUrl, classes.image) }</Grid>
            <Grid item xs={12} sm container direction="row">
              <Grid item xs={12}>
                <TextField label="Name" value={name} style={{ width: '100%'}}
                  onChange={(e) => {onNameChange(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} className={classes.infoGridItem}>
                <Typography variant="body2" color="textSecondary">Rating: </Typography>
                <Rate value={rating} onChange={onRatingChange} />
              </Grid>
              <Grid item xs={12} className={classes.infoGridItem}>
                <Typography variant="body2" color="textSecondary">Quality: </Typography>
                <Quality value={quality} onChange={onQualityChange} />
              </Grid>
              <Grid item xs={12} className={classes.infoGridItem}>
                <Typography variant="body2" color="textSecondary">Tags: </Typography>
                <Tags value={tags} onAdd={onTagAdd} onDelete={onTagDelete} />
              </Grid>
              <Grid item xs={12} className={classes.infoGridItem}>
                <Typography variant="body2" color="textSecondary">Size: </Typography>
                {MediaUtil.prettifyFileSize(size)}
              </Grid>
              <FormControlLabel
                control={<Checkbox checked={retainName}
                onChange={(e) => onRetainName(e.target.checked)} />}
                label="Retain Name" />
            </Grid>
          </React.Fragment>
          }
        </Grid>
      </Paper>
      { <Snackbar open={uploadMessage} message={uploadMessage}
        ContentProps={{className: classes.snackbarStyleViaContentProps}} /> }
    </div>
  );
}
const mapState = state => {
  return {
    ...UploadSelectors.getUpload(state)
  }
};
const mapActions = {
  onFileSelect: UploadActions.onFileSelect,
  onNameChange: UploadActions.onNameChange,
  onRatingChange: UploadActions.onRatingChange,
  onQualityChange: UploadActions.onQualityChange,
  onTagAdd: UploadActions.onTagAdd,
  onTagDelete: UploadActions.onTagDelete,
  onUpload: UploadActions.onUpload,
  onRetainName: UploadActions.onRetainName
}

const UploadContainer = connect(mapState, mapActions)(Upload);
export default UploadContainer;
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
import SockJsClient from 'react-stomp';


function Upload(props) {
  let clientRef = null;
  const useStyles = makeStyles((theme) => uploadStyles(theme));
  const classes = useStyles();

  const sendMessage1 = () => {
    clientRef.sendMessage('/app/hello1', new Date());
  }

  const sendMessage2 = () => {
    clientRef.sendMessage('/app/hello2', new Date());
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" component="label" onClick={sendMessage1}>Hello World 1</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label" onClick={sendMessage2}>Hello World 2</Button>
          </Grid>
        </Grid>
        <SockJsClient url = 'http://localhost:9211/notifications/'
          topics={['topic/greetings']} 
          onConnect={console.log("SockJsClient ##################### Connection established!")} 
          onDisconnect={console.log("SockJsClient ##################### Disconnected!")}
          onMessage={(m) => alert('####### SockJsClient recieved message')}
          ref={ (client) => { clientRef = client }}
          debug= {true}
        />
      </Paper>
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

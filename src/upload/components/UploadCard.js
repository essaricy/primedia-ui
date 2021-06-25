import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ChipInput from "material-ui-chip-input";

import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import * as MediaUtil from '../../app/util/MediaUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  image: {
    width: 256,
    height: 256,
    margin: 'auto',
    display: 'block'
  },
  formControl: {
    marginBottom: 10
  }
}));

export default function UploadCard(props) {
  const classes = useStyles();
  const { src, type, size } = props;
  const { name, onNameChange } = props;
  const { rating, onRatingChange } = props;
  const { quality, onQualityChange } = props;
  const { tags, onTagAdd, onTagDelete } = props;

  console.log('UploadCard file name', name);
  const [mediaName, setMediaName] = React.useState(name);

  const getContent = (type, src) => {
    return type === MediaUtil.VIDEO
        ? <video className={classes.image} src={src} />
        : <img className={classes.image} src={src} />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>{getContent(type, src)}</Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField label="Name" defaultValue={name} value={mediaName}
                    onChange={(e) => {setMediaName(e.target.value)}}
                    onBlur={onNameChange} />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  Rating: <Rate value={rating} onRatingChange={onRatingChange} />
                </FormControl>
                <Typography variant="body2" color="textSecondary" className={classes.formControl}>
                  Quality: <Quality value={quality} onQualityChange={onQualityChange} />
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.formControl}>
                  Tags: <ChipInput value={tags} onAdd={onTagAdd} onDelete={onTagDelete} />
                </Typography>
                <FormControl fullWidth>
                  <Typography variant="body2" color="textSecondary" className={classes.formControl}>
                  Size: {MediaUtil.prettifyFileSize(size)}
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {MediaUtil.getMediaIcon(type)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
  
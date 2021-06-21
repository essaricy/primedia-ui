import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import ViewsIcon from '@material-ui/icons/Visibility';
import LikesIcon from '@material-ui/icons/ThumbUp';

import { amber } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import ChipInput from "material-ui-chip-input";


import * as AxiosUtil from '../util/AxiosUtil';
import * as MediaUtil from '../util/MediaUtil';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MediaPlayer(props) {
  const classes = useStyles();
  const { open } = props;
  const { onMediaPlayerClose, onMediaUpdate } = props;

  const [ media, setMedia ] = React.useState(props.media);
  React.useEffect(() => { setMedia(props.media) }, [props.media]);

  const setMediaState = (field, value) => {
    if (field === 'likes') {
      setMedia({...media, 'likes': media.likes+1});
    } else {
      setMedia({...media, [field]: value});
    }
    
  }

  const handleMediaUpdate = (field, val) => {
    setMediaState(field, val);
    onMediaUpdate(media.type, media.id, field, val);
  }

  const handleTagAdd = (tag) => {
    const tags = media.tags;
    tags.push(tag);
    setMediaState('tags', tags);
  }

  const handleTagDelete = (tag) => {
    const tags = media.tags.filter(e => e !== tag);
    setMediaState('tags', tags);
  }

  const leftFieldStyles = { position: "absolute", top: 70, left: 10, zIndex: 5555 };
  const rightFieldStyles = { position: "absolute", top: 70, right: 20, maxWidth: 100, zIndex: 5555 };
  const color = amber[600];
  return (
    <Dialog fullScreen open={open} onClose={onMediaPlayerClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onMediaPlayerClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <TextField fullWidth value={media.name}
            onChange={(e) => setMediaState('name', e.target.value)}
            onBlur={(e) => onMediaUpdate(media.type, media.id, 'name', e.target.value)} />
        </Toolbar>
      </AppBar>
      {
        media && media.id &&
        <React.Fragment>
          { media.type === MediaUtil.VIDEO
            ? <video controls autoPlay
                src={AxiosUtil.getContent(media.type, media.id)}
                width="100%" height={520} />
            : <img src={AxiosUtil.getContent(media.type, media.id)}
                width="100%" />
          }
          <Rate value={media.rating} style={{ ...leftFieldStyles, top: 70 }}
            onRatingChange={(val) => handleMediaUpdate('rating', val)} />
          <Quality value={MediaUtil.getQualityCode(media.quality)} style={{ ...leftFieldStyles, top: 100 }}
            onQualityChange={(val) => handleMediaUpdate('quality', MediaUtil.getQuality(val))} />
          <ChipInput value={media.tags} style={{ ...leftFieldStyles, top: 130 }}
            onAdd={handleTagAdd}
            onDelete={handleTagDelete}
            onBlur={() => handleMediaUpdate('tags', media.tags)} />

          <div style={rightFieldStyles}>
            <Grid container spacing={0}>
              <Grid item xs>
                <IconButton><ViewsIcon style={{ fontSize: 20, color: color }} /></IconButton>
              </Grid>
              <Grid item xs>
                <Typography style={{ color: color, marginTop: 10 }}>{media.views}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs>
                <IconButton onClick={() => handleMediaUpdate('likes', true)}>
                  <LikesIcon style={{ fontSize: 20, color: color }} />
                </IconButton>
              </Grid>
              <Grid item xs>
                <Typography style={{ color: color, marginTop: 10 }}>{media.likes}</Typography>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      }
    </Dialog>
  );
}

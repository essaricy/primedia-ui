import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import moment from "moment";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LikesIcon from '@material-ui/icons/ThumbUp';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import Tags from '../../app/components/Tags';
import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import * as WatchActions from '../actions/WatchActions';
import * as WatchSelectors from '../selectors/WatchSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';
import { styles } from './WatchStyles';

const useStyles = makeStyles((theme) => styles(theme));

function Watch(props) {
  const [ fullscreen, setFullscreen ] = React.useState(false);
  const classes = useStyles();
  const handle = useFullScreenHandle();

  const { watch } = props;
  const { media, collection } = watch;
  const { id, type, name, views, rating, quality, size, likes, tags } = media;
  const { uploadDate, lastSeen, isEditingName } = media;

  const handleTagAdd = (tag) => {
    tags.push(tag);
    props.onTagsChange(id, tags);
  }
  const handleTagDelete = (tag) => {
    props.onTagsChange(id, tags.filter(e => e !== tag));
  }
  const handleNavigation = (index) => props.onWatchMedia(collection[index]);

  const toggleFullScreen = (enter) => {
    setFullscreen(enter);
    enter ? handle.enter() : handle.exit();
  }
  return (
    <React.Fragment>
      {/* Full screen images */}
      { type === "I" &&
        <FullScreen handle={handle}>
          <Grid container align="center" style={{ display: fullscreen? "inline": "none" }}>
            <Grid item align="center">
              <img src={MediaUtil.getContentUrl(type, id)}
                style={{ maxHeight: '100vh', maxWidth: '100vw' }}/>
              <FullscreenExitIcon className={classes.fullScreenIcon}
                onClick={() => toggleFullScreen(false)} />
            </Grid>
          </Grid>
        </FullScreen>
      }
      
      <div className={classes.root}>
        <Grid container spacing={1}>
          {/* Media Player and below content */}
          <Grid item md={8}>
            <Grid item className={classes.galleryGrid}>
              {MediaUtil.getInlinePlayer(type, id, classes.player)}
              { type === "I" && <FullscreenIcon className={classes.fullScreenIcon}
                onClick={() => toggleFullScreen(true)} />
              }
            </Grid>
            <Grid item xs={12}>
              { isEditingName
                ? <TextField fullWidth value={name}
                    onChange={(e) => props.onEditName(e.target.value) }
                    onBlur={(e) => props.onEditNameEnd(id, e.target.value)} />
                : <Typography className={classes.title} onClick={props.onEditNameStart}>
                    {name}
                  </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <Grid container xs={12}>
                <Grid item xs={9}>
                  <Typography className={classes.subText}>
                    {views} views, last seen { moment(lastSeen).fromNow() }
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <LikesIcon className={classes.icon} onClick={() => props.onLike(id, true)} />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.iconLabel}>{likes}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.subText}>
                    Uploaded on { moment(uploadDate).format("MMM DD, YYYY") }
                    &#8226; { MediaUtil.prettifyFileSize(size) } 
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography className={classes.subText}>Rating</Typography>
                  <Rate value={rating} onChange={(val) => props.onRatingChange(id, val)} />
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.subText}>Quality</Typography>
                  <Quality value={quality} onChange={(val) => props.onQualityChange(id, val)} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Tags value={tags} onAdd={handleTagAdd} onDelete={handleTagDelete} />
            </Grid>
          </Grid>
          {/* Playlist grid */}
          <Grid item md={4}>
            { collection && collection.map((item, index) => 
              <Card className={classes.playlistRoot}>
                <CardMedia
                  className={classes.playlistCover}
                  image={MediaUtil.getThumbnailUrl(item.type, item.id)}
                  title={item.name}
                />
                <div className={classes.playlistDetails}>
                  <CardContent className={classes.playlistContent}>
                    <Link href="#" onClick={() => handleNavigation(index)} variant="inherit">{item.name}</Link>
                  </CardContent>
                </div>
              </Card>
            )}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

const mapState = state => {
  return {
    watch: WatchSelectors.getWatch(state)
  }
};
const mapActions = {
  onEditNameStart: WatchActions.updateNameStart,
  onEditName: WatchActions.updateName,
  onEditNameEnd: WatchActions.updateNameEnd,
  onRatingChange: WatchActions.updateRating,
  onQualityChange: WatchActions.updateQuality,
  onTagsChange: WatchActions.updateTags,
  onLike: WatchActions.updateLike,
  onWatchMedia: WatchActions.onWatchMedia
}

const WatchContainer = connect(mapState, mapActions)(Watch);
export default WatchContainer;
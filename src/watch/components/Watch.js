import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ViewsIcon from '@material-ui/icons/Visibility';
import LikesIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { amber, grey } from '@material-ui/core/colors';

import moment from "moment";

import Tags from '../../app/components/Tags';
import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import * as WatchActions from '../actions/WatchActions';
import * as WatchSelectors from '../selectors/WatchSelectors';
import * as SearchSelectors from '../../search/selectors/SearchSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 20,
    marginTop: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginBottom: 10,
    color: theme.palette.text.secondary,
  },
  mediaGrid: {
    marginTop: 10,
    height: 400,
    backgroundColor: "#000",
    textAlign: 'center'
  }
}));

function Watch(props) {
  const history = useHistory();

  const greyText = grey[500];
  const yellow = amber[500];
  const { media, searchResults } = props;
  const { id, name, type } = media;
  const { views, rating, quality, size, likes, tags } = media;
  const { uploadDate, lastSeen } = media;
  const { isEditingName } = media;

  const classes = useStyles();

  const getTypography = (label, value, color) => {
    return (
      <Grid item xs={12}>
        <Typography variant="caption" display="block" gutterBottom style={{ color: color}}>
          {label ? label + ': ' : ''} {value}
        </Typography>
      </Grid>
    );
  }

  const handleTagAdd = (tag) => {
    tags.push(tag);
    props.onTagsChange(id, tags);
  }
  const handleTagDelete = (tag) => {
    props.onTagsChange(id, tags.filter(e => e !== tag));
  }
  const handleSearchItemClick = (media) => {
    props.onSearchItemClick(media);
    history.push('/watch');
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.mediaGrid}>
              {MediaUtil.getPlayer(type, id)}
            </Grid>
            <Grid item xs={12}>
              { isEditingName
                ? <TextField fullWidth value={name}
                    onChange={(e) => props.onEditName(e.target.value)}
                    onBlur={(e) => props.onEditNameEnd(id, e.target.value)} />
                : <React.Fragment>
                    <Typography variant="h6" display="inline">{name} </Typography>
                    <EditIcon style={{ fontSize: 20, color: greyText, cursor: "hand" }}
                      onClick={props.onEditNameStart} />
                  </React.Fragment>
              }
            </Grid>
            <Grid item xs={12}>
              <Tags value={tags} onAdd={handleTagAdd} onDelete={handleTagDelete} />
            </Grid>
            <Grid item xs={3}>
              <Grid container alignItems="center">
                <Rate value={rating} onChange={(val) => props.onRatingChange(id, val)} />
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container alignItems="center">
                <Quality value={quality} onChange={(val) => props.onQualityChange(id, val)} />
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="right">
                <ViewsIcon style={{ fontSize: 20, color: greyText }}/>
                <Typography style={{ color: greyText, marginLeft: 6 }} >{views}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="right">
                <LikesIcon style={{ fontSize: 20, color: yellow, cursor: "hand"}}
                  onClick={() => props.onLike(id, true)} />
                <Typography style={{ color: greyText, marginLeft: 6 }} >{likes}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="right">
                { getTypography('Upload', moment(uploadDate).fromNow(), greyText) }
                { lastSeen && getTypography('Last seen', moment(lastSeen).fromNow(), greyText) }
                { getTypography(null, MediaUtil.prettifyFileSize(size), greyText) }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ margin: 10, padding: 10, maxHeight: 466, overflow: 'auto' }}>
            {searchResults && searchResults.map((item, index) => (
              <Grid key={'SearchGrid_Thumb_' + index} container
                spacing={0} style={{flexGrow: 1, marginBottom: 6, cursor: "pointer" }}
                onClick={() => handleSearchItemClick(item)}>
                <Grid item xs={5} style={{ textAlign: 'center', backgroundColor: "#000", maxHeight: 80 }}>
                  <img src={MediaUtil.getThumbnailUrl(item.type, item.id)}
                    height={80} style={{ maxWidth: 140 }} />
                </Grid>
                <Grid item xs={7} style={{ paddingLeft: 5 }}>
                  <Typography variant="caption" display="block" gutterBottom
                    style={{ color: greyText }} >
                    {item.name}
                  </Typography>
                  <Grid container alignItems="right">
                    <ViewsIcon style={{ fontSize: 12, color: greyText }}/>
                    <Typography style={{ fontSize: 10, color: greyText, marginLeft: 4 }}>{item.views}</Typography>
                    <LikesIcon style={{ fontSize: 12, color: yellow, marginLeft: 14 }} />
                    <Typography style={{ fontSize: 10, color: greyText, marginLeft: 4 }}>{item.likes}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const mapState = state => {
  return {
    searchResults: SearchSelectors.getSearchResults(state),
    media: WatchSelectors.getWatch(state)
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
  onSearchItemClick: WatchActions.onWatchMedia
}

const WatchContainer = connect(mapState, mapActions)(Watch);
export default WatchContainer;
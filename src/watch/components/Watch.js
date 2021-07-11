import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ViewsIcon from '@material-ui/icons/Visibility';
import LikesIcon from '@material-ui/icons/ThumbUp';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { amber, grey } from '@material-ui/core/colors';
import ChipInput from "material-ui-chip-input";

import moment from "moment";

import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';

import * as WatchSelectors from '../selectors/WatchSelectors';
import * as SearchSelectors from '../../search/selectors/SearchSelectors';

import * as WatchActions from '../actions/WatchActions';

import * as MediaUtil from '../../app/util/MediaUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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

  const greyText = grey[500];
  const yellow = amber[500];
  const { media, searchResults } = props;
  const { id, name, type, views, rating, quality, size, likes, tags, uploadDate, lastSeen } = media;

  const classes = useStyles();

  const getTypography = (label, value, color) => {
    return (
      <Grid item xs={12}>
        <Typography variant="caption" display="block" gutterBottom style={{ color: color}}>
          {label}: {value}
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.mediaGrid}>
              {MediaUtil.getPlayer(type, id)}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{name}</Typography>
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
                {getTypography('Upload', moment(uploadDate).fromNow(), greyText)}
                { lastSeen && getTypography('Last seen', moment(lastSeen).fromNow(), greyText)}
                {getTypography('Size', MediaUtil.prettifyFileSize(size), greyText)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <ChipInput value={tags} disableUnderline
              onAdd={handleTagAdd}
              onDelete={handleTagDelete} />
          </Paper>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapState = state => {
  return {
    searchResults: SearchSelectors.getSearch(state),
    media: WatchSelectors.getWatch(state)
  }
};
const mapActions = {
  onRatingChange: WatchActions.updateRating,
  onQualityChange: WatchActions.updateQuality,
  onTagsChange: WatchActions.updateTags,
  onLike: WatchActions.updateLike,
}

const WatchContainer = connect(mapState, mapActions)(Watch);
export default WatchContainer;
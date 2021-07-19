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
import moment from "moment";

import Tags from '../../app/components/Tags';
import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import * as WatchActions from '../actions/WatchActions';
import * as WatchSelectors from '../selectors/WatchSelectors';
import * as SearchSelectors from '../../search/selectors/SearchSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';
import { greyText, watchStyles } from './WatchStyles';

const useStyles = makeStyles((theme) => watchStyles(theme));

function Watch(props) {
  const history = useHistory();
  const classes = useStyles();

  const { media, searchResults } = props;
  const { id, name, type } = media;
  const { views, rating, quality, size, likes, tags } = media;
  const { uploadDate, lastSeen } = media;
  const { isEditingName } = media;

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
  const handleSearchItemClick = (newMedia) => {
    if (newMedia.id != media.id) {
      props.onSearchItemClick(newMedia);
      history.push('/watch');
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.mediaPlayer}>
              {MediaUtil.getPlayer(type, id)}
            </Grid>
            <Grid item xs={12}>
              { isEditingName
                ? <TextField fullWidth value={name}
                    onChange={(e) => props.onEditName(e.target.value)}
                    onBlur={(e) => props.onEditNameEnd(id, e.target.value)} />
                : <React.Fragment>
                    <Typography variant="h6" display="inline">{name} </Typography>
                    <EditIcon className={classes.mediumIconActive} onClick={props.onEditNameStart} />
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
                <ViewsIcon className={classes.mediumIconInactive}/>
                <Typography className={classes.mediumIconLabel} >{views}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container alignItems="right">
                <LikesIcon className={classes.mediumIconActive} onClick={() => props.onLike(id, true)} />
                <Typography className={classes.mediumIconLabel}>{likes}</Typography>
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
          <Card className={classes.searchCard}>
            {searchResults && searchResults.map((item, index) => (
              <Grid key={'SearchGrid_Thumb_' + index} container
                spacing={0} className={classes.searchThumbGrid}>
                <Grid item xs={5} className={classes.searchMediaGrid}
                    onClick={() => handleSearchItemClick(item)}>
                  <img src={MediaUtil.getThumbnailUrl(item.type, item.id)}
                    height={80}
                    className={classes.searchMediaImage} />
                </Grid>
                <Grid item xs={7} className={classes.searchMediaContent}>
                  <Typography variant="caption" display="block" gutterBottom
                    onClick={() => handleSearchItemClick(item)}>
                    {item.name}
                  </Typography>
                  <Rate value={item.rating} readOnly size="xs" />
                  <Grid container alignItems="right" className={classes.iconsContainer}>
                    <ViewsIcon className={classes.smallIconInactive} />
                    <Typography className={classes.smallIconLabel}>{item.views}</Typography>
                    <LikesIcon className={classes.smallIconInactive} />
                    <Typography className={classes.smallIconLabel}>{item.likes}</Typography>
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
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ViewsIcon from '@material-ui/icons/Visibility';
import LikesIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import moment from "moment";

import Gallery from './Gallery';
import Tags from '../../app/components/Tags';
import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import * as WatchActions from '../actions/WatchActions';
import * as WatchSelectors from '../selectors/WatchSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';
import { styles } from './WatchStyles';

const useStyles = makeStyles((theme) => styles(theme));

function Watch(props) {
  const history = useHistory();
  const classes = useStyles();

  const { watch } = props;
  const { media, collection } = watch;
  const { id, name, type } = media;
  const { views, rating, quality, size, likes, tags } = media;
  const { uploadDate, lastSeen } = media;
  const { isEditingName } = media;

  const getTypography = (label, value) => {
    return (
      <Grid item xs={12}>
        <Typography variant="caption" display="block" gutterBottom className={classes.label}>
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
  const handleNavigation = (e, index, onClick) => {
    props.onWatchMedia(collection[index]);
    onClick && onClick(e);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.galleryGrid}>
          <Gallery items={collection} media={media} handleNavigation={handleNavigation} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} className={ classes.attributeGrid}>
              { isEditingName
                ? <TextField fullWidth value={name}
                    onChange={(e) => props.onEditName(e.target.value) }
                    onBlur={(e) => props.onEditNameEnd(id, e.target.value)} />
                : <React.Fragment>
                    <Typography variant="h6" display="inline">{name} </Typography>
                    <EditIcon className={classes.iconActive} onClick={props.onEditNameStart} />
                  </React.Fragment>
              }
            </Grid>
            <Grid item xs={12} className={classes.attributeGrid}>
              <Grid container alignItems="center">
                <Rate value={rating} onChange={(val) => props.onRatingChange(id, val)} />
                <Quality value={quality} onChange={(val) => props.onQualityChange(id, val)} />
                <Tags value={tags} onAdd={handleTagAdd} onDelete={handleTagDelete} />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.attributeGrid}>
            </Grid>
            <Grid item xs={2} className={ classes.attributeGrid}>
              <Grid container alignItems="right">
                <ViewsIcon className={classes.iconInactive}/>
                <Typography className={classes.iconLabel} >{views}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container alignItems="right">
                <LikesIcon className={classes.iconActive} onClick={() => props.onLike(id, true)} />
                <Typography className={classes.iconLabel}>{likes}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={ classes.attributeGrid}>
              { getTypography('Uploaded', moment(uploadDate).fromNow()) }
              { lastSeen && getTypography('Last seen', moment(lastSeen).fromNow()) }
              { getTypography('Size', MediaUtil.prettifyFileSize(size)) }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
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
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ViewsIcon from '@material-ui/icons/Visibility';
import LikesIcon from '@material-ui/icons/ThumbUp';

import moment from "moment";

import * as MediaUtil from '../../app/util/MediaUtil';
import { searchCardStyles } from './SearchResultCardStyles';

const useStyles = makeStyles((theme) => searchCardStyles(theme));
export default function SearchResultCard(props) {
  const classes = useStyles();
  const { media, onMediaClick } = props;
  const { id, name, type, views, likes, uploadDate, lastSeen } = media;

  return (
    <Card className={classes.searchCard}>
      <CardActionArea>
        <CardMedia style={{height: 140}}
          src={MediaUtil.getThumbnailUrl(type, id)}
          title={name}
          component="img"
          onClick={onMediaClick}/>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subText}>Uploaded: {moment(uploadDate).fromNow()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subText}>
                Last seen: { lastSeen ? moment(lastSeen).fromNow() : 'Never' }</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container>
          <ViewsIcon className={classes.icon} />
          <Typography className={classes.iconLabel}>{views}</Typography>
          <LikesIcon className={classes.icon} />
          <Typography className={classes.iconLabel}>{likes}</Typography>
        </Grid>
      </CardActions>
    </Card>
  );
}

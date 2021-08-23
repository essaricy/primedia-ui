import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import UploadIcon from '@material-ui/icons/CloudUpload';
import ViewsIcon from '@material-ui/icons/Visibility';
import LastSeenIcon from '@material-ui/icons/VisibilityOff';
import LikesIcon from '@material-ui/icons/ThumbUp';

import * as MediaUtil from '../../app/util/MediaUtil';
import { styles } from './SearchResultCardStyles';

const useStyles = makeStyles((theme) => styles(theme));

export default function SearchResultCard(props) {
  const classes = useStyles();
  const { media, onMediaClick } = props;
  const { id, name, type, views, likes, duration, uploadDate, lastSeen } = media;

  return (
    <Card className={classes.searchCard}>
      <CardActionArea>
        <CardMedia style={{height: 140}}>
          <LazyLoadImage height={140} width="100%"
            src={MediaUtil.getThumbnailUrl(type, id)}
            className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img"
            effect="blur"
            onClick={onMediaClick} />
          <Typography
            variant="button" display="block" gutterBottom
            className={classes.cardMediaLabel}>
            {duration}
          </Typography>
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Link href="#" onClick={onMediaClick} variant="inherit">{name}</Link>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container>
          <Grid item xs={12} key="SerachResult_Row1">
            <Typography className={classes.subText}>
              <Grid container>
                <Grid item key="UploadIconGrid" style={{marginRight: 4}}>
                  <UploadIcon className={classes.icon} />
                </Grid>
                <Grid item key="UploadDateGrid" style={{marginRight: 4}}>
                  {moment(uploadDate).fromNow()}
                </Grid>
                <Grid item key="LastSeenIconGrid" style={{marginRight: 4}}>
                  <LastSeenIcon className={classes.icon} />
                </Grid>
                <Grid item key="LastSeenDateGrid">
                  { lastSeen ? moment(lastSeen).fromNow() : 'Never' }
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs={12} key="SerachResult_Row2">
            <Grid container>
              <Grid item key="ViewsIconGrid"><ViewsIcon className={classes.icon} /></Grid>
              <Grid item key="ViewsGrid"><Typography className={classes.iconLabel}>{views}</Typography></Grid>
              <Grid item key="LikesIconGrid"><LikesIcon className={classes.icon} /></Grid>
              <Grid item key="LikesGrid"><Typography className={classes.iconLabel}>{likes}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

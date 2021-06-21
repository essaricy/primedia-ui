import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ViewsIcon from '@material-ui/icons/Visibility';
import LikesIcon from '@material-ui/icons/ThumbUp';

import moment from "moment";

import * as AxiosUtil from '../../app/util/AxiosUtil';
import * as MediaUtil from '../../app/util/MediaUtil';

export default function SearchResultCard(props) {
  const { media, onMediaClick } = props;
  const { id, name, type, views, likes, uploadDate, lastSeen } = media;
  const src = AxiosUtil.getThumbnail(type, id);

  return (
    <Card style={{maxWidth: 250}}>
      <CardActionArea>
        <CardMedia style={{height: 140}}
          src={src} title={name}
          component="img"
          onClick={onMediaClick}/>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{name}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Uploaded: {moment(uploadDate).fromNow()}
          </Typography>
          {lastSeen && 
          <Typography variant="caption" display="block" gutterBottom>
            Last Seen: {moment(lastSeen).fromNow()}
          </Typography>
          }
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ViewsIcon color="primary" style={{ fontSize: 14, marginTop: -5 }} />
        <Typography variant="button" display="block" gutterBottom>
          {views}
        </Typography>
        <LikesIcon color="primary" style={{ fontSize: 14, marginTop: -5 }} />
        <Typography variant="button" display="block" gutterBottom>
          {likes}
        </Typography>
      </CardActions>
    </Card>
  );
}

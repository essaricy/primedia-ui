import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from "moment";

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import * as UploadActions from '../actions/UploadActions';
import * as UploadConstants from '../constants/UploadConstants';
import * as UploadSelectors from '../selectors/UploadSelectors';
import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';

function UploadHistory(props) {
  const { mode, history, onLoad } = props;
  useEffect(() => onLoad(mode), [mode]);

  return (
    <List>
      { history.map(item => {
        const { media } = item;
        const attr = UploadConstants.STATUS_ATTIBUTES[ item.status.code ];

        return media ?
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar src={MediaUtil.getThumbnailUrl(mode, media.id)} />
          </ListItemAvatar>
          <ListItemText primary={media.name}
            secondary={<React.Fragment>
              <Typography variant="body2" color="textSecondary">{attr.label}</Typography>
              {moment(media.uploadDate).fromNow()}
              </React.Fragment>
                }
            />
        </ListItem>
        : "";
      })}
    </List>
  );
}
const mapState = state => {
  return {
    mode: HeaderSelectors.getMode(state),
    history: UploadSelectors.getHistory(state)
  }
};
const mapActions = {
  onLoad: UploadActions.onLoadUploadHistory
}

const UploadHistoryContainer = connect(mapState, mapActions)(UploadHistory);
export default UploadHistoryContainer;

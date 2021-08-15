import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from "moment";

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/HighlightOff';

import * as UploadActions from '../actions/UploadActions';
import * as UploadConstants from '../constants/UploadConstants';
import * as UploadSelectors from '../selectors/UploadSelectors';
import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as MediaUtil from '../../app/util/MediaUtil';

export const getStatusInfo = (status) => {
  if (status == null) {
    return null;
  }
  let steps = UploadConstants.UPLOAD_STEPS;
  let index = steps.findIndex(el => status === el.sCode);
  if (index == -1) {
    index = steps.findIndex(el => status === el.fCode);
    return index == -1 ? null : { label: steps[index].fLabel };
  } else {
    return { isSuccess: true, label: steps[index].sLabel };
  }
}

function UploadHistory(props) {
  const { mode, history, onLoad } = props;
  useEffect(() => onLoad(mode), [mode]);

  return (
    <List>
      { history.map(item => {
        const { media } = item;
        const statusInfo = getStatusInfo(item.status);

        return media ?
        <ListItem key={item.id}>
          <ListItemAvatar>
            <Avatar src={MediaUtil.getThumbnailUrl(mode, media.id)} />
          </ListItemAvatar>
          <ListItemText primary={media.name}
            secondary={
              <Typography variant="body2" color="textSecondary">
                { moment(media.uploadDate).fromNow() }
                { statusInfo && statusInfo.isSuccess
                    ? <SuccessIcon style={{color: 'green'}}>{statusInfo.label}</SuccessIcon>
                    : <FailIcon style={{color: 'red'}}>{statusInfo.label}</FailIcon>
                }
              </Typography>
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

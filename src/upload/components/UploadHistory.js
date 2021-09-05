import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from "moment";

import Avatar from '@material-ui/core/Avatar';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import FailIcon from '@material-ui/icons/HighlightOff';

import { DataGrid } from '@material-ui/data-grid';

import Rate from '../../app/components/Rate';
import Quality from '../../app/components/Quality';
import Tags from '../../app/components/Tags';

import * as UploadConstants from '../constants/UploadConstants';
import * as UploadHistoryActions from '../actions/UploadHistoryActions';
import * as UploadHistorySelectors from '../selectors/UploadHistorySelectors';
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

  const handleTagAdd = (id, tags, tag) => {
    tags.push(tag);
    props.onTagsChange(id, tags);
  }
  const handleTagDelete = (id, tags, tag) => {
    props.onTagsChange(id, tags.filter(e => e !== tag));
  }

  const columns = [
    {
      field: 'id',
      width: 40,
      renderCell: (params) => params.row.id
    },
    {
      field: 'Thumb',
      width: 130,
      renderCell: (params) => <Avatar src={MediaUtil.getThumbnailUrl(mode, params.row.id)} />
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 260,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      renderCell: (params) => <Rate noLabel
          id={params.row.id}
          value={params.row.rating}
          onChange={(val) => props.onRatingChange(params.row.id, val)}
          />
    },
    {
      field: 'quality',
      headerName: 'Quality',
      width: 130,
      renderCell: (params) => <Quality noLabel
        value={params.row.quality}
        onChange={(val) => props.onQualityChange(params.row.id, val)}
      />
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 340,
      renderCell: (params) => <Tags value={params.row.tags}
        onAdd={(tag) => handleTagAdd(params.row.id, params.row.tags, tag)}
        onDelete={(tag) => handleTagDelete(params.row.id, params.row.tags, tag)} />
    },
    {
      field: 'uploadDate',
      headerName: 'Date',
      width: 120,
      renderCell: (params) => moment(params.row.uploadDate).fromNow()
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 120,
    //   renderCell: (params) => { 
    //     const statusInfo = getStatusInfo(params.row.status);
    //     return statusInfo && statusInfo.isSuccess
    //     ? <SuccessIcon style={{color: 'green'}}>{statusInfo.label}</SuccessIcon>
    //     : <FailIcon style={{color: 'red'}}>{statusInfo.label}</FailIcon>
    //   }
    // },
  ];

  const rows = [];
  history.forEach(item => rows.push({
      id: item.id,
      name: item.name,
      quality: item.quality,
      rating: item.rating,
      tags: item.tags,
      size: item.size,
      uploadDate: item.uploadDate,
      //status: item.status
    })
  );

  return (
    <div style={{ height: "90vh", width: '98vw' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
      />
    </div>
  );
}
const mapState = state => {
  return {
    mode: HeaderSelectors.getMode(state),
    history: UploadHistorySelectors.getHistory(state)
  }
};
const mapActions = {
  onLoad: UploadHistoryActions.onLoadUploadHistory,
  onRatingChange: UploadHistoryActions.updateRating,
  onQualityChange: UploadHistoryActions.updateQuality,
  onTagsChange: UploadHistoryActions.updateTags,
}

const UploadHistoryContainer = connect(mapState, mapActions)(UploadHistory);
export default UploadHistoryContainer;

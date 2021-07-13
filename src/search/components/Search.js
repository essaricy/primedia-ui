import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchResultCard from './SearchResultCard';
import * as MediaUtil from '../../app/util/MediaUtil';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';

import * as SearchSelectors from '../selectors/SearchSelectors';
import * as SearchActions from '../actions/SearchActions';
import * as WatchActions from '../../watch/actions/WatchActions';

function Search(props) {
  const history = useHistory();

  const handleMediaClick = (media) => {
    props.onMediaClick(media);
    history.push('/watch');
  }

  const getSearchResultText = () => {
    const { mode, text, results, inProgress, error } = props;
    let message = '';
    if (inProgress == true) {
      message = `Searching for ${text}`;
    } else if (error) {
      message = error;
    } else if (results.length === 0) {
      message = `No ${MediaUtil.getMediaName(mode)} found for ${text}`;
    } else {
      message = `${results.length} ${MediaUtil.getMediaName(mode)} found for ${text}`;
    }
    return <Typography variant="subtitle1" display="inline" style={{marginLeft: 20, marginTop: 10 }}>
      {message}
    </Typography>;
  }

  const { inProgress, results } = props;
  return (
  <React.Fragment>
    {getSearchResultText()}
    { inProgress && SkeletonUtil.getMediumSkeleton(10) }
    <Grid container style={{flexGrow: 1, marginTop: 0, marginLeft: 10, marginRight: 10 }}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {results.map((media) => (
            <Grid key={media.id} item>
              <SearchResultCard media={media}
                onMediaClick={() => handleMediaClick(media)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>);
}

const mapState = state => {
  return SearchSelectors.getSearch(state);
};

const mapActions = {
  onLoad: SearchActions.onSearchText,
  onMediaClick: WatchActions.onWatchMedia
}

const SearchContainer = connect(mapState, mapActions)(Search);
export default SearchContainer;
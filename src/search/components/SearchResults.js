import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchResultCard from './SearchResultCard';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';

import * as SearchSelectors from '../selectors/SearchSelectors';
import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as SearchActions from '../actions/SearchActions';
import * as WatchActions from '../../watch/actions/WatchActions';

function SearchResults(props) {
  const history = useHistory();

  const { mode, search, onSearch } = props;
  const { message, searchedText, results, inProgress } = search;
  const [ currentMode, setCurrentMode ] = useState(mode);

  useEffect(() => {
    if (mode !== currentMode) {
      setCurrentMode(mode);
      onSearch(mode, searchedText, history);
    }
  }, [mode]);

  const handleMediaClick = (media) => {
    props.onMediaClick(media);
    history.push('/watch');
  }

  return (
  <React.Fragment>
    <Typography variant="subtitle1" display="inline" style={{marginLeft: 20, marginTop: 10 }}>
      {message}
    </Typography>

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
  return {
    mode: HeaderSelectors.getMode(state),
    search: SearchSelectors.getSearch(state)
  }
};

const mapActions = {
  onSearch: SearchActions.onSearch,
  onMediaClick: WatchActions.onWatchMedia
}

const SearchResultsContainer = connect(mapState, mapActions)(SearchResults);
export default SearchResultsContainer;
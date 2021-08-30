import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchResultCard from './SearchResultCard';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';

import * as SearchSelectors from '../selectors/SearchSelectors';
import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as SearchActions from '../actions/SearchActions';
import * as WatchActions from '../../watch/actions/WatchActions';

import { styles } from './SearchResultsStyles';

const useStyles = makeStyles((theme) => styles(theme));

function StyledTypo(props) {
  return (
    <Typography component={props.div ? "div" : ""}
      variant="overline"
      className={props.className}>
      {props.value}
    </Typography>
  );
}

function SearchResults(props) {
  const history = useHistory();
  const classes = useStyles();

  const { mode, search, onSearch } = props;
  const { searchedText, results, inProgress, error } = search;
  const [ currentMode, setCurrentMode ] = useState(mode);

  useEffect(() => {
    if (mode !== currentMode) {
      setCurrentMode(mode);
      onSearch(mode, searchedText, history);
    }
  }, [mode]);

  const getErrorContent = () => {
    return (
      <Grid align="center">
        <StyledTypo div className={classes.errorTitle1} value="Something went wrong!" />
        <StyledTypo div className={classes.errorTitle2} value={error} />
      </Grid>
    );
  }

  const getNoResultsContent = () => {
    return (
      <Grid align="center">
        <StyledTypo div className={classes.errorTitle1} value="There is nothing to show for" />
        <StyledTypo div className={classes.errorTitle2} value={searchedText} />
      </Grid>
    );
  }

  const getResultsContent = () => {
    return (
      <Grid>
        <StyledTypo className={classes.resultsTitle1} value="Here are " />
        <StyledTypo className={classes.resultsTitle2} value={results.length} />
        <StyledTypo className={classes.resultsTitle1} value=" results found for " />
        <StyledTypo className={classes.resultsTitle2} value={searchedText} />
      </Grid>
    );
  }

  const handleMediaClick = (media) => {
    props.onWatchCollection(results);
    props.onWatchMedia(media);
    history.push('/watch');
  }

  return (
    error
      ? getErrorContent()
      : inProgress
        ? SkeletonUtil.getMediumSkeleton(10)
        : results.length == 0
          ? getNoResultsContent()
          : (
            <Grid container className={classes.resultsGrid}>
              {getResultsContent()}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {results.map((media) => (
                    <Grid key={media.id} item>
                      <SearchResultCard media={media} onMediaClick={() => handleMediaClick(media)} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )
  );
}

const mapState = state => {
  return {
    mode: HeaderSelectors.getMode(state),
    search: SearchSelectors.getSearch(state)
  }
};

const mapActions = {
  onSearch: SearchActions.onSearch,
  onWatchCollection: WatchActions.onWatchCollection,
  onWatchMedia: WatchActions.onWatchMedia
}

const SearchResultsContainer = connect(mapState, mapActions)(SearchResults);
export default SearchResultsContainer;
import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchResultCard from './SearchResultCard';
import MediaPlayer from '../../app/components/MediaPlayer';
import * as MediaService from '../../media/service/MediaService';
import * as MediaUtil from '../../app/util/MediaUtil';

import * as SearchSelectors from '../selectors/SearchSelectors';
import * as SearchActions from '../actions/SearchActions';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPlayer: false,
      selectedMedia: {},
      serviceMessage: null,
    }
    this.handleMediaPlayerOpen = this.handleMediaPlayerOpen.bind(this);
    this.handleMediaPlayerClose = this.handleMediaPlayerClose.bind(this);
    this.handleMediaUpdate = this.handleMediaUpdate.bind(this);
    this.getSearchResultText = this.getSearchResultText.bind(this);
  }

  handleMediaPlayerOpen = (media) => {
    media.views=media.views+1;
    this.setState({ openPlayer: true, selectedMedia: media });
    this.handleMediaUpdate(media.type, media.id, 'views', true);
  }

  handleMediaPlayerClose = () => {
    this.setState({ openPlayer: false, selectedMedia: {} });
  }

  handleMediaUpdate = (type, id, field, val) => {
    MediaService.update(type, id, field, val)
    .then(response => {
      this.setState({ serviceMessage: `${field} updated successfully!` });
      // Update the search result
      var foundIndex = this.state.results.findIndex(x => x.id == response.id);
      this.state.results[foundIndex] = response;
    })
    .catch(e => { this.setState({ serviceMessage: e.message }); });
  }

  getSearchResultText() {
    const { mode, text, results, inProgress, error } = this.props;
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
    return <Typography variant="subtitle1" display="inline" style={{marginLeft: 20 }}>
      {message}
    </Typography>;
  }

  render() {
    const { openPlayer, selectedMedia } = this.state;
    const { inProgress, results } = this.props;

    return (
    <React.Fragment>
      {this.getSearchResultText()}

      { inProgress && 
      <Grid container spacing={2} style={{flexGrow: 1, marginTop: 0, marginLeft: 20 }}>
        {[...Array(10)].map((index) => (
        <Box key={index} width={250} height={140} my={4}>
          <Skeleton variant="rect" width={210} height={118} />
          <Skeleton variant="text" width={210} />
          <Skeleton variant="text" width={210} />
        </Box>))
        }
      </Grid>
      }

      <Grid container spacing={2} style={{flexGrow: 1, marginTop: 20, marginLeft: 20 }}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {results.map((media) => (
              <Grid key={media.id} item>
                <SearchResultCard media={media}
                  onMediaClick={() => this.handleMediaPlayerOpen(media)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <MediaPlayer open={openPlayer} media={selectedMedia}
        onMediaPlayerClose={this.handleMediaPlayerClose}
        onMediaUpdate={this.handleMediaUpdate}
       />
    </React.Fragment>);
  }
}
const mapState = state => {
  return SearchSelectors.getSearch(state);
};
const mapActions = {
  onLoad: SearchActions.onSearchText
}
const SearchContainer = connect(mapState, mapActions)(Search);
export default SearchContainer;
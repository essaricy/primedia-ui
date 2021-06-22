import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchResultCard from './SearchResultCard';
import MediaPlayer from '../../app/components/MediaPlayer';
import * as SearchService from '../service/SearchService';
import * as MediaService from '../../media/service/MediaService';
import * as MediaUtil from '../../app/util/MediaUtil';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.location.state.type,
      text: props.location.state.text,
      results: [],
      openPlayer: false,
      selectedMedia: {},
      serviceMessage: null,
    }
    this.handleMediaPlayerOpen = this.handleMediaPlayerOpen.bind(this);
    this.handleMediaPlayerClose = this.handleMediaPlayerClose.bind(this);
    this.handleMediaUpdate = this.handleMediaUpdate.bind(this);
  }

  componentDidMount() {
    const { type, text } = this.state;
    SearchService.search(type, text)
    .then((response) => {
      this.setState({ results: response });
    });
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

  render() {
    const { type, text, results, openPlayer, selectedMedia } = this.state;

    return (
    <React.Fragment>
      <Typography variant="subtitle1" display="inline" style={{marginLeft: 20 }}>
        { `${results.length === 0 ? 'No' : results.length} ${MediaUtil.getMediaTypeLabel(type)} found for ` }
        <Typography variant="button" display="inline" gutterBottom>{text}</Typography>
      </Typography>

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
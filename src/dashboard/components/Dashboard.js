import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { dashboardStyles } from './DashboardStyles';
import SearchResultCard from '../../search/components/SearchResultCard';
import * as WatchActions from '../../watch/actions/WatchActions';
import * as DashboardActions from '../actions/DashboardActions';
import * as DashboardSelectors from '../selectors/DashboardSelectors';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';

class Dashboard extends React.Component {

  handleMediaClick = (media) => {
    this.props.onMediaClick(media);
    this.props.history.push('/watch');
  }

  getStrip = (title, inProgress, results) => {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container className={classes.headerGrid}>
          <Grid item xs={3}>
            <Typography variant="h6" gutterBottom component="div">{title}</Typography>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={4} className={classes.buttonGrid}>
            <Button color="secondary">More</Button>
          </Grid>
        </Grid>
        { inProgress && SkeletonUtil.getMediumSkeleton(5) }
        <Grid container className={classes.stripGrid}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {results.map((media) => (
                <Grid key={media.id} item>
                  <SearchResultCard media={media}
                    onMediaClick={() => this.handleMediaClick(media)}
                    />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { mostRecentInProgress, mostViewedInProgress, mostLikedInProgress, mostRatedInProgress } = this.props;
    const { mostRecent, mostViewed, mostLiked, mostRated } = this.props;

    return (
      <Grid container spacing={3}>
        { this.getStrip('Most Recent', mostRecentInProgress, mostRecent) }
        { this.getStrip('Most Viewed', mostViewedInProgress, mostViewed) }
        { this.getStrip('Most Liked', mostLikedInProgress, mostLiked) }
        { this.getStrip('Most Rated', mostRatedInProgress, mostRated) }
      </Grid>
    );  
  }
}

const mapState = state => {
  return {
    ...DashboardSelectors.getDashboard(state)
  }
};
const mapActions = {
  onLoad: DashboardActions.onLoad,
  onMediaClick: WatchActions.onWatchMedia
}

const DashboardContainer = connect(mapState, mapActions)(withStyles(dashboardStyles) (Dashboard));
export default DashboardContainer;
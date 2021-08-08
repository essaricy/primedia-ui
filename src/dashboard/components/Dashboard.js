import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { styles } from './DashboardStyles';
import SearchResultCard from '../../search/components/SearchResultCard';
import * as DashboardConstants from '../constants/DashboardConstants';
import * as DashboardActions from '../actions/DashboardActions';
import * as DashboardSelectors from '../selectors/DashboardSelectors';

import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as SearchSelectors from '../../search/selectors/SearchSelectors';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.onLoad && this.props.onLoad(this.props.mode);
  }
  handleMediaClick = (media, results) => {
    this.props.onMediaClick(media, results);
    this.props.history.push('/watch');
  }

  getStrip = (type) => {
    const { classes, dashboard } = this.props;
    const { title } = DashboardConstants.SECTIONS[type];
    let results = null;
    let inProgress = false;
    if (type === DashboardConstants.MOST_RECENT) {
      inProgress = dashboard.mostRecentInProgress;
      results = dashboard.mostRecent;
    } else if (type === DashboardConstants.MOST_VIEWED) {
      inProgress = dashboard.mostViewedInProgress;
      results = dashboard.mostViewed;
    } else if (type === DashboardConstants.MOST_LIKED) {
      inProgress = dashboard.mostLikedInProgress;
      results = dashboard.mostLiked;
    } else if (type === DashboardConstants.MOST_RATED) {
      inProgress = dashboard.mostRatedInProgress;
      results = dashboard.mostRated;
    }
    results = results || [];

    return (
      <Grid item xs={12}>
        <Grid container className={classes.headerGrid}>
          <Typography variant="h6" gutterBottom component="div">{title}</Typography>
        </Grid>
        { inProgress && SkeletonUtil.getMediumSkeleton(5) }
        { !inProgress &&
        <Grid container className={classes.stripGrid}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {results.map((media) => (
                <Grid key={media.id} item>
                  <SearchResultCard media={media}
                    onMediaClick={() => this.handleMediaClick(media, results)}
                    />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        }
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={3}>
        { this.getStrip(DashboardConstants.MOST_RECENT) }
        { this.getStrip(DashboardConstants.MOST_VIEWED) }
        { this.getStrip(DashboardConstants.MOST_LIKED) }
        { this.getStrip(DashboardConstants.MOST_RATED) }
      </Grid>
    );  
  }
}

const mapState = state => {
  return {
    mode: HeaderSelectors.getMode(state),
    dashboard: DashboardSelectors.getDashboard(state)
  }
};
const mapActions = {
  onLoad: DashboardActions.onLoad,
  onMediaClick: DashboardActions.onMediaClick
}

const DashboardContainer = connect(mapState, mapActions)(withStyles(styles) (Dashboard));
export default DashboardContainer;

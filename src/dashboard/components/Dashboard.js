import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { styles } from './DashboardStyles';
import SearchResultCard from '../../search/components/SearchResultCard';
import * as DashboardConstants from '../constants/DashboardConstants';
import * as DashboardActions from '../actions/DashboardActions';
import * as WatchActions from '../../watch/actions/WatchActions';
import * as DashboardSelectors from '../selectors/DashboardSelectors';

import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as SkeletonUtil from '../../app/util/SkeletonUtil';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode
    }
  }

  componentDidMount() {
    const currentMode = this.state.mode;
    this.setState({ mode: currentMode });
    this.props.onLoad && this.props.onLoad(currentMode);
  }

  componentWillReceiveProps(nextProps) {
    const newMode = nextProps.mode;
    const currentMode = this.state.mode;
    if (currentMode == null || newMode !== currentMode) {
      this.setState({ mode: newMode });
      this.props.onLoad && this.props.onLoad(newMode);
    }
  }
  handleMediaClick = (media, results) => {
    this.props.onWatchCollection(results);
    this.props.onWatchMedia(media);
    this.props.history.push('/watch');
  }
  handleViewAll = (e, type) => {
    e.preventDefault();
    this.props.onViewAll(this.state.mode, type, this.props.history);
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
        <Accordion className={classes.accordion} square={true} disableGutters={true}>
          <AccordionSummary className={classes.title}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Grid container>
              <Grid item xs={9}>
                <Typography gutterBottom component="div">{title}</Typography>
              </Grid>
              <Grid item xs={3} align="right">
                <Link href="#" onClick={(e) => this.handleViewAll(e, type)} variant="inherit">View All</Link>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            { inProgress && SkeletonUtil.getMediumSkeleton(5) }
            <Grid container spacing={2}>
            { !inProgress && results.map((media) => (
                <Grid key={media.id} item>
                  <SearchResultCard media={media}
                    onMediaClick={() => this.handleMediaClick(media, results)}
                    />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
  onViewAll: DashboardActions.onViewAll,
  onWatchCollection: WatchActions.onWatchCollection,
  onWatchMedia: WatchActions.onWatchMedia,
}

const DashboardContainer = connect(mapState, mapActions)(withStyles(styles) (Dashboard));
export default DashboardContainer;

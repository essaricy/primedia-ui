import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import { styles } from './ActivityStyles';
import MultiColorProgressBar from '../../app/components/MultiColorProgressBar';

import * as ActivitySelectors from '../selectors/ActivitySelectors';
import * as ActivityActions from '../actions/ActivityActions';
import * as HeaderSelectors from '../../header/selectors/HeaderSelectors';
import * as ActivityConstants from '../constants/ActivityConstants';

const useStyles = makeStyles((theme) => styles(theme));

function ActivityButton(props) {
  const classes = useStyles();
  const { mode, activity, disabled, onClick } = props;
  return (
    <Button variant="contained" color="primary" size="small"
      className={classes.button}
      startIcon={ActivityConstants.getIcon(activity)}
      disabled={disabled}
      onClick={() => onClick(mode, activity)}>
      {ActivityConstants.getName(activity)}
    </Button>
  );
} 

function ActivityGridItem(props) {
  const classes = useStyles();
  const { mode, activity, disabled, onClick } = props;
  return (
    <React.Fragment>
      <Grid item md={10}>
        <Typography className={classes.secondaryHeading}>
          {ActivityConstants.getDescription(activity)}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <ActivityButton mode={mode} activity={activity} disabled={disabled} onClick={onClick} />
      </Grid>
    </React.Fragment>
  );
} 

function ActivityAccordion(props) {
  const classes = useStyles();
  const { name, title, expanded, subtitle, onChange } = props;
  return (
    <Accordion expanded={expanded} onChange={onChange(name)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header">
        <Typography className={classes.heading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>{subtitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {props.children}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function Activity(props) {
  const classes = useStyles();
  const [expandedAccordion, setExpandedAccordion] = React.useState(null);

  const { mode, activity, onStart, onPollProgress } = props;
  const { name, inProgress, message } = activity;

  const showAccordion = (panelName) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panelName: null);
  };
  const isExpanded = (accordionName) => {
    return expandedAccordion === accordionName;
  }

  const getFileSystemAccordion= () => {
    const fileSystemName = "File System";
    return (
      <ActivityAccordion title={fileSystemName}
        subtitle="Sync files to and from the database"
        expanded={isExpanded(fileSystemName)}
        onChange={() => showAccordion(fileSystemName)}>
          <ActivityGridItem mode={mode} activity="SYNC_DOWN" disabled={inProgress} onClick={onStart} />
          <ActivityGridItem mode={mode} activity="SYNC_UP" disabled={inProgress} onClick={onStart} />
      </ActivityAccordion>
    );
  }

  const getGenerationAccordion= () => {
    const generationName = "Generate";
    return (
      <ActivityAccordion title={generationName}
        subtitle="Generation utilities"
        expanded={expandedAccordion === generationName}
        onChange={() => showAccordion(generationName)}>
          <ActivityGridItem mode={mode} activity="GEN_THUMBS" disabled={inProgress} onClick={onStart} />
          <ActivityGridItem mode={mode} activity="GEN_DURATIONS" disabled={inProgress} onClick={onStart} />
      </ActivityAccordion>
    );
  }
  
  const getOfflineAccordion= () => {
    const offlineName = "Offline";
    return (
      <ActivityAccordion title={offlineName}
        subtitle="Offline utilities"
        expanded={isExpanded(offlineName)}
        onChange={() => showAccordion(offlineName)}>
          <ActivityGridItem mode={mode} activity="REPLICATE" disabled={inProgress} onClick={onStart} />
      </ActivityAccordion>
    );
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>
        {name ? name : "No Activity Running..." }
      </Typography>
      <MultiColorProgressBar values={activity} onPollProgress={onPollProgress}/>

      {getFileSystemAccordion()}
      {getGenerationAccordion()}
      {getOfflineAccordion()}

      <Accordion expanded={expandedAccordion === 'panel3'} onChange={showAccordion('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expandedAccordion === 'panel4'} onChange={showAccordion('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      { <Snackbar open={message} message={message} /> }
    </div>
  );
}

const mapState = state => {
  return {
    mode: HeaderSelectors.getMode(state),
    activity: ActivitySelectors.getActivity(state)
  }
};
const mapActions = {
  onStart: ActivityActions.onStart,
  onPollProgress: ActivityActions.onPollProgress
}

const ActivityContainer = connect(mapState, mapActions)(Activity);
export default ActivityContainer;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SyncDownIcon from '@material-ui/icons/GetApp';
import SyncUpIcon from '@material-ui/icons/Publish';
import { styles } from './UtilityStyles';

const useStyles = makeStyles((theme) => styles(theme));

export default function UtilityContainer() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getFileSystemAccordion= () => {
    return (
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>File System</Typography>
        <Typography className={classes.secondaryHeading}>Sync Up and Down utilites</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item md={10}>
            <Typography className={classes.secondaryHeading}>
              To sync the media files from the permanent storage to the file system.
              Media files served from file system are optimized and are availble for offline access.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" color="primary" size="small"
              className={classes.button}
              startIcon={<SyncDownIcon />}>
              Sync Down
            </Button>
          </Grid>
          <Grid item md={10}>
            <Typography className={classes.secondaryHeading}>
              To sync the media files from the file system to the permanent storage.
              This can be used as a restore media files to the database.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" color="primary" size="small"
              className={classes.button}
              startIcon={<SyncUpIcon />}>
              Sync Up
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    );
  }

  const getGenerationAccordion= () => {
    return (
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>Generate</Typography>
        <Typography className={classes.secondaryHeading}>Generation utilities</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item md={10}>
            <Typography className={classes.secondaryHeading}>
              To sync the media files from the permanent storage to the file system.
              Media files served from file system are optimized and are availble for offline access.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" color="primary" size="small"
              className={classes.button}
              startIcon={<SyncDownIcon />}>
              Generate Thumbnails
            </Button>
          </Grid>
          <Grid item md={10}>
            <Typography className={classes.secondaryHeading}>
              To sync the media files from the file system to the permanent storage.
              This can be used as a restore media files to the database.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" color="primary" size="small"
              className={classes.button}
              startIcon={<SyncUpIcon />}>
              Generate Video Durations
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    );
  }
  
  return (
    <div className={classes.root}>
      {getFileSystemAccordion()}
      {getGenerationAccordion()}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
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
    </div>
  );
}

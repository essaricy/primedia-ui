import { React, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import { stepperStyles, stepIconStyles } from './StepperProgressStyles';

const useStepperStyles = makeStyles((theme) => stepperStyles());
const useStepIconStyles = makeStyles((theme) => stepIconStyles());

function QontoStepIcon(props) {
  const classes = useStepIconStyles();
  const { index, active, completed, failedIndex } = props;

  return (
    <div>
      <Avatar className={
        failedIndex == index
        ? classes.failedStep
        : completed
        ? classes.completedStep
        : active
        ? classes.activeStep
        : classes.inactiveStep
      }>
        <Typography className={classes.number}>{ index + 1}</Typography>
      </Avatar>
      { active && failedIndex != index &&
        <CircularProgress size={38} className={classes.inProgress} />
      }
    </div>
  );
}

export const getStatusInfo = (steps, status) => {
  const NOT_FOUND = -1;
  if (status == null) {
    return null;
  }
  let index = steps.findIndex(el => status === el.sCode);
  if (index == NOT_FOUND) {
    index = steps.findIndex(el => status === el.fCode);
    return index == NOT_FOUND ? null : { isFailure: true, index };
  } else {
    return { index: index + 1 };
  }
}

function getStepStatus(steps, status) {
  const statusInfo = getStatusInfo(steps, status);
  return statusInfo
    ? { index: statusInfo.index, isFailure: statusInfo.isFailure }
    : { index: -1 };
}


export default function StepperProgress(props) {
  const classes = useStepperStyles();
  const { steps, progress, onPollProgress } = props;
  const { id, status } = progress;
  const stepStatus = getStepStatus(steps, status);
  const { index, isFailure } = stepStatus;

  useEffect(() => {
    if (index != -1 && !isFailure && index != steps.length) {
      const interval = setInterval(() => onPollProgress(id), 2000);
      return () => {
        clearInterval(interval);
      };  
    }
  });

  return (
    <div className={classes.root}>
      <Stepper activeStep={stepStatus.index} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.sCode}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              StepIconProps={{ index, failedIndex: isFailure ? stepStatus.index : -1 }}>
              <Typography variant="caption"
                color={isFailure && stepStatus.index === index ? "error": ""}>
                {isFailure && stepStatus.index === index ? step.fLabel : step.sLabel }
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
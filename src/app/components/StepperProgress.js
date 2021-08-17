import { React, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const getStatusInfo = (steps, status) => {
  const NOT_FOUND = -1;
  if (status == null) {
    return null;
  }
  let index = steps.findIndex(el => status === el.sCode);
  console.log('sCode index: ', index);
  if (index == NOT_FOUND) {
    index = steps.findIndex(el => status === el.fCode);
    console.log('fCode index: ', index);
    return index == NOT_FOUND ? null : { isFailure: true, index };
  } else {
    return { index: index + 1 };
  }
}

function getStepStatus(steps, status) {
  const statusInfo = getStatusInfo(steps, status);
  console.log(statusInfo);
  return statusInfo
    ? { index: statusInfo.index, isFailure: statusInfo.isFailure }
    : { index: -1 };
}

export default function StepperProgress(props) {
  const classes = useStyles();
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
            <StepLabel>
              <Typography variant="caption"
                color={stepStatus.isFail && stepStatus.index === index ? "error": ""}>
                {stepStatus.isFail && stepStatus.index === index ? step.fLabel : step.sLabel }
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
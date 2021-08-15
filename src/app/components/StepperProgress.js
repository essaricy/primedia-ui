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
  if (status == null) {
    return null;
  }
  let index = steps.findIndex(el => status === el.sCode);
  if (index == -1) {
    index = steps.findIndex(el => status === el.fCode);
    return index == -1 ? null : { index };
  } else {
    return { isSuccess: true, index: index + 1 };
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
  const { index, isSuccess } = stepStatus;

  useEffect(() => {
    if (index != -1 && isSuccess && index != steps.length) {
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
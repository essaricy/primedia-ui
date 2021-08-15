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

function getStepStatus(steps, status) {
  if (status == null || status.code == null) {
      return { active: -1 };
  }
  let index = steps.findIndex(el => el.code === status.code);
  if (index != -1) {
      return { active: index+1 };
  }
  index = steps.findIndex(el => el.failCode === status.code);
  return index == -1 ? { active: -1 } : { active: index, isFail: true };
}

export default function StepperProgress(props) {
  const classes = useStyles();
  const { steps, progress, onPollProgress } = props;
  const status = progress == null ? null : progress.status;
  const { id } = progress;
  const stepStatus = getStepStatus(steps, status);
  const { active, isFail } = stepStatus;

  useEffect(() => {
    if (active != -1 && !isFail && active != steps.length) {
      const interval = setInterval(() => onPollProgress(id), 2000);
      return () => {
        clearInterval(interval);
      };  
    }
  });

  return (
    <div className={classes.root}>
      <Stepper activeStep={stepStatus.active} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.code}>
            <StepLabel>
              <Typography variant="caption"
                color={stepStatus.isFail && stepStatus.active === index ? "error": ""}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
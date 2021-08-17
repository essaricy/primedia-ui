export const stepperStyles = (theme) => ({
  root: {
    width: '100%',
  }
});

export const stepIconStyles = (theme) => ({
  step: {
    width: 26,
    height: 26
  },

  inactiveStep: {
    width: 26,
    height: 26
  },
  activeStep: {
    width: 26,
    height: 26,
    backgroundColor: '#1976d2'
  },
  completedStep: {
    width: 26,
    height: 26,
    backgroundColor: 'green'
  },
  failedStep: {
    width: 26,
    height: 26,
    backgroundColor: 'red'
  },
  number: {
    fontSize: 14
  },
  inProgress: {
    position: 'absolute',
    top: -6,
    left: 79,
    zIndex: 1,
  }
});


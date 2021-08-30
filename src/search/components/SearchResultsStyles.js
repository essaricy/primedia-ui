import { amber, grey } from '@material-ui/core/colors';

export const grey300 = grey[300];
export const grey900 = grey[900];
export const amber400 = amber[400];

export const styles = (theme) => ({
  noResultsTitle1: {
    marginTop: '30vh',
    color: grey300,
    fontSize: 30
  },
  noResultsTitle2: {
    color: grey900,
    fontSize: 14
  },
  resultsTitle1: {
    color: grey900,
    fontSize: 12
  },
  resultsTitle2: {
    color: grey900,
    fontSize: 12,
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  resultsGrid: {
    flexGrow: 1,
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10
  },
  errorTitle1: {
    marginTop: '30vh',
    color: grey300,
    fontSize: 30
  },
  errorTitle2: {
    color: amber400,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

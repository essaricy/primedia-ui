import { amber, grey } from '@material-ui/core/colors';

export const uploadStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  paper: {
    padding: theme.spacing(2),
  },
  uploadBtnGrid: {
    textAlign: 'right'
  },
  image: {
    width: 256,
    height: 256,
    margin: 'auto',
    display: 'block'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  infoGridItem: {
    paddingTop: 4,
    paddingBottom: 4
  }
});

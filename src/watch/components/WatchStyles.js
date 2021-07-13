import { amber, grey } from '@material-ui/core/colors';

export const videoBgColor = grey[900];
export const greyText = grey[500];
export const yellow = amber[500];

export const watchStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 20,
    marginTop: 10
  },
  mediaPlayer: {
    marginTop: 10,
    height: 400,
    backgroundColor: videoBgColor,
    textAlign: 'center'
  },
  mediumIconActive: {
    fontSize: 20,
    color: yellow,
    cursor: "pointer"
  },
  mediumIconInactive: {
    fontSize: 20,
    color: greyText,
  },
  mediumIconLabel: {
    color: greyText,
    marginLeft: 6
  },
  smallIconInactive: {
    fontSize: 12,
    color: greyText,
  },
  smallIconLabel: {
    fontSize: 10,
    color: greyText,
    marginLeft: 4,
    marginRight: 14
  },
  searchCard: {
    marginLeft: 10,
    padding: 10,
    maxHeight: 520,
    overflow: 'auto'
  },
  searchThumbGrid: {
    flexGrow: 1,
    marginBottom: 6
  },
  searchMediaGrid: {
    textAlign: 'center',
    backgroundColor: videoBgColor,
    maxHeight: 80,
    minHeight: 80,
    cursor: 'pointer'
  },
  searchMediaImage: {
    maxWidth: 140
  },
  searchMediaContent: {
    paddingLeft: 5
  },
  iconsContainer: {
    marginTop: 5
  }
});

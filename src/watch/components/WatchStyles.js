import { grey, blue } from '@material-ui/core/colors';

const grey900 = grey[900];
const grey500 = grey[500];
const blue400 = blue[400];

export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 14,
    marginTop: 10
  },
  galleryGrid: {
    position: "relative",
    backgroundColor: grey900,
    textAlign: 'center',
    maxHeight: '60vh',
    marginRight: 14
  },
  title: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5
  },
  subText: {
    color: grey500,
    fontSize: 14
  },
  icon: {
    fontSize: 20,
    color: blue400,
    cursor: "pointer"
  },
  iconLabel: {
    color: grey500,
  },
  player: {
    maxWidth: "94vw",
    maxHeight: "inherit"
  },
  fullScreenIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    color: "#FFF",
    cursor: "pointer"
  },

  playlistRoot: {
    display: 'flex',
    marginBottom: 5
  },
  playlistDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  playlistContent: {
    flex: '1 0 auto',
  },
  playlistCover: {
    minWidth: 151,
  },
  playlistTitle: {
    fontSize: 10,
    color: grey500
  }
});

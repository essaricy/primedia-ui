import { amber, grey, blue } from '@material-ui/core/colors';

export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 14,
    marginTop: 10
  },
  galleryGrid: {
    height: 474,
    backgroundColor: grey[900],
    textAlign: 'center'
  },
  attributeGrid: {
    marginLeft: 10,
  },
  iconActive: {
    fontSize: 20,
    color: blue[500],
    cursor: "pointer"    
  },
  iconInactive: {
    fontSize: 20,
    color: grey[500]
  },
  iconLabel: {
    color: grey[500],
    marginLeft: 6
  },
  label: {
    color: grey[500],
  },
  thumbnail: {
    height: 80
  },


  ///////////
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
    backgroundColor: grey[900],
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
  },
});

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
    backgroundColor: grey900,
    textAlign: 'center'
  },
  attributeGrid: {
  },
  title: {
    //color: grey500,
    fontSize: 20,
  },
  iconActive: {
    fontSize: 20,
    color: blue400,
    cursor: "pointer"    
  },
  iconInactive: {
    fontSize: 20,
    color: grey500
  },
  iconLabel: {
    color: grey500,
    marginLeft: 6
  },
  label: {
    color: grey500,
  },
  thumbnail: {
    height: 80
  },
});

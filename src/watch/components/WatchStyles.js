import { grey, blue } from '@material-ui/core/colors';

export const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 14,
    marginTop: 10
  },
  galleryGrid: {
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
});

import { fade } from '@material-ui/core/styles';

export const styles = (theme) => ({
  appBarImage: {
    background: '#1976d2'
  },
  appBarVideo: {
    background: '#e53935'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sideMenuList: {
    width: 250,
  },
  sideMenuFullList: {
    width: 'auto',
  },
});
